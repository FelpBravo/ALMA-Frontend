import React, { useRef, useEffect } from 'react';
import { useSelector } from "react-redux";
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
					subTitle: 'Total documentos',
					imageIcon: require('assets/images/dashboard/nounfiles.png'),
					cardColor: 'secondary',
				},
				{
					title: statistics[0].totalUsers,
					subTitle: 'Total usuarios',
					imageIcon: require('assets/images/dashboard/noun_users.png'),
					cardColor: 'info',
				},
				{
					title: statistics[0].userDocumentsUploaded,
					subTitle: 'Documentos subidos',
					imageIcon: require('assets/images/dashboard/noun_File.png'),
					cardColor: 'warning',
				},
				{
					title: statistics[0].userDocumentsViewed,
					subTitle: 'Documentos visualizados',
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
