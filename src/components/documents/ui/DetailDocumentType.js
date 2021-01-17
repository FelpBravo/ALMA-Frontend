import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { SubDetailDocumentType } from './SubDetailDocumentType';

export const DetailDocumentType = () => {

	const dispatch = useDispatch();

	const { detailDocumentType = {} } = useSelector(state => state.documents);

	const { aspectList = [] } = detailDocumentType;

	return (
		<div>
			{
				aspectList.length > 0
				&&
				aspectList.map((item) => {
					return <SubDetailDocumentType key={item.id} {...item} />
				})
			}
		</div>
	)
}
