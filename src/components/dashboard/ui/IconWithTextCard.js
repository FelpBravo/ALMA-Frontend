import React from "react";
import Widget from '../../ui/components/Widget/index';


const IconWithTextCard = ({ data }) => {
	const { imageIcon, title, subTitle, cardColor } = data;
	return (
		<Widget styleName={`p-3 bg-${cardColor} text-white`}>
			<div className="media align-items-center flex-nowrap py-lg-2">
				<div className="mr-2">
					<img src={imageIcon} alt={imageIcon} />
				</div>
				<div className="media-body">
					<h1 className="jr-fs-xxl jr-font-weight-black mb-1 text-white">{title}</h1>
					<p className="mb-0 jr-fs-cp">{subTitle}</p>
				</div>
			</div>
		</Widget>
	);
};

export default IconWithTextCard;
