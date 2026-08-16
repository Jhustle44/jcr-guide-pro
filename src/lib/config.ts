/**
 * Global Configuration for JCRguru
 */

const STORAGE_KEY = "jcrguru_api_base_url";

// Default to relative /api if not specified,
// but in hybrid mode we might need to point to a specific IP or domain.
const DEFAULT_API_URL = window.location.origin.includes("androidplatform.net")
  ? "https://jcr-guide-pro.replit.app" // Fallback to production if in hybrid local shell
  : "";

export const getApiBaseUrl = (): string => {
  const custom = localStorage.getItem(STORAGE_KEY);
  if (custom) return custom;
  if (typeof window !== "undefined" && window.location?.origin) {
    if (window.location.origin.includes("androidplatform.net")) {
      return "https://jcr-guide-pro.replit.app";
    }
    return window.location.origin;
  }
  return DEFAULT_API_URL;
};

export const getRawApiOverride = (): string => {
  return localStorage.getItem(STORAGE_KEY) || "";
};

export const setApiBaseUrl = (url: string) => {
  if (!url || url.trim() === "" || (typeof window !== "undefined" && url.trim() === window.location.origin)) {
    localStorage.removeItem(STORAGE_KEY);
  } else {
    // Ensure no trailing slash
    const formattedUrl = url.trim().replace(/\/+$/, "");
    localStorage.setItem(STORAGE_KEY, formattedUrl);
  }
};

/**
 * Helper to construct API URLs
 */
export const apiurl = (path: string): string => {
  const base = getApiBaseUrl().replace(/\/+$/, "");
  // Ensure path starts with single /
  const cleanPath = path.startsWith("/") ? path.replace(/^\/+/, "/") : `/${path}`;
  
  // If base is identical to current origin or empty, just return clean relative path
  if (typeof window !== "undefined" && (base === window.location.origin || !base)) {
    return cleanPath;
  }
  return `${base}${cleanPath}`;
};
