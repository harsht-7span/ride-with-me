import axiosClient from ".";

export const payment = async (data) => {
  let payload = {
    ...data,
  };
  return axiosClient.post("/payment/checkout", payload);
};
