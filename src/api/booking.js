import axiosClient from ".";

export const booking = async (data) => {
  let payload = {
    ...data,
  };
  return axiosClient.post("/booking", payload);
};
