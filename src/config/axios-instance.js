import axios from 'axios';
import { useDispatch } from 'react-redux';
import { startUserSingOut } from '../actions/auth';

const axiosInstance = axios.create({

	baseURL: process.env.REACT_APP_URL_API,

});

axiosInstance.interceptors.response.use(
	(response) => {

		return response;

	}
	,
	(error) => {

		const dispatch = useDispatch();

		if (error && error.response 
			&& (error.response.status === 401 || error.response.status === 403)) {
			
			dispatch(startUserSingOut());

		}

		return Promise.reject(error);

	});

export {
	axiosInstance,
}