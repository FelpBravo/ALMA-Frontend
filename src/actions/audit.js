import { getAudits } from 'services/auditService';
import { types } from 'types/types';
import { uiAuditFinishLoading } from './uiAudit'

export const startAuditsLoading = (authUser) => {
	return async (dispatch) => {

		try {

			const resp = await getAudits(authUser);
			console.log(resp.data);
			dispatch(auditsLoaded(resp.data));

		} catch (error) {
			console.log(error);
		} finally {
			dispatch(uiAuditFinishLoading())
		}

	}
};

export const auditsLoaded = (audits) => {
	return {
		type: types.auditDataLoaded,
		payload: audits,
	}
};