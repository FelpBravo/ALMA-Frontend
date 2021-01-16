import { axiosInstance } from '../config/axios-instance';

const token = localStorage.getItem('token');

const getAudits = () => {

	return axiosInstance.get('/audits', {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

}

export {
	getAudits,
}