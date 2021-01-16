import React, { useEffect, useState, useRef } from 'react';
import { UPLOAD_DOCUMENTS } from 'constants/constUtil';
import { useSelector } from 'react-redux';
import IntlMessages from 'util/IntlMessages';
import OrderTable from './ui/OrderTable';

export const UploadDocuments = () => {

	const isMounted = useRef(true);

	const { audits } = useSelector(state => state.audit);
	const { widgets } = audits;

	const [documents, setDocuments] = useState([]);

	useEffect(() => {

		return () => {
			isMounted.current = false;
		}

	}, []);

	useEffect(() => {

		if (widgets && widgets.length > 0) {

			const documents = widgets.filter((w) => w.title === UPLOAD_DOCUMENTS);

			if (documents && documents.length > 0) {

				const list = documents[0].list.map(({ file_id, file_name, tags }) => {
					return {
						id: file_id,
						name: file_name,
						icon: 'far fa-file-pdf',
						tags,
					};
				});

				if (isMounted.current) {
					setDocuments(list);
				}

			}

		}

	}, [widgets]);

	return (
		<div className="jr-card">

			<div className="jr-card-header d-flex align-items-center">
				<h3 className="mb-0">
					<IntlMessages id="dashboard.titleUploadDocuments" />
				</h3>
				<div className="ml-auto">
					<span className="custom-link-dash">
						<IntlMessages id="dashboard.moreInfo" /> <i className="fas fa-arrow-right"></i>
					</span>
				</div>
			</div>

			<OrderTable dataTable={documents} />
		</div>
	)
}
