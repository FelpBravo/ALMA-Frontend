import { axiosInstance } from '../config/axios-instance';

export const postSharedFile = (authUser, fileId, password, expirationDate) =>
    axiosInstance.post(`/files/${fileId}/share`,
        { password, expirationDate },
        {
            headers: {
                Authorization: `Bearer ${authUser}`,
            },
        });

export const getFileStatus = (fileId) =>
    axiosInstance.get(`/files/shared/${fileId}/status`);

export const postDownloadFile = (fileId, password) =>
    axiosInstance.post(`/files/shared/${fileId}`,
        { password });