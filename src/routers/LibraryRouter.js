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

					path="/search"
					component={asyncComponent(() => import('../components/search/Search'))}
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

					path="/edit"
					component={asyncComponent(() => import('../components/documents/EditUpload'))}
				/>
                <Route

					path="/bulk"
					component={asyncComponent(() => import('../components/reports/ui/TableSearchReports'))}
				/>
				<Redirect to="/dashboard" />

			</Switch>
		</div>
	)
}

export default withRouter(LibraryRouter);
