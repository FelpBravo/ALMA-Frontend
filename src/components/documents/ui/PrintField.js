import React from 'react'
import PropTypes from 'prop-types';
import { DATE, NUMERIC } from 'constants/constUtil';
import { TextField } from '@material-ui/core';
import { useDispatch } from 'react-redux';

export const PrintField = ({ name, label, type, value }) => {

	const dispatch = useDispatch();

	const handleOnChange = ({ target }) => {
		const { name, value } = target;

		//console.log(name, value);

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
					value={value ? value : '2017-05-24'}
					size="small"
					InputLabelProps={{
						shrink: true,
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

PrintField.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
};
