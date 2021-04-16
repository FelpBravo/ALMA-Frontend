import { getPasswordStatus } from 'services/changePasswordService';
import { types } from 'types/types';

export const savePasswordStatus = (alive) => {
    return {
        type: types.restorePasswordSaveStatus,
        payload: { alive }
    }
};

export const startVerifyPasswordStatus = (tokenId) => {
    return async (dispatch) => {

        try {
            const resp = await getPasswordStatus(tokenId);
            dispatch(savePasswordStatus(resp.data.alive));
        } catch (error) {
            const status = error?.response?.status
            // if (status === 404) {
            //     dispatch(fileNotFound())
            // }
            console.log(error);
        }
    }
};
