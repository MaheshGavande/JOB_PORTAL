import { API_URL } from "../config/api";
const API_ORIGIN = `${API_URL}`;

export const normalizeAssetUrl = (value) => {
  if (typeof value !== "string" || !value.trim()) return "";

  const url = value.trim();
  if (/^(https?:|data:|blob:)/i.test(url)) return url;
  if (url.startsWith("/src/") || url.startsWith("/assets/")) return url;

  return `${API_ORIGIN}/${url.replace(/^\/+/, "")}`;
};