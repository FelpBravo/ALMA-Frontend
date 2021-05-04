import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router'

import AppRouter from './AppRouter';
import { history } from '../store/store';
import IdleTimer from 'helpers/IdleTimer';
import { useDispatch, useSelector } from 'react-redux';
import { startUserSingOut } from 'actions/auth';

const TIMEOUT = 60*30; // HardCode for test

export const MainRouter = () => {
	const { authUser } = useSelector(state => state.auth);
	const dispatch = useDispatch()

	const clearToken = () => dispatch(startUserSingOut());

	useEffect(() => {
		if (authUser) {
			const timer = new IdleTimer({
				timeout: TIMEOUT, // In seconds
				onTimeout: () => clearToken(),
				onExpired: () => clearToken(), //do something if expired on load
			});
			return () => {
				timer.cleanUp();
			};
		}

	}, [authUser]);

	return (
		<ConnectedRouter history={history}>
			<Switch>

				<Route
					path="/"
					component={AppRouter}
				/>
			</Switch>
		</ConnectedRouter>
	)
}
