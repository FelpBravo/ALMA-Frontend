import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import asyncComponent from 'util/asyncComponent';
import { PrivateRouter } from 'routers/PrivateRouter';
import { useSelector } from 'react-redux';

const LibraryRouter = () => {
	const { authUser } = useSelector(({ auth }) => auth);

	return (
		<div className="app-wrapper">
			<Switch>

				<Route
					path="/dashboard"
					component={asyncComponent(() => import('../components/dashboard/Dashboard'))}
				/>

				<Route
					path="/documents"
					component={asyncComponent(() => import('../components/documents/flow'))}
				/>
				<Route
					path="/documentcreation"
					component={asyncComponent(() => import('../components/documents/DocumentCreation'))}
				/>

				<Route
					path={"/search/:any/:savedSearchId"}
					component={asyncComponent(() => import('../components/search/Search'))}
				/>

				<Route
					path={["/search/:page", "/search"]}
					component={asyncComponent(() => import('../components/search/Search'))}
				/>

				<Route
					path={["/directory/:id/:page", "/directory/:id"]}
					component={asyncComponent(() => import('../components/search/Search'))}
				/>

				<Route
					path="/tags"
					component={asyncComponent(() => import('../components/tags/Tags'))}
				/>

				<Route
					path="/management/folders"
					component={asyncComponent(() => import('../components/management/folders/Folders'))}
				/>

				<Route
					path={["/management/usersandgroups/group","/management/usersandgroups/:page", "/management/usersandgroups"]}
					component={asyncComponent(() => import('../components/management/userandgroups/UsersandGroup'))}
				/>

			

				<Route
					path="/reports"
					component={asyncComponent(() => import('../components/reports/Reports'))}
				/>

			

				<Route
					path="/document/:id/edit"
					component={asyncComponent(() => import('../components/documents/EditUpload'))}
				/>

			

				<Route
					path="/document/:id/version"
					component={asyncComponent(() => import('../components/search/ui/Versioning/Versioning'))}
				/>

				<Route

					path="/document/:id/info"
					component={asyncComponent(() => import('../components/search/ui/Information/Information'))}
				/>

				<PrivateRouter
					exact
					authUser={Boolean(authUser)}
					path="/group-permissions"
					component={asyncComponent(() => import('../components/groupPermissions/index'))}
				/>

				<Redirect to="/dashboard" />

			</Switch>
		</div>
	)
}

export default withRouter(LibraryRouter);
