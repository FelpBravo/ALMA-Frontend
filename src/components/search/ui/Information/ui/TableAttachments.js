import React from 'react';
import Avatar from '@material-ui/core/Avatar';

const TableAttachments = (props) => {
    const { id, name, createdAt, createdByUser, icon } = props

	return (
		<tr tabIndex={-1} key={id}>
			<td>
				<div className="user-profile d-flex flex-row align-items-center">
					
					<div className="user-detail">

						<h5 className="user-name custom-color-table">
							
							
							<i className={icon}></i>
						
							{` ${name} `}
						</h5>
							<p className="user-description">
								{`Subido por `}
								<span className="owner-most-viewed-documents">{createdByUser}</span>
								{`, ${createdAt}`}
							</p>

					</div>
				</div>
			</td>
			{
				name &&
				<td className="status-cell">
					<span
						style={
							{
								background: '#ffaa00',
								paddingBottom: 3,
								paddingTop: 3,
								paddingLeft: 10,
								paddingRight: 10
							}
						}
						className="text-white x-2 jr-fs-sm ml-2 mb-0 rounded-xl order-sm-2"
					>
						{name}
					</span>
				</td>
			}
			
				<td className="status-cell">
					Descargar documento
				</td>
			
		</tr>
	);
};

export default TableAttachments;