import React, { useEffect, useState, useRef } from 'react';
import { VIEWED_DOCUMENTS } from 'constants/constUtil';
import { useSelector } from 'react-redux';
import IntlMessages from 'util/IntlMessages';
import OrderTable from './ui/OrderTable';

export const MostViewedDocuments = () => {

	const isMounted = useRef(true);

	const { audits }  = useSelector(state => state.audit);
	const view_document = audits.view_document
	
	const [documents, setDocuments] = useState([]);

	useEffect(() => {

		return () => {
			isMounted.current = false;
		}

	}, []);

	useEffect(() => {

		if (view_document && view_document.length > 0) {

					const list = view_document.map((
						{ fileId, fileName, userFullName }
					) => {
						console.log(fileId);
						console.log(fileName);
						console.log(userFullName);
						return {
							id: fileId,
							name: fileName,
							icon: 'far fa-file-pdf',
							large: true,
							isViewedDocuments: true,
							owner: userFullName,
						};
					});

					setDocuments(list)

		}

	}, [view_document]);

	return (
		<div className="jr-card">
			<div className="jr-card-header d-flex align-items-center">
				<h3 className="mb-0">
					<IntlMessages id="dashboard.titleMostViewedDocuments" />
				</h3>
				<div className="ml-auto">
					<span className="text-white badge badge-success"></span>
				</div>
			</div>
			<OrderTable dataTable={documents} />
		</div>
	)
}
