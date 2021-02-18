import { getReports, getMissing } from 'services/reportsService';
import { types } from 'types/types';
import Swal from 'sweetalert2';
 
export const startReportsLoading = (authUser, startDate, endDate, page) => {
	return async (dispatch) => {

		try {

			Swal.fire({
				title: 'Loading...',
				text: 'Please wait...',
				allowOutsideClick: false,
				heightAuto: false,
			});

			Swal.showLoading();
			const resp = await getReports(authUser,startDate,endDate,page, 10)

			dispatch(reportsLoaded(resp.data,startDate,endDate));

		} catch (error) {
			console.log(error);
		} finally {
			Swal.close();
		}

	}
};

export const startMissingLoading = (authUser,missingName, startDate, endDate, page) => {
	return async (dispatch) => {

		try {

			Swal.fire({
				title: 'Loading...',
				text: 'Please wait...',
				allowOutsideClick: false,
				heightAuto: false,
			});

			Swal.showLoading();
			const resp = await getMissing(authUser,missingName,startDate,endDate,page, 10)
			console.log(resp);
			dispatch(missingLoaded(resp.data,missingName,startDate,endDate));

		} catch (error) {
			console.log(error);
		} finally {
			Swal.close();
		}

	}
};

export const reportsLoaded = (reports,startDate,endDate) => {
	return {
		type: types.reportsDataLoaded,
		payload: {
			reports: reports,
			date:{
				startDate:startDate,
				endDate:endDate
			}
		},
	}
};

export const missingLoaded = (missing,missingName,startDate,endDate) => {
	return {
		type: types.missingDataLoaded,
		payload: {
			missing: missing,
			date:{
				startDate:startDate,
				endDate:endDate
			},
			missingName:missingName
		},
	}
};

export const reportsRemoveAll = () => {
	return {
		type: types.reportsRemoveAll,
	}
};

export const clearReports = () => {
	return async (dispatch) => {
		dispatch(reportsRemoveAll());
	}
};