import { axiosInstance } from '../config/axios-instance';
import qs from 'querystring';

const login = (userName, password) => {

	const authData = { username: userName, password };

	return axiosInstance.post(`/login`, qs.stringify(authData), {
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Accept': '*/*'
		}
	});

};

export {
	login
}