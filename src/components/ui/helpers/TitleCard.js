import React from 'react'
import IntlMessages from 'util/IntlMessages'

export const TitleCard = ({ message }) => {
	return (
		<div className="jr-card-header d-flex align-items-center">
			<h3 className="mb-0">
				<IntlMessages id={message} />
			</h3>
			<div className="ml-auto">
				<span className="custom-link-dash">

				</span>
			</div>
		</div>
	)
}
