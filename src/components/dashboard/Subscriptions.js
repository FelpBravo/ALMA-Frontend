import React, { useEffect, useState, useRef } from 'react';
import { SUBSCRIPTIONS } from 'constants/constUtil';
import { useSelector } from 'react-redux';
import IntlMessages from 'util/IntlMessages';
import OrderTable from './ui/OrderTable';

export const Subscriptions = () => {

	const isMounted = useRef(true);

	const { audits } = useSelector(state => state.audit);
	const subscribed_document = audits.subscribed_document

	const [documents, setDocuments] = useState([]);

	useEffect(() => {

		return () => {
			isMounted.current = false;
		}

	}, []);

	useEffect(() => {

		if (subscribed_document && subscribed_document.length > 0) {

					const list = subscribed_document.map(({ fileId, fileName, tags, folder, activityDate }) => {
						return {
							id: fileId,
							name: fileName,
							icon: 'far fa-file-pdf',
							tags,
							folder,
							date: activityDate,
							isSubscriptions: true,
						};
					});

					if (isMounted.current) {
						setDocuments(list);
					}

			

		}

	}, [subscribed_document]);

	return (
		<div className="jr-card">

			<div className="jr-card-header d-flex align-items-center">
				<h3 className="mb-0">
					<IntlMessages id="dashboard.titleSubscriptionsDocs" />
				</h3>
				<div className="ml-auto">
					<span className="custom-link-dash">
						{/*<IntlMessages id="dashboard.moreInfo" /> <i className="fas fa-arrow-right"></i>*/}
					</span>
				</div>
			</div>

			<OrderTable dataTable={documents} />

		</div>
	)
}
