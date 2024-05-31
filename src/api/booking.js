import axiosClient from ".";

export const booking = async (data) => {
  let payload = {
    ...data,
  };
  return axiosClient.post("/booking", payload);
};

export const updateBooking = async (data, id) => {
  let payload = {
    ...data,
  };
  return axiosClient.put(`/booking/${id}`, payload);
};
