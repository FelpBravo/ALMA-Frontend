import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { closeModalFolder, startEditFolderLoading, startSaveFolderLoading } from 'actions/adminFolders';
import { ACTION_CREATE } from 'constants/constUtil';
import IntlMessages from 'util/IntlMessages';
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@material-ui/core';

const fieldName = <IntlMessages id="folders.modal.field.name" />
const fieldPosition = <IntlMessages id="folders.modal.field.position" />

const FolderDialog = () => {

	const dispatch = useDispatch();

	const { openModal, folder, actionModal } = useSelector(state => state.adminFolders);

	const [formValues, setFormValues] = useState({});

	const { name, position, state, parentId, parentName } = formValues;

	useEffect(() => {

		setFormValues({ ...folder });

	}, [folder]);

	const handleClose = () => {

		dispatch(closeModalFolder());

	}

	const handleOnChange = ({ target }) => {
		const { name, value } = target;

		setFormValues({
			...formValues,
			[name]: value
		});

	}

	const handleOnSave = () => {

		const data = {
			...formValues,
			position: parseInt(position),
			state: String(formValues.state) === 'true',
			company: 1
		};

		if (actionModal === ACTION_CREATE) {

			dispatch(closeModalFolder());
			dispatch(startSaveFolderLoading(data, parentId, parentName));

		} else {

			dispatch(closeModalFolder());
			dispatch(startEditFolderLoading(data, parentId, parentName));

		}

	}

	return (
		<div>
			<Dialog
				open={openModal}
				onClose={handleClose}
				aria-labelledby="form-dialog-title"
				fullWidth={true}
			>
				<DialogTitle id="form-dialog-title">
					{
						actionModal === ACTION_CREATE
							? <IntlMessages id="folders.modal.title.create" />
							: <IntlMessages id="folders.modal.title.edit" />
					}
				</DialogTitle>

				<DialogContent dividers>

					<div className="row">
						<div className="col-xl-12 col-lg-12 col-md-12 col-12">

							<TextField
								name="name"
								value={name}
								autoFocus
								label={fieldName}
								type="text"
								variant="outlined"
								fullWidth
								size="small"
								onChange={handleOnChange}
							/>

						</div>
					</div>

					<div className="row mt-3">
						<div className="col-xl-12 col-lg-12 col-md-12 col-12">

							<TextField
								name="position"
								value={position}
								label={fieldPosition}
								type="number"
								variant="outlined"
								fullWidth
								size="small"
								onChange={handleOnChange}
							/>

						</div>
					</div>

					{
						actionModal !== ACTION_CREATE
						&&
						<div className="row mt-3">
							<div className="col-xl-12 col-lg-12 col-md-12 col-12">
								<h4>{<IntlMessages id="folders.modal.field.state" />}</h4>
							</div>
						</div>
					}

					{
						actionModal !== ACTION_CREATE
						&&
						<div className="row">
							<div className="col-xl-12 col-lg-12 col-md-12 col-12">

								<FormControl component="fieldset">
									<RadioGroup
										aria-label="gender"
										name="state"
										value={String(state)}
										onChange={handleOnChange}
									>
										<FormControlLabel
											value="true"
											label="Activo"
											control={<Radio color="primary" />}

										/>
										<FormControlLabel
											value="false"
											control={<Radio color="primary" />}
											label="Inactivo"
										/>
									</RadioGroup>
								</FormControl>

							</div>
						</div>
					}

				</DialogContent>

				<DialogActions>
					<Button
						onClick={handleClose}
						color="primary">
						<IntlMessages id="button.text.cancel" />
					</Button>

					<Button
						disabled={(!name || name.length < 3) || position <= 0}
						onClick={handleOnSave}
						color="primary"
					>
						<IntlMessages id="button.text.save" />
					</Button>
				</DialogActions>

			</Dialog>
		</div>
	);
}

export default FolderDialog;
