import { getApproves } from 'services/flowDocumentService';
import { types } from 'types/types';

export const startApprovesListLoading = ({ authUser, flowName }) => {
    return async (dispatch) => {

        try {

            const resp = await getApproves(authUser, flowName);

            dispatch(approvesLoaded(resp.data));

        } catch (error) {
            console.log(error);
        }

    }
};

const approvesLoaded = (approvesList) => {
    return {
        type: types.approvesListLoaded,
        payload: approvesList
    }
};