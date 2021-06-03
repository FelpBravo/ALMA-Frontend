import React from 'react';
import { Provider } from 'react-redux';
import { setLocale } from 'yup';

import { startUserSingOut } from 'actions/auth';
import { axiosInstance } from 'config/axios-instance';
import { FORBIDDEN, UNAUTHORIZED } from 'constants/constUtil';
import { MainRouter } from 'routers/MainRouter';
import { locale } from 'util/errorsYup';

import { store } from './store/store';

setLocale(locale);

const MainApp = () =>
	<Provider store={store}>
		<MainRouter />
	</Provider>;

const { dispatch } = store;

axiosInstance.interceptors.response.use(
	response => response
	,
	error => {
		try {
			const { status } = error?.response;
			if (status === UNAUTHORIZED || status === FORBIDDEN) {
			
				dispatch(startUserSingOut());
	
			}
	
			return Promise.reject(error);

		} catch (e) {
			
			console.log("error",e);
		}

		

		

	});

export default MainApp;