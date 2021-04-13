import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import asyncComponent from 'util/asyncComponent';

const LibraryRouter = () => {
	return (
		<div className="app-wrapper">
			<Switch>

				<Route

					path="/dashboard"
					component={asyncComponent(() => import('../components/dashboard/Dashboard'))}
				/>

				<Route

					path="/documents"
					component={asyncComponent(() => import('../components/documents/Documents'))}
				/>
				
				<Route

					path={"/search/:any/:savedSearchId"}
					component={asyncComponent(() => import('../components/search/Search'))}
					/>
					
				<Route

					path={["/search/:page","/search"]}
					component={asyncComponent(() => import('../components/search/Search'))}
				/>


				<Route

					path={["/directory/:id/:page","/directory/:id"]}
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
					path={["/management/Usersandgroups/:id","/management/Usersandgroups"]}
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
				<Redirect to="/dashboard" />

			</Switch>
		</div>
	)
}

export default withRouter(LibraryRouter);
