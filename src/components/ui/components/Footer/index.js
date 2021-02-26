import React from 'react';
import IntlMessages from 'util/IntlMessages';

const Footer = () => {
	return (
		<footer className="app-footer">
			<span className="d-inline-block" style={{fontSize: "12px"}}>
			<img src={require("assets/images/logo.png")} alt="jambo" title="jambo" />
			{` `} {` `} Copyright <IntlMessages id="company.name" /> &copy; {1900 + new Date().getYear()}
			</span>
		</footer>
	);
}
	;

export default Footer;
