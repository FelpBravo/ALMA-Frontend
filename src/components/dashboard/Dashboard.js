import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
import jwt_decode from "jwt-decode";


const Dashboard = () => {

	const dispatch = useDispatch();
	const [user, setUser] = useState({ firstName: '', lastName: '' });

	const { authUser } = useSelector(state => state.auth);
	

	useEffect(() => {

		if (!authUser) {
			return;
		}

		try {
			const { user } = jwt_decode(authUser);

			if (user) {
				setUser(user);
			}

		} catch (err) {
			console.log((err));
		}

	}, [authUser, setUser]);

	useEffect(() => {

		dispatch(uiAuditShowLoading())
		dispatch(startAuditsLoading(authUser));
		dispatch(startSearchFieldsLoading(authUser));
		
	}, [dispatch, authUser]);

	return (
		<div className="dashboard animated slideInUpTiny animation-duration-3">


			<EditTextSearch />

			<div className="row">
				<div className="ml-4">
			      <img src={require("assets/images/dashboard/usuario.png")} alt="jambo" title="jambo" />
			    </div>
			<p style={{fontFamily: "Poppins", fontSize: '18px', fontWeight: 600 }} className="ml-2"> ¡Bienvenido {`${user.firstName && user.firstName}`}!</p>
			</div>
          
			<div className="row">

				<div className="col-xl-8 col-lg-8 col-md-12 col-12">
					<div className="row">
						<div className="col-xl-12 col-lg-12 col-md-12 col-12">
						
						{/* <ActivityResume /> */}

						</div>
					</div>
					
					<div className="row">
						<div className="col-xl-12 col-lg-12 col-md-12 col-12">

							{<UploadDocuments />}

						</div>
					</div>

					
					{/*<div className="row">

						<div className="col-xl-7 col-lg-6 col-md-12 col-12">
							
							<Subscriptions />

						<div className="col-xl-5 col-lg-6 col-md-12 col-12">
							
							{<TopUsers />}

						</div>

						</div>
					</div>*/}

					<div className="row">
						<div className="col-xl-12 col-lg-12 col-md-12 col-12">

							{<TotalSummary />}

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

							{<TopUsers />}

						</div>
					</div>
					

					<div className="row">
						<div className="col-xl-12 col-lg-12 col-md-12 col-12">

							{<RecentsActivities />}

						</div>
					</div>

				</div>

			</div>

		</div>
	)
}

export default Dashboard;
