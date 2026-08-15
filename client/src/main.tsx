import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Create root and render app immediately for faster startup
const root = createRoot(document.getElementById("root")!);
root.render(<App />);

// Load PWA functionality and performance optimizations after app renders (non-blocking)
Promise.all([
  import("./pwa-utils"),
  import("./utils/performance")
]).then(([pwaUtils, perfUtils]) => {
  // PWA setup
  pwaUtils.registerServiceWorker();
  pwaUtils.setupOfflineDetection();
  
  // Performance optimizations
  perfUtils.preloadCriticalRoutes();
  perfUtils.setupImageOptimization();
  perfUtils.setupPreconnects();
  perfUtils.setupPerformanceMonitoring();
}).catch(console.error);
