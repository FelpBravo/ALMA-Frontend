import { getNotifications } from 'services/notificationService';
import { types } from 'types/types';
import Swal from 'sweetalert2';
import { GENERAL_ERROR } from '../constants/constUtil';

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