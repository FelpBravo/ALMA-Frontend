import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { AutoCompleteField, DateField, TextField } from 'components/ui/Form';
import { DATE, LIST, NUMERIC } from 'constants/constUtil';

export const PrintField = ({ sectionId, name, label, type, value, propertyItemList, mandatory }) => {
	const { register, control, formState: { errors }, setValue } = useFormContext();

	useEffect(() => {
		if (type === DATE)
			setValue(name, value || null)
	}, [type, name])

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
				<DateField
					key={name}
					label={label}
					name={name}
					required={mandatory}
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
				disabled={name === "mc:alma_doc_number"}
				{...commonProps}
			/>);


	}
}

PrintField.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
};
