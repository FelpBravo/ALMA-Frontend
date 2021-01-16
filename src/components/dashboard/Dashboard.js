import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { startAuditsLoading } from 'actions/audit';
import { uiAuditShowLoading } from 'actions/uiAudit';
import { TotalSummary } from './TotalSummary';
import { ActivityResume } from './ActivityResume';
import { Subscriptions } from './Subscriptions';
import { TopUsers } from './TopUsers';
import { MostViewedDocuments } from './MostViewedDocuments';
import { UploadDocuments } from './UploadDocuments';
import { RecentsActivities } from './RecentsActivities';
import { startSearchFieldsLoading } from 'actions/search';
import { EditTextSearch } from 'components/search/ui/EditTextSearch';

const Dashboard = () => {

	const dispatch = useDispatch();

	useEffect(() => {

		dispatch(uiAuditShowLoading())
		dispatch(startAuditsLoading());
		dispatch(startSearchFieldsLoading());

	}, [dispatch]);

	return (
		<div className="dashboard animated slideInUpTiny animation-duration-3">


			<EditTextSearch />

			<div className="row">

				<div className="col-xl-8 col-lg-8 col-md-12 col-12">

					<div className="row">
						<div className="col-xl-12 col-lg-12 col-md-12 col-12">

							<ActivityResume />

						</div>
					</div>

					<div className="row">

						<div className="col-xl-6 col-lg-6 col-md-12 col-12">
							<Subscriptions />
						</div>

						<div className="col-xl-6 col-lg-6 col-md-12 col-12">
							<TopUsers />
						</div>

					</div>

					<div className="row">
						<div className="col-xl-12 col-lg-12 col-md-12 col-12">

							<TotalSummary />

						</div>
					</div>

					<div className="row">
						<div className="col-xl-12 col-lg-12 col-md-12 col-12">

							<MostViewedDocuments />

						</div>
					</div>

				</div>

				<div className="col-xl-4 col-lg-4 col-md-12 col-12">

					<div className="row">
						<div className="col-xl-12 col-lg-12 col-md-12 col-12">

							<UploadDocuments />

						</div>
					</div>

					<div className="row">
						<div className="col-xl-12 col-lg-12 col-md-12 col-12">

							<RecentsActivities />

						</div>
					</div>

				</div>

			</div>

		</div>
	)
}

export default Dashboard;