import React from 'react';
import Widget from 'components/ui/components/Widget';
import WelComeCard from './ui/WelComeCard';
import SiteAudience from './ui/SiteAudience';
import SiteVisit from './ui/SiteVisit';

export const ActivityResume = () => {
	return (

		<Widget>

			<div className="row">
				<div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
					<WelComeCard />
				</div>

				<div className="jr-audi-col col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
					<SiteAudience />
				</div>

				<div className="jr-visit-col col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
					<SiteVisit />
				</div>
			</div>

		</Widget>


	)
}
