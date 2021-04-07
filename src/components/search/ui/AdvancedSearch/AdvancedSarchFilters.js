import React from 'react'
import PropTypes from 'prop-types';
import { DATE, NUMERIC,DATERANGE } from 'constants/constUtil';
import { TextField } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { searchSetValueFilter } from '../../../../actions/search';
import { DateRange } from './DateRange';




export const AdvancedSarchFilters = ({ name, label, type, value }) => {

	const dispatch = useDispatch();

	const handleOnChange = ({ target }) => {
		const { name, value } = target;

		dispatch(searchSetValueFilter(name, value));

	}

	switch (type) {
		case DATE:
			return (
				<TextField
					key={name}
					label={label}
					name={name}
					variant="outlined"
					fullWidth
					type="date"
					value={value ? value : ''}
					size="small"
					InputLabelProps={{
						shrink: true,
					}}
					style={{ color: '#3699FF',	
					}}
					onChange={handleOnChange}
				/>
				
			);

		case NUMERIC:
			return (
				<TextField
					name={name}
					type="number"
					value={value ? value : ''}
					label={label}
					variant="outlined"
					fullWidth
					size="small"
					onChange={handleOnChange}
				/>
			);
			case DATERANGE:
			return (
				<DateRange
					key={name}
					label={label}
					namecomponent={name}
					value={value}
				/>
				
			);

		default:
			return (
				<TextField
					name={name}
					label={label}
					value={value ? value : ''}
					variant="outlined"
					fullWidth
					size="small"
					onChange={handleOnChange}
				/>
			);

	}
}

AdvancedSarchFilters.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
};
