import PropTypes from 'prop-types';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { AutoCompleteField, TextField } from 'components/ui/Form';
import { DATE, LIST, NUMERIC } from 'constants/constUtil';

export const PrintField = ({ sectionId, name, label, type, value, propertyItemList, mandatory }) => {
	const { register, control, formState: { errors } } = useFormContext();

	const commonProps = {
		register,
		errors,
		control,
		shrink: true,
		size: "small",
	}

	switch (type) {
		case DATE:
			return (
				<TextField
					key={name}
					type="date"
					label={label}
					name={name}
					required={mandatory}
					InputLabelProps={{
						shrink: true,
					}}
					{...commonProps}
				/>
			);

		case NUMERIC:
			return (
				<TextField
					key={name}
					type="number"
					label={label}
					name={name}
					required={mandatory}
					{...commonProps}
				/>
			);

		case LIST:
			return <AutoCompleteField
				name={name}
				label={label}
				options={propertyItemList}
				optionsLabel="value"
				optionsValue="value"
				required={mandatory}
				{...commonProps}
				shrink={null}
			/>

		default:
			return (<TextField
				key={name}
				name={name}
				required={mandatory}
				label={label}
				{...commonProps}
			/>);


	}
}

PrintField.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
};
