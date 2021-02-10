import { axiosInstance } from '../config/axios-instance';
import qs from 'querystring';

const login = (userName, password, grant_type) => {

	const authData = { username: userName, password, grant_type };

	return axiosInstance.post('/security/oauth/token', qs.stringify(authData), {
		headers: {
			'Accept': '*/*',
			'Authorization': 'Basic bGlicnV4LXJlYWN0LWFwcDphI2JGa2VjJV1RVFNKdihYTW41dSloQSc='

		}
	})

};

export {
	login
}