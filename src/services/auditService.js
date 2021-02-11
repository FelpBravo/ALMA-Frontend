import { axiosInstance } from '../config/axios-instance';

const getAudits = async(authUser) => {

	const upload_document = await axiosInstance.get('/audits/movements/UPLOADED', {
		headers: {
			Authorization: `Bearer ${authUser}`,
		},
	});

	const view_document = await axiosInstance.get('/audits/movements/VIEWED', {
		headers: {
			Authorization: `Bearer ${authUser}`,
		},
	});

	const subscribed_document = await axiosInstance.get('/audits/movements/SUBSCRIBED', {
		headers: {
			Authorization: `Bearer ${authUser}`,
		},
	});

	const top_users = await axiosInstance.get('/audits/users', {
		headers: {
			Authorization: `Bearer ${authUser}`,
		},
	});

	const statistics = await axiosInstance.get('/audits/statistics', {
		headers: {
			Authorization: `Bearer ${authUser}`,
		},
	});

	const data ={
		upload_document:upload_document.data,
		view_document:view_document.data,
		subscribed_document:subscribed_document.data,
		top_users:top_users.data,
		statistics:statistics.data
	}

	return data

}

export {
	getAudits,
}