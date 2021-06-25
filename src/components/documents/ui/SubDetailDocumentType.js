import { Grid } from '@material-ui/core';
import React from 'react'
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { date, string } from 'yup';

import { DATE, TEXT } from 'constants/constUtil';
import { getRows } from 'helpers/getRows';

import { PrintField } from './PrintField';

export const SubDetailDocumentType = ({ id, name, label, customPropertyList = [] }) => {
	const { setResolver } = useFormContext();

	const getValidation = type => {
		switch (type) {
			case DATE:
				return date().required().min("1900-01-01").max("2100-01-01");

			case TEXT:
				return string().max(100);

			default:
				break;
		}
	}

	useEffect(() => {
		const object = customPropertyList.reduce((obj, item) => ({
			...obj,
			[item?.name]: getValidation(item.type),
		}), {});

		setResolver(resolver => ({ ...resolver, ...object }))
	}, [customPropertyList, setResolver])


	const handleRenderFields = () => {

		if (customPropertyList.length === 0) {
			return;
		}

		const columns = 3;
		const rows = getRows(customPropertyList, columns);

		return [...Array(rows)].map((row, i) => {

			return (
				<Grid container spacing={4} key={i}>
					{
						customPropertyList
							.slice(
								i === 0 ? i : i * columns,
								i === 0 ? columns : i * columns + columns
							)
							.map((item) => {
								return (
									<Grid
										key={item.name}
										item
										md={4}
										lg={4}
										sm={12}
										xs={12}
									>
										<PrintField
											sectionId={id}
											{...item}
										/>
									</Grid>
								)
							})
					}
				</Grid>
			);

		});

	}

	return (
		<div className="row mt-3">
			<div className="col-xl-12 col-lg-12 col-md-12 col-12">

				<div className="row">
					<div className="col-xl-12 col-lg-12 col-md-12 col-12">
						<h4>{label}</h4>
					</div>
				</div>

				{handleRenderFields()}

			</div>

		</div>
	)
}
