import React, { useRef, useState, useEffect } from 'react';
import { useSelector } from "react-redux";

import IntlMessages from 'util/IntlMessages';
import { SUBSCRIPTIONS } from 'constants/constUtil';
import IconWithTextCard from './ui/IconWithTextCard';

export const TotalSummary = () => {

	const isMounted = useRef(true);
	const { audits } = useSelector(state => state.audit);
	
	const statistics = audits.statistics

	useEffect(() => {

		return () => {
			isMounted.current = false;
		}

	}, []);

	const Metrics = ()=>{
		if(statistics && statistics.length >0 ){
			const dataMetrics = [
				{
					title: statistics[0].totalDocuments.toString(),
					subTitle: <IntlMessages id="dashboard.total.documents" />,
					imageIcon: require('assets/images/dashboard/nounfiles.png'),
					cardColor: 'secondary',
				},
				{
					title: statistics[0].totalUsers,
					subTitle: <IntlMessages id="dashboard.total.users" />,
					imageIcon: require('assets/images/dashboard/noun_users.png'),
					cardColor: 'info',
				},
				{
					title: statistics[0].userDocumentsUploaded,
					subTitle: <IntlMessages id="dashboard.total.documents.upload" />,
					imageIcon: require('assets/images/dashboard/noun_File.png'),
					cardColor: 'warning',
				},
				{
					title: statistics[0].userDocumentsViewed,
					subTitle: <IntlMessages id="dashboard.total.documents.visualized" />,
					imageIcon: require('assets/images/dashboard/noun_study.png'),
					cardColor: 'danger',
				}
			];
			return (dataMetrics.map((data, index) =>
				<div key={index} className="col-lg-3 col-sm-6 col-12">
					<IconWithTextCard data={data} />
				</div>
			))

		}
		else
		{
			return(<></>)
		}
	}
	

	return (
		<div className="row">
			<Metrics/>
		</div>
	)
}
