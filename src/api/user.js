import axiosClient from ".";

export const userId = async (id) => {
  return axiosClient.get(`user?id=${id}`);
};

export const updateUser = async (data, id) => {
  let payload = {
    ...data,
  };

  return axiosClient.put(`user?id=${id}`, payload);
};
