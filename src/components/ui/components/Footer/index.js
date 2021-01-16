import React from 'react';
import IntlMessages from 'util/IntlMessages';

const Footer = () => {
	return (
		<footer className="app-footer">
			<span className="d-inline-block">
				Copyright <IntlMessages id="company.name" /> &copy; {1900 + new Date().getYear()}
			</span>
		</footer>
	);
}
	;

export default Footer;
