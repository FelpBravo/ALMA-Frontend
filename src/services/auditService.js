import { axiosInstance } from '../config/axios-instance';

const getAudits = (authUser) => {

	return axiosInstance.get('/audits', {
		headers: {
			Authorization: `Bearer ${authUser}`,
		},
	});

}

export {
	getAudits,
}