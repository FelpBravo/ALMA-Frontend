import axios from 'axios';

const axiosInstance = axios.create({

	baseURL: process.env.REACT_APP_URL_API

});
const axiosInstanceReports = axios.create({

	baseURL: process.env.REACT_APP_URL_API_REPORTS

});

export {
	axiosInstance,
	axiosInstanceReports
}