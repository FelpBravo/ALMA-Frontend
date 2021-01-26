import React, { useRef, useState, useEffect } from 'react';
import { useSelector } from "react-redux";

import { SUBSCRIPTIONS } from 'constants/constUtil';
import IconWithTextCard from './ui/IconWithTextCard';

export const dataMetrics = [
	{
		title: '0',
		subTitle: 'Total documentos',
		imageIcon: require('assets/images/dashboard/project-icon.png'),
		cardColor: 'secondary',
	},
	{
		title: '0',
		subTitle: 'Total usuarios',
		imageIcon: require('assets/images/dashboard/project-icon.png'),
		cardColor: 'info',
	},
	{
		title: '0',
		subTitle: 'Total subidos',
		imageIcon: require('assets/images/dashboard/project-icon.png'),
		cardColor: 'warning',
	},
	{
		title: '0',
		subTitle: 'Documentos visualizados',
		imageIcon: require('assets/images/dashboard/project-icon.png'),
		cardColor: 'danger',
	}
];


export const TotalSummary = () => {

	const isMounted = useRef(true);
	const { audits } = useSelector(state => state.audit);
	const { widgets } = audits;
	const [subscriptions, setSubscriptions] = useState({})

	useEffect(() => {

		return () => {
			isMounted.current = false;
		}

	}, []);

	useEffect(() => {

		/*if (widgets && widgets.length > 0) {

			const subscriptions = widgets.filter((w) => w.title === SUBSCRIPTIONS);

			if (subscriptions && subscriptions.length > 0) {

				const list = subscriptions[0].list.map((obj) => {
					return obj;
				});

				if (isMounted.current) {
					setSubscriptions(list);
				}

			}

		}*/

	}, [widgets]);

	return (
		<div className="row">
			{dataMetrics.map((data, index) =>
				<div key={index} className="col-lg-3 col-sm-6 col-12">
					<IconWithTextCard data={data} />
				</div>)}
		</div>
	)
}
