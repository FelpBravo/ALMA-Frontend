import React from 'react';

import LineIndicator from './LineIndicator';

const SiteAudience = () => {

	return (
		<div className="pt-xl-2">
			<h6 className="text-uppercase mb-2 mb-sm-4"></h6>
			<ul className="jr-line-indicator jr-fs-sm">
				<li>
					<LineIndicator
						width="78%"
						title="Total documentos subidos"
						title2="8.74"
						color="primary"
						value="56%"
					/>
				</li>

				<li>
					<LineIndicator
						width="42%"
						title="Mis documentos subidos"
						title2="8.74"
						color="purple"
						value="56%"
					/>
				</li>
			</ul>
		</div>
	)
};
export default SiteAudience;
