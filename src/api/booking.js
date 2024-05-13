import axios from "axios";
import axiosClient from ".";

export const booking = async (data) => {
  let payload = {
    ...data,
  };
  return axios.post("/booking", payload);
};
