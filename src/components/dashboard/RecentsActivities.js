import React, { useEffect, useState, useRef } from 'react';
import { RECENT_ACTIVITY } from 'constants/constUtil';
import { useSelector } from 'react-redux';
import IntlMessages from 'util/IntlMessages';
import OrderTable from './ui/OrderTable';
import { getActivityType } from 'helpers/getActivityType';

export const RecentsActivities = () => {

	const isMounted = useRef(true);

	const { audits } = useSelector(state => state.audit);

	const view_documents = audits.view_document

	const [documents, setDocuments] = useState([]);

	useEffect(() => {

		return () => {
			isMounted.current = false;
		}

	}, []);

	useEffect(() => {

		if (view_documents && view_documents.length > 0) {

			
					const list = view_documents.map((
						{ fileId, fileName, tags, activityDate, activity ,userFirstName ,userLastName }
					) => {
						return {
							id: fileId,
							name: fileName,
							icon: 'far fa-file-pdf',
							tags,
							date: activityDate,
							activity: getActivityType(activity),
							image:"https://via.placeholder.com/150x150",
							userName: userFirstName + " "+userLastName,
							date: new Date(activityDate).toLocaleString("es-ES",{weekday:"short", year: "numeric", month: "long", day: "numeric", hour:"numeric",minute:"numeric"}),
	
						};
					});

					if (isMounted.current) {
						setDocuments(list);
					}

				

		}

	}, [view_documents]);

	return (
		<div className="jr-card">
			<div className="jr-card-header d-flex align-items-center">
				<h3 className="mb-0">
					<IntlMessages id="dashboard.titleRecentActivities" />
				</h3>
				<div className="ml-auto">
					<span className="text-white badge badge-success"></span>
				</div>
			</div>
			<OrderTable
				dataTable={documents}
			/>
		</div>
	)
}
