import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import DOMPurify from "dompurify";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const sanitizeHTML = (html: string) => {
  if (typeof window !== "undefined") {
    const purify = DOMPurify(window);
    return purify.sanitize(html, {
      USE_PROFILES: { html: true },
    });
  }
  return html;
};
