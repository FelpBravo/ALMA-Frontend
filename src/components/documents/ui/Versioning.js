import React from 'react';
import { Divider, FormControl, FormControlLabel, Radio, RadioGroup, TextField } from '@material-ui/core';
import IntlMessages from 'util/IntlMessages';
import { useDispatch, useSelector } from 'react-redux';
import {
	saveVersioningType, clearVersioningType,
	saveVersioningComments, clearVersioningComments
} from 'actions/documents';
import { VERSION_TYPE_MAJOR, VERSION_TYPE_MINOR } from 'constants/constUtil';

const labelMajor = <IntlMessages id="document.versioning.type.major" />
const labelMinor = <IntlMessages id="document.versioning.type.minor" />
const labelComments = <IntlMessages id="document.versioning.comments" />

export const Versioning = () => {

	const dispatch = useDispatch();

	const { versioningType = '', versioningComments = '' } = useSelector(state => state.documents);

	const handleOnChange = ({ target }) => {
		const { name, value } = target;

		switch (name) {
			case 'versioningType':
				if (value) {
					dispatch(saveVersioningType(value));
				} else {
					dispatch(clearVersioningType());
				}

				break;

			case 'versioningComments':
				if (value) {
					dispatch(saveVersioningComments(value));
				} else {
					dispatch(clearVersioningComments());
				}

				break;

			default:
				break;
		}
	}

	return (
		<div className="row">
			<div className="col-xl-12 col-lg-12 col-md-12 col-12 mt-3">

				<div className="row">
					<div className="col-xl-12 col-lg-12 col-md-12 col-12">
						<h4>{<IntlMessages id="document.versioning.title" />}</h4>
					</div>
				</div>

				<div className="row">
					<div className="col-xl-12 col-lg-12 col-md-12 col-12">

						<FormControl component="fieldset">
							<RadioGroup
								aria-label="gender"
								name="versioningType"
								value={versioningType}
								onChange={handleOnChange}
							>
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
							</RadioGroup>
						</FormControl>

					</div>
				</div>

				<div className="row">
					<div className="col-xl-12 col-lg-12 col-md-12 col-12 mt-2">

						<TextField
							name="versioningComments"
							label={labelComments}
							value={versioningComments}
							variant="outlined"
							fullWidth
							size="small"
							onChange={handleOnChange}
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
