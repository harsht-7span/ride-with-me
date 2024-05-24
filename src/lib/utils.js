import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { setAxiosToken } from "@/api";
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const getToken = () => {
  const token = localStorage.getItem("token");
  return token;
};

export const setToken = (value) => {
  if (value) {
    localStorage.setItem("token", value);
    setAxiosToken(value);
  } else {
    localStorage.removeItem("token");
  }
};

export const removeToken = () => {
  localStorage.removeItem("token");
};
