import { axiosInstance } from '../config/axios-instance';

export const postSharedFile = (authUser, fileId, password, expirationDate) =>
    axiosInstance.post(`/files/${fileId}/share`,
        { password, expirationDate },
        {
            headers: {
                Authorization: `Bearer ${authUser}`,
            },
        });
