import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react'
import { useFormContext } from 'react-hook-form';
// import { useDispatch } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { detailDocumentSetValueField } from 'actions/documents';
import { AutoCompleteField, CheckField, SelectField, TextField } from 'components/ui/Form';
import { DATE, FORMAT_YYYY_MM_DD, LIST, NUMERIC } from 'constants/constUtil';

import { MultiLevelSelect } from './MultiLevelSelect';

export const PrintField = ({ sectionId, name, label, type, value, propertyItemList,mandatory }) => {
	const { register, control, formState: { errors } } = useFormContext();
	const dispatch = useDispatch();
	console.log("register", register)
	const commonProps = {
		register,
		errors,
		control,
		shrink: true,
		size: "small",
		// className: classes.input
	}


	const handleOnChange = ({ target }) => {
		const { name, value } = target;

		dispatch(detailDocumentSetValueField(sectionId, name, value));

	}

	switch (type) {
		case DATE:
			return (
				<TextField
					key={name}
					type="date"
					label={label}
					name={name}
					InputLabelProps={{
						shrink: true,
					}}
					{...commonProps}
					// onChange={handleOnChange}
					// value={value ? moment(value).format(FORMAT_YYYY_MM_DD) : ''}

				/>
			);

		case NUMERIC:
			return (
				<TextField
					key={name}
					type="number"
					label={label}
					name={name}
					{...commonProps}
					// required={mandatory}
					// onChange={handleOnChange}
				/>
			);
			
		case LIST:
			return <MultiLevelSelect
				sectionId={sectionId}
				name={name}
				label={label}
				type={type}
				value={value}
				// required={mandatory}
				propertyItemList={propertyItemList}
			/>

		default:
			return (<TextField
			key={name}
					name={name}
					label={label}
					{...commonProps}
					// value={value ? value : ''}
					// variant="outlined"
					// fullWidth
					// required={mandatory}
					// size="small"
					// onChange={handleOnChange}
					// helperText={mandatory? "Campo Requerido": " "}
				/>);
		

	}
}

PrintField.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
};
