import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

export const PublicRouter = ({
	isAuth,
	component: Component,
	...rest
}) => {

	return (
		<Route {...rest}
			component={(props) => (
				!isAuth
					? <Component {...props} />
					: <Redirect to="/" />

			)}
		/>
	)
}

PublicRouter.propTypes = {
	isAuth: PropTypes.bool.isRequired,
	component: PropTypes.func.isRequired,
}
