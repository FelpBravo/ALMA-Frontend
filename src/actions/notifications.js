import { getNotifications, putViewedNotification } from 'services/notificationService';
import { types } from 'types/types';

export const startNotificationsLoading = ({ authUser, page, size }) => {
    return async (dispatch) => {

        try {

            const resp = await getNotifications(authUser, page, size);
            dispatch(notificationsLoaded(resp.data));

        } catch (error) {
            console.log(error);
        }

    }
};

const notificationsLoaded = (notificationsList) => {
    return {
        type: types.notificationsLoaded,
        payload: notificationsList
    }
};

export const notificationsChangeState = (payload) => {
    return {
        type: types.notificationsChangeState,
        payload
    }
};

export const notificationsInitialLoad = () => {
    return {
        type: types.notificationsInitialLoad,
    }
};

export const notificationsReset = () => {
    return {
        type: types.notificationsReset,
    }
};

export const startNotificationsViewedLoading = ({ authUser, id, newState }) => {
    return async (dispatch) => {

        try {

            const resp = await putViewedNotification(authUser, id);
            dispatch(notificationsChangeState({data: newState}));

        } catch (error) {
            console.log(error);
        }

    }
};
