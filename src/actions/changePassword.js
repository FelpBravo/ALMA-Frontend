import { getPasswordStatus, postChangePassword } from 'services/changePasswordService';
import Swal from 'sweetalert2';
import { types } from 'types/types';
import { GENERAL_ERROR } from 'constants/constUtil';

export const savePasswordStatus = (alive) => {
    return {
        type: types.restorePasswordSaveStatus,
        payload: { alive }
    }
};


export const restorePasswordSuccess = (data) => {
    return {
        type: types.restorePasswordSuccess,
        payload: { ...data }
    }
};

export const startVerifyPasswordStatus = (tokenId, setPageFound) => {
    return async (dispatch) => {

        try {
            const resp = await getPasswordStatus(tokenId);
            dispatch(savePasswordStatus(resp.data.alive));
            setPageFound(resp.data.alive)
        } catch (error) {
            setPageFound(false)
            console.log(error);
        }
    }
};

export const startRestorePassword = (tokenId, data, setLoading) => {
    return async (dispatch) => {

        try {
            const resp = await postChangePassword(tokenId, data);
            dispatch(restorePasswordSuccess(resp.data));
            setLoading(false)
        } catch (error) {
            const text = error?.response?.data ? error.response.data : GENERAL_ERROR;

            Swal.fire({
                title: 'Error', text, icon: 'error', heightAuto: false
            });
            
            console.log(error);
        }
    }
};
