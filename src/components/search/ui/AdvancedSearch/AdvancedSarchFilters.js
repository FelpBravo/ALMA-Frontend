import React from 'react'
import PropTypes from 'prop-types';
import { DATE, NUMERIC, DATERANGE } from 'constants/constUtil';
import { TextField } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { searchSetValueFilter } from '../../../../actions/search';
import { DateRange } from './DateRange';
import IntlMessages from 'util/IntlMessages';




export const AdvancedSarchFilters = ({ name, label, type, value }) => {

	const dispatch = useDispatch();

	const handleOnChange = ({ target }) => {
		const { name, value } = target;

		dispatch(searchSetValueFilter(name, value));

	}
	console.log("HOLAAA SOY FELIPE", label, name)
	const labelType = label => {
		switch (label) {
			case "Etiquetas":
				return (
					<IntlMessages id="todo.labels" />
				);
			case "Doc ID":
				return (
					<IntlMessages id="dashboard.advancedDocId" />
				);
			case "Security Mode":
				return (
					<IntlMessages id="dashboard.advancedSecurityMode" />
				);
			case "Alma Doc Number":
				return (
					<IntlMessages id="dashboard.advancedAlmaDocNumber" />
				);
			case "Nombre documento":
				return (
					<IntlMessages id="table.search.documentName" />
				);
			case "Autor":
				return (
					<IntlMessages id="tasks.table.column6" />
				);
			case "Version":
				return (
					<IntlMessages id="doc.table.column6" />
				);
			case "Peso del archivo (bytes)":
				return (
					<IntlMessages id="dashboard.advancedBytes" />
				);
			case "Titulo":
				return (
					<IntlMessages id="dashboard.advancedTitulo" />
				);
			case "Modificado en":
				return (
					<IntlMessages id="dashboard.advancedModifiedIn" />
				);
			case "Creado en":
				return (
					<IntlMessages id="dashboard.advancedCreatedIn" />
				);
			case "hasta":
				return (
					<IntlMessages id="dashboard.advancedHasta" />
				);
		}
	}
	console.log("HOLAAA SOY FELIPE", label)
	switch (type) {
		case DATE:
			return (
				<TextField
					key={name}
					label={labelType(label)}
					name={name}
					variant="outlined"
					fullWidth
					type="date"
					value={value ? value : ''}
					size="small"
					InputLabelProps={{
						shrink: true,
					}}
					style={{
						color: '#3699FF',
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
					label={labelType(label)}
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
