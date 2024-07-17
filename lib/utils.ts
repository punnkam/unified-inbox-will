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

export const formatTimestampTo12Hour = (date: Date | undefined) => {
  if (!date) return "";
  const hours = date.getHours();
  const hour = hours % 12 || 12;
  const ampm = hours < 12 ? "AM" : "PM";
  return `${hour.toString().padStart(2, "0")}:00 ${ampm}`;
};

// Generate an array of time options for the dropdown
export const generateTimeOptions = () => {
  const options = [];
  for (let i = 0; i < 24; i++) {
    const hour = i % 12 || 12;
    const ampm = i < 12 ? "AM" : "PM";
    options.push(`${hour.toString().padStart(2, "0")}:00 ${ampm}`);
  }
  return options;
};

// Take in a date and change the hour to the specified hour
export const handleValueChange = (selectedValue: string, value?: Date) => {
  const [time, period] = selectedValue.split(" ");
  const [hours] = time.split(":");
  const date = value || new Date();
  let hour = parseInt(hours, 10);

  if (period === "PM" && hour !== 12) hour += 12;
  if (period === "AM" && hour === 12) hour = 0;

  date.setHours(hour, 0, 0, 0);
  console.log("Date:", date);

  return date;
};
