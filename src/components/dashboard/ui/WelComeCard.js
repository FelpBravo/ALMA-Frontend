import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import IntlMessages from "util/IntlMessages";
import { ACTIVIY_RESUME } from '../../../constants/constUtil';

const WelComeCard = () => {

	const isMounted = useRef(true);

	const { audits } = useSelector(state => state.audit);
	const { widgets } = audits;

	const [resumeLeft, setResumeLeft] = useState({ properties: {} });

	useEffect(() => {

		return () => {
			isMounted.current = false;
		}

	}, []);

	useEffect(() => {

		if (widgets && widgets.length > 0) {

			const resumens = widgets.filter((w) => w.title === ACTIVIY_RESUME);
			if (resumens && resumens.length > 0) {
				if (isMounted.current) {
					setResumeLeft(resumens[0]);
				}
			}

		}

	}, [widgets]);

	return (
		<div className="jr-wel-ema">
			<h3 className="mb-0">
				<IntlMessages id="dashboard.titleActivityResume" />
			</h3>
			<p className="jr-fs-sm text-uppercase">

			</p>
			<ul className="list-unstyled">
				{
					resumeLeft.properties.uploaded_documents
					&&
					<li className="mb-1">
						<i className="fas fa-arrow-up mr-2"></i>
						<span>{`Haz subido ${resumeLeft.properties.uploaded_documents} documentos`}</span>
					</li>
				}
				{
					resumeLeft.properties.subscriptions
					&&
					<li className="mb-1">
						<i className="far fa-star mr-2"></i>
						<span>{`Te haz suscrito a ${resumeLeft.properties.subscriptions} documentos`}</span>
					</li>
				}
				{
					resumeLeft.properties.visualizations
					&&
					<li className="mb-1">
						<i className="fas fa-box-open mr-2"></i>
						<span>{`Haz visualizado ${resumeLeft.properties.visualizations} documentos`}</span>
					</li>
				}
				{
					resumeLeft.properties.most_used_tags
					&&
					<li className="mb-1">
						<i className="fas fa-tag mr-2"></i>
						<span>
							{`Etiqueta más utilizada: `}

							<span

								style={
									{
										background: '#e1f0ff',
										color: '#369bff',
										paddingBottom: 3,
										paddingTop: 3,
										paddingLeft: 10,
										paddingRight: 10,
									}
								}
								className="x-2 jr-fs-sm ml-2 mb-0 rounded-xl order-sm-2"
							>
								{resumeLeft.properties.most_used_tags}
							</span>
						</span>
					</li>
				}
			</ul>
		</div>
	);
};

export default WelComeCard;
