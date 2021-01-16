import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';

import { MainRouter } from 'routers/MainRouter';

const MainApp = () =>
	<Provider store={store}>
		<MainRouter />
	</Provider>;

export default MainApp;