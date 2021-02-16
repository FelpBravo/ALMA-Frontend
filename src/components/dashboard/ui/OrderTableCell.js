import React from 'react';
import Avatar from '@material-ui/core/Avatar';

const OrderTableCell = (props) => {

	const {
		id,
		name,
		image,
		status,
		icon,
		tags,
		folder,
		large,
		date,
		activity,
		userName,
		isViewedDocuments = false,
		owner,
		isSubscriptions,
	} = props.data;

	let statusStyle = 'text-white bg-grey';

	if (status) {
		statusStyle = status.includes("Completed")
			? "text-white bg-success"
			: status.includes("On Hold") ? "bg-amber"
				: status.includes("Delayed") ? "text-white bg-danger" : "text-white bg-grey";
	}
	return (
		<tr tabIndex={-1} key={id}>
			<td>
				<div className="user-profile d-flex flex-row align-items-center">
					{
						image && <Avatar
							alt={name}
							src={image}
							className="user-avatar user-avatar-custom"
						/>
					}

					<div className="user-detail">

						<h5 className="user-name custom-color-table">
							{
							
								userName && icon && <i className={icon}></i>
							}
							
							{userName && ` ${userName} `}
							
							{
								activity
								&&
								<span className="description-activity">{activity}</span>
							}

							{` ${name} `}
						</h5>

						{
							!isSubscriptions
							&&
							!isViewedDocuments
							&&
							date
							&&
							<p className="user-description">{`Creado el ${date}`}</p>
						}

						{
							/* !isSubscriptions
							&&
							isViewedDocuments
							&&
							date
							&& */
							owner
							&&
							<p className="user-description">
								{`Subido por `}
								<span className="owner-most-viewed-documents">{owner}</span>
								{`, ${date}`}
							</p>
						}

					</div>
				</div>
			</td>
			{
				folder &&
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
						{folder}
					</span>
				</td>
			}
			{
				tags &&
				<td className="status-cell">
					{
						tags.map(tag => {
							if (large) {
								return <span
									key={tag.id}
									style={
										{
											background: tag.hex,
											paddingBottom: 3,
											paddingTop: 3,
											paddingLeft: 10,
											paddingRight: 10
										}
									}
									className="text-white x-2 jr-fs-sm ml-2 mb-0 rounded-xl order-sm-2"
								>
									{tag.tag}
								</span>
							} else {
								return <i
									key={tag.id}
									style={{ color: tag.hex, margin: 1 }}
									className="zmdi zmdi-circle jr-fs-xxs"
								/>
							}
						})
					}
				</td>
			}
		</tr>
	);
};

export default OrderTableCell;
