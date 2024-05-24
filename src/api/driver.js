import axiosClient from ".";

export const getAllDriver = async () => {
  return axiosClient.get("/driver/available");
};

export const driverByID = async (id) => {
  return axiosClient.get(`/driver/${id}`);
};
