import { createUUID } from 'helpers/createUUID';
import React from 'react';
import OrderTableCell from './OrderTableCell';




const OrderTable = ({ dataTable }) => {

	return (
		<div className="table-responsive-material">
			<table className="default-table table table-sm table-hover">

				<tbody>
					{dataTable.map(data => {
						return (
							<OrderTableCell key={createUUID()} data={data} />
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default OrderTable;