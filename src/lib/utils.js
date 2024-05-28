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
export const getUserId = () => {
  const userId = localStorage.getItem("userId");
  return userId;
};

export const setToken = (value) => {
  if (value) {
    localStorage.setItem("token", value?.token);
    localStorage.setItem("userId", value?.userId);
    setAxiosToken(value?.token);
  } else {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  }
};

export const removeToken = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
};
