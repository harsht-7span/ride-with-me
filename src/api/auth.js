import axios from "axios";
import axiosClient from "./index.js";

export const logIn = async (data) => {
  let payload = {
    ...data,
  };
  return axiosClient.post("user/send-login-otp", payload);
};

export const signUp = async (data) => {
  let payload = {
    ...data,
  };
  return axiosClient.post("user/register", payload);
};

export const verifyOtp = async (data) => {
  let payload = {
    ...data,
  };
  return axiosClient.post("user/verify-otp", payload);
};
