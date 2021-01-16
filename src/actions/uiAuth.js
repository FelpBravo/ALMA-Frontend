import { types } from 'types/types';

export const uiShowLoading = () => {
	return {
		type: types.uiLoginShowLoader
	}
}

export const uiFinishLoading = () => {
	return {
		type: types.uiLoginFinishLoader,
	}
}

export const uiShowMessageError = (message) => {
	return {
		type: types.uiLoginShowMessageError,
		payload: message
	}
}

export const uiRemoveMessageError = () => {
	return {
		type: types.uiLoginRemoveMessageError,
	}
}

