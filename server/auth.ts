import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Express, RequestHandler } from "express";
import session from "express-session";
import bcrypt from "bcrypt";
import { storage } from "./storage";
import { User as SelectUser } from "@shared/schema";

declare global {
  namespace Express {
    interface User extends SelectUser {}
  }
}

export const isAuthenticated: RequestHandler = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ message: "Unauthorized" });
};

export function setupAuth(app: Express) {
  app.set("trust proxy", 1);

  const sessionSettings: session.SessionOptions = {
    secret: process.env.SESSION_SECRET || "jcrguru-secret-key-2025",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: "auto",
      sameSite: "lax",
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    },
  };

  app.use(session(sessionSettings));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new LocalStrategy({ usernameField: "email" }, async (rawEmail, password, done) => {
      try {
        const email = (rawEmail || "").trim().toLowerCase();
        if (!email || !password) {
          return done(null, false, { message: "Email and password are required." });
        }

        const user = await storage.getUserByEmail(email);
        if (!user) {
          return done(null, false, { message: "No account found for this email. Please register or use Quick Demo Sign-In." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return done(null, false, { message: "Incorrect password. Please verify your credentials." });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }),
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: string, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user || null);
    } catch (err) {
      done(err);
    }
  });

  app.post("/api/register", async (req, res, next) => {
    try {
      const { email: rawEmail, password, firstName, lastName, role } = req.body;
      const email = (rawEmail || "").trim().toLowerCase();

      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
      }

      const existingUser = await storage.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: "An account with this email already exists. Please sign in." });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await storage.createUser({
        email,
        password: hashedPassword,
        firstName: firstName?.trim() || "Technician",
        lastName: lastName?.trim() || "",
        role: role || "user",
      });

      req.login(user, (err) => {
        if (err) return next(err);
        res.status(201).json(user);
      });
    } catch (err) {
      next(err);
    }
  });

  app.post("/api/login", (req, res, next) => {
    passport.authenticate("local", (err: any, user: Express.User | false, info?: { message?: string }) => {
      if (err) return next(err);
      if (!user) {
        return res.status(401).json({
          message: info?.message || "Invalid email or password. Please verify your credentials."
        });
      }
      req.login(user, (loginErr) => {
        if (loginErr) return next(loginErr);
        return res.json(user);
      });
    })(req, res, next);
  });

  // Quick Demo / Technician auto-login endpoint
  app.post("/api/quick-login", async (req, res, next) => {
    try {
      const { email: rawEmail } = req.body;
      const email = (rawEmail || "Jhustle44@gmail.com").trim().toLowerCase();
      let user = await storage.getUserByEmail(email);
      
      if (!user) {
        // Auto-provision if not present
        const defaultHash = await bcrypt.hash("password123", 10);
        user = await storage.createUser({
          email,
          password: defaultHash,
          firstName: email.includes("jhustle") ? "Master" : "Technician",
          lastName: "Pro",
          role: email.includes("admin") || email.includes("jhustle") ? "admin" : "technician",
        });
      }

      req.login(user, (err) => {
        if (err) return next(err);
        res.json(user);
      });
    } catch (err) {
      next(err);
    }
  });

  app.post("/api/logout", (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      res.sendStatus(200);
    });
  });

  app.get("/api/user", (req, res) => {
    if (!req.isAuthenticated() || !req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    res.json(req.user);
  });
}
