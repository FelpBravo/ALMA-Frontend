import { axiosInstance } from '../config/axios-instance';

const getNotifications = (authUser, page = 1, size = 5) => {
    return axiosInstance.get(`/notifications?page=${page}&size=${size}`, {
        headers: {
            Authorization: `Bearer ${authUser}`,
        },
    });
};

const putViewedNotification = (authUser, id) => {
    return axiosInstance.put(`notifications/viewed/${id}`,{}, {
        headers: {
            Authorization: `Bearer ${authUser}`,
        },
    });
};

export { getNotifications, putViewedNotification };