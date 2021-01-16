import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

export const PrivateRouter = ({ component: Component, authUser, ...rest }) =>
	<Route
		{...rest}
		component={(props) => (
			authUser
				? <Component {...props} />
				: <Redirect to="/auth/signin" />

		)}
	/>;

PrivateRouter.propTypes = {
	authUser: PropTypes.bool.isRequired,
	component: PropTypes.func.isRequired,
}
