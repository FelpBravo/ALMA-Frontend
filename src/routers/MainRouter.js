import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router'

import AppRouter from './AppRouter';
import { history } from '../store/store';
import DownloadFilePage from 'components/downloadFile';

export const MainRouter = () => {
	return (
		<ConnectedRouter history={history}>
			<Switch>
				<Route
					exact
					path="/download/:documentId"
					component={DownloadFilePage}
				/>
				<Route
					path="/"
					component={AppRouter}
				/>
			</Switch>
		</ConnectedRouter>
	)
}
