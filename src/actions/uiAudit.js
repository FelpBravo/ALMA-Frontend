import { types } from 'types/types'

export const uiAuditShowLoading = () => {
	return {
		type: types.uiAuditShowLoader,
	}
};

export const uiAuditFinishLoading = () => {
	return {
		type: types.uiAuditFinishLoader,
	}
};

