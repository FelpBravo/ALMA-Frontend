import { types } from 'types/types';
 
export const startBreadcrumbs = (name,path) => {
	return async (dispatch) => {
		try {
			dispatch(saveBreadcrumbs(name,path));
		} catch (error) {
			console.log(error);
        }

	}
};

export const addBreadcrumbs = (name,path) => {
	return async (dispatch) => {
		try {
			dispatch(updateBreadcrumbs(name,path));
		} catch (error) {
			console.log(error);
        }

	}
};

export const updateBreadcrumbs = (name,path) => {
	return {
		type: types.addBreadcrumbs,
		payload:{
            name,
            path
        },
	}
};


export const saveBreadcrumbs = (name,path) => {
	return {
		type: types.createBreadcrumbs,
		payload:{
            name,
            path
        },
	}
};


