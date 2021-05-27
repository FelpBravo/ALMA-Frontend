import { getApproves, postFlows } from 'services/flowDocumentService';
import { types } from 'types/types';
import Swal from 'sweetalert2';
import { GENERAL_ERROR } from '../constants/constUtil';

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
export const startInitFlowsLoading = ( authUser, data,) => {
    return async (dispatch) => {

        try {
            Swal.showLoading();

            const {flow, document, approves, comment, startedBy} = data
            const resp = await postFlows(authUser, flow, document, approves, comment, startedBy);
            console.log(resp)
            Swal.fire({
				icon: 'success',
				width: 400,
				title: '<h4>Solicitud enviada</h4>',
				html: `<ul> ID Asignado: ${resp.data.id}</ul>`,
				showConfirmButton: true,
			})
			
            dispatch(saveFlowInit());

		} catch (error) {
			console.log(error);

			Swal.close();

			const message = error?.response?.data?.message ? error.response.data.message : GENERAL_ERROR;

			Swal.fire({
				title: 'Error', text: message, icon: 'error', heightAuto: false
			});
		}

	}
};

const saveFlowInit = () => {
	return {
		type: types.docsSaveFlowInit,
	}
};
    
const approvesLoaded = (approvesList) => {
    return {
        type: types.approvesListLoaded,
        payload: approvesList
    }
};

const flowsInitLoaded = (flows) => {
    return {
        type: types.flowsLoaded,
        payload: flows
    }
};