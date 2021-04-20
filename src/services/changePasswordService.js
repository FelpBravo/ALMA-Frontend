import { axiosInstance } from '../config/axios-instance';

export const getPasswordStatus = (tokenId) =>
    axiosInstance.get(`/users/password/${tokenId}`);

export const postChangePassword = (fileId, data) =>
    axiosInstance.post(`/users/password/${fileId}`,
        { ...data });