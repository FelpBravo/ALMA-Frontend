import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import SignIn from 'components/auth/SignIn';
import SignUp from 'components/auth/SignUp';

export const AuthRouter = () => {
	return (
		<Switch>

			<Route
				exact
				path="/auth/signin"
				component={SignIn}
			/>

			<Route
				exact
				path="/auth/signup"
				component={SignUp}
			/>
			<Redirect to="/auth/signin" />

		</Switch>
	);
}
