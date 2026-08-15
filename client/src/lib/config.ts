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
  return localStorage.getItem(STORAGE_KEY) || DEFAULT_API_URL;
};

export const setApiBaseUrl = (url: string) => {
  if (!url) {
    localStorage.removeItem(STORAGE_KEY);
  } else {
    // Ensure no trailing slash
    const formattedUrl = url.replace(/\/$/, "");
    localStorage.setItem(STORAGE_KEY, formattedUrl);
  }
};

/**
 * Helper to construct API URLs
 */
export const apiurl = (path: string): string => {
  const base = getApiBaseUrl();
  // Ensure path starts with /
  const formattedPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${formattedPath}`;
};
