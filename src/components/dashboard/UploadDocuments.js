import React, { useEffect, useState, useRef } from 'react';
import { UPLOAD_DOCUMENTS } from 'constants/constUtil';
import { useSelector } from 'react-redux';
import IntlMessages from 'util/IntlMessages';
import OrderTable from './ui/OrderTable';

export const UploadDocuments = () => {

	const isMounted = useRef(true);

	const { audits } = useSelector(state => state.audit);

	const upload_documents = audits.upload_document

	const [documents, setDocuments] = useState([]);

	useEffect(() => {

		return () => {
			isMounted.current = false;
		}

	}, []);

	useEffect(() => {

		if (upload_documents && upload_documents.length > 0) {


					const list = upload_documents.map((
						{ fileId, fileName, tags, activityDate }
					) => {
						return {
							id: fileId,
							name: fileName,
							icon: 'far fa-file-pdf',
							tags,
							date: activityDate,
						};
					});

					if (isMounted.current) {
						setDocuments(list);
					}


		}

	}, [upload_documents]);

	return (
		<div className="jr-card">

			<div className="jr-card-header d-flex align-items-center">
				<h3 className="mb-0">
					<IntlMessages id="dashboard.titleUploadDocuments" />
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
