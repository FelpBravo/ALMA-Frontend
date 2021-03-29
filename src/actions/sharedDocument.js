import { types } from 'types/types';

export const sharedDocumentSetValue = (name, value) => {
	return {
		type: types.sharedDocumentSetValue,
		payload: {
			name,
			value,
		}
	}
};