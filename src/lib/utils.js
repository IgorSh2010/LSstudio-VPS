// src/lib/utils.js
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const formatPrice = (price) => {
  const numeric = Number(price) || 0; // захист від рядків або null
  return new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
    minimumFractionDigits: 2,
  }).format(numeric);
};

export const formatDate = (dateString) => {
  if (!dateString) return "—";
  const date = new Date(dateString);
  return date.toLocaleString("pl-PL", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export function getPreviewImg(url) {
  return url.replace("/upload/", "/upload/w_300,f_auto,q_auto,c_fill/");
}

export function getPreviewBlurImg(url) {
  return url.replace("/upload/", "/upload/e_blur:2000,w_40,q_1/");
}
