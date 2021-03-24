import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';

import { MainRouter } from 'routers/MainRouter';
import { axiosInstance } from 'config/axios-instance';
import { startUserSingOut } from 'actions/auth';
import { FORBIDDEN, UNAUTHORIZED } from 'constants/constUtil';

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