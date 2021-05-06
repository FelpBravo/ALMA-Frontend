import React from 'react';
import { Divider } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { SubDetailDocumentType } from './SubDetailDocumentType';

export const DetailDocumentType = () => {

	const { detailDocumentType = {} } = useSelector(state => state.documents);

	const { aspectList = [] } = detailDocumentType;

	if (aspectList.length === 0) {
		return <></>;
	}

	console.log("aspectList", aspectList)

	return (
		<>
			{
				aspectList.map((item) => {
					return <SubDetailDocumentType key={item.id} {...item} />
				})
			}

			<div className="row">
				<div className="col-xl-12 col-lg-12 col-md-12 col-12 mt-3">
					<Divider />
				</div>
			</div>
		</>
	)
}
