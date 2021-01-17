import React from 'react'
import { getRows } from 'helpers/getRows';
import { PrintField } from './PrintField';

export const SubDetailDocumentType = ({ id, name, label, customPropertyList = [] }) => {

	const handleRenderFields = () => {

		if (customPropertyList.length === 0) {
			return;
		}

		const columns = 3;
		const rows = getRows(customPropertyList, columns);

		return [...Array(rows)].map((row, i) => {

			return (
				<div className="row" key={i}>
					{
						customPropertyList
							.slice(
								i === 0 ? i : i * columns,
								i === 0 ? columns : i * columns + columns
							)
							.map((item) => {
								return (
									<div
										key={item.name}
										className="col-xl-4 col-lg-4 col-md-6 col-6 mb-3"
									>
										<PrintField {...item} />
									</div>
								)
							})
					}
				</div>
			);

		});

	}

	return (
		<div className="row mt-3">
			<div className="col-xl-12 col-lg-12 col-md-12 col-12">

				<div className="row">
					<div className="col-xl-12 col-lg-12 col-md-12 col-12">
						<h4>{label}</h4>
					</div>
				</div>

				{handleRenderFields()}

			</div>

		</div>
	)
}
