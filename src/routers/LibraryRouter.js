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

					path={["/search/:page","/search"]}
					component={asyncComponent(() => import('../components/search/Search'))}
				/>
				<Route

					path={["/directory/:id/:page","/directory/:id"]}
					component={asyncComponent(() => import('../components/search/Search'))}
				/>
				<Route

					path="/carpeta/:id"
					component={asyncComponent(() => import('../components/folders/Foldersnew'))}
				/>
				<Route
					path="/tags"
					component={asyncComponent(() => import('../components/tags/Tags'))}
				/>
				<Route
					path="/folders"
					component={asyncComponent(() => import('../components/folders/Folders'))}
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
					component={asyncComponent(() => import('../components/search/Versioning'))}
				/>
				<Route

				path="/document/:id/:name/visibility"
				component={asyncComponent(() => import('../components/search/Visibility'))}
				/>
				<Redirect to="/dashboard" />

			</Switch>
		</div>
	)
}

export default withRouter(LibraryRouter);
