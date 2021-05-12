import { TextField } from '@material-ui/core';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react'
import { useDispatch } from 'react-redux';

import { detailDocumentSetValueField } from 'actions/documents';
import { DATE, FORMAT_YYYY_MM_DD, LIST, NUMERIC } from 'constants/constUtil';

import { MultiLevelSelect } from './MultiLevelSelect';

export const PrintField = ({ sectionId, name, label, type, value, propertyItemList,mandatory }) => {

	const dispatch = useDispatch();

	const handleOnChange = ({ target }) => {
		const { name, value } = target;

		dispatch(detailDocumentSetValueField(sectionId, name, value));

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
					value={value ? moment(value).format(FORMAT_YYYY_MM_DD) : ''}
					size="small"
					required={mandatory}
					InputLabelProps={{
						shrink: true,
					}
					}
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
					required={mandatory}
					onChange={handleOnChange}
				/>
			);
		case LIST:
			return <MultiLevelSelect
				sectionId={sectionId}
				name={name}
				label={label}
				type={type}
				value={value}
				required={mandatory}
				propertyItemList={propertyItemList}
			/>

		default:
			return (
				<>
				<TextField
					name={name}
					label={label}
					value={value ? value : ''}
					variant="outlined"
					fullWidth
					required={mandatory}
					size="small"
					disabled={name === "mc:alma_doc_number"}
					onChange={handleOnChange}
					helperText={mandatory? "Campo Requerido": " "}
				/>
				</>
			);
		

	}
}

PrintField.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
};
