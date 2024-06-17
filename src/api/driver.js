import axiosClient from ".";

export const getAllDriver = async () => {
  return axiosClient.get("/driver/available");
};

export const rideRequest = async () => {
  return axiosClient.post("/user/request-drive");
};

export const driverByID = async (id) => {
  return axiosClient.get(`/driver/${id}`);
};

export const driverOtp = async (id) => {
  return axiosClient.put(`/driver/bookingotp/${id}`);
};
