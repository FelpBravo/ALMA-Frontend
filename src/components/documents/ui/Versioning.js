import { Divider, FormControl, FormControlLabel, Radio } from '@material-ui/core';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { clearVersioningComments, clearVersioningType, saveVersioningComments, saveVersioningType } from 'actions/documents';
import { RadioGroupField, TextField } from 'components/ui/Form';
import { VERSION_TYPE_MAJOR, VERSION_TYPE_MINOR } from 'constants/constUtil';
import IntlMessages from 'util/IntlMessages';

const labelMajor = <IntlMessages id="document.versioning.type.major" />
const labelMinor = <IntlMessages id="document.versioning.type.minor" />
const labelComments = <IntlMessages id="document.versioning.comments" />

export const Versioning = () => {
	const { register, control, formState: { errors } } = useFormContext();

	const commonProps = {
		register,
		errors,
		control,
		shrink: true,
		size: "small",
	}

	return (
		<div className="row">
			<div className="col-xl-12 col-lg-12 col-md-12 col-12 mt-3">

				<div className="row">
					<div className="col-xl-12 col-lg-12 col-md-12 col-12">
						<h4>{<IntlMessages id="document.versioning.title" />}</h4>
					</div>
				</div>

				{/* <div className="row">
					<div className="col-xl-12 col-lg-12 col-md-12 col-12">
						<RadioGroupField
							label={<IntlMessages id="document.versioning.title" />}
							{...commonProps}
							name="version">
							<FormControlLabel
								value={VERSION_TYPE_MAJOR}
								control={<Radio color="primary" />}
								label={labelMajor}
							/>
							<FormControlLabel
								value={VERSION_TYPE_MINOR}
								control={<Radio color="primary" />}
								label={labelMinor}
							/>
						</RadioGroupField>
					</div>
				</div> */}

				<div className="row">
					<div className="col-xl-12 col-lg-12 col-md-12 col-12 mt-2">

						<TextField
							name="versioningComments"
							label={labelComments}
							// value={versioningComments}
							variant="outlined"
							fullWidth
							multiline
							rows={3}
							size="small"
							{...commonProps}
						// onChange={handleOnChange}
						/>

					</div>
				</div>

				<div className="row">
					<div className="col-xl-12 col-lg-12 col-md-12 col-12 mt-3">
						<Divider />
					</div>
				</div>

			</div>
		</div>
	)
}
