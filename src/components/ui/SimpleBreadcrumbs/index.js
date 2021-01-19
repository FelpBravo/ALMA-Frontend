import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';

const SimpleBreadcrumbs = ({ items = [], handleClick, currentItem }) => {
	return (
		<Breadcrumbs aria-label="breadcrumb">
			{
				items.map((item) => {
					return (
						currentItem === item.id
							?
							<Typography color="textPrimary">{item.name}</Typography>
							:
							<Link
								className="general-link"
								key={item.id}
								href="/"
								onClick={(e) => handleClick(e, item)}
							>
								{item.name}
							</Link>
					)
				})
			}
		</Breadcrumbs>
	);
}

SimpleBreadcrumbs.propTypes = {
	items: PropTypes.array.isRequired,
	handleClick: PropTypes.func.isRequired,
	currentItem: PropTypes.number.isRequired,
}

export default SimpleBreadcrumbs;