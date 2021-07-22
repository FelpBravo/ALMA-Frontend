import React from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { Redirect, Route, Switch } from 'react-router-dom';

import { PrivateRouter } from 'routers/PrivateRouter';
import asyncComponent from 'util/asyncComponent';

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
					path="/inbox/:flowId"
					component={asyncComponent(() => import('../components/inbox/Inbox'))}
				/>

				<Route
					path="/inbox"
					component={asyncComponent(() => import('../components/inbox/Inbox'))}
				/>

				<Route
					path="/manage"
					component={asyncComponent(() => import('../components/inbox/ui/ManagementSummary'))}
				/>
				<Route
					path="/CREE"
					component={asyncComponent(() => import('../components/inbox/ui/ManageCree'))}
				/>


				<Route
					path="/documents"
					component={asyncComponent(() => import('../components/documents/Documents'))}
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
					path={["/tags/:tagId"]}
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
					path={["/management/usersandgroups/group", "/management/usersandgroups/:page", "/management/usersandgroups"]}
					component={asyncComponent(() => import('../components/management/userandgroups/UsersandGroup'))}
				/>

				<Route
					path="/reports"
					component={asyncComponent(() => import('../components/reports/Reports'))}
				/>

				<Route
					path="/document/:id/edit/:flowId"
					component={asyncComponent(() => import('../components/documents/Documents'))}
				/>

				<Route
					path="/document/:id/edit"
					component={asyncComponent(() => import('../components/documents/Documents'))}
				/>
				<Route
					path="/document/:id/CREE"
					component={asyncComponent(() => import('../components/documents/cree/Cree'))}
				/>
				<Route
					path="/document/:id/version"
					component={asyncComponent(() => import('../components/search/ui/Versioning/Versioning'))}
				/>
				<Route
					exact
					path="/document/:id/info"
					component={asyncComponent(() => import('../components/search/ui/Information/Information'))}
				/>

				<PrivateRouter
					exact
					authUser={Boolean(authUser)}
					path="/group-permissions"
					component={asyncComponent(() => import('../components/groupPermissions/index'))}
				/>

				{<Redirect to="/dashboard" />}

			</Switch>
		</div>
	)
}

export default withRouter(LibraryRouter);
