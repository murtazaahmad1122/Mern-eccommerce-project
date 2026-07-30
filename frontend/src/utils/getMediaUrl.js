import { API_ORIGIN } from "../api/axiosInstance";

const ABSOLUTE_URL_PATTERN = /^(?:https?:|data:|blob:)/i;

export function getMediaUrl(value) {
  if (!value || typeof value !== "string") {
    return "";
  }

  if (ABSOLUTE_URL_PATTERN.test(value)) {
    return value;
  }

  const normalizedValue = value.startsWith("/") ? value : `/${value}`;

  if (normalizedValue.startsWith("/uploads/")) {
    return `${API_ORIGIN}${normalizedValue}`;
  }

  return value;
}
