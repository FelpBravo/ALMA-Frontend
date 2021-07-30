import { yupResolver } from '@hookform/resolvers/yup';
import { Checkbox, Chip, Divider, Grid, ListItemText, MenuItem, Typography } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { isEmpty } from 'lodash';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { closeModalFolder, startEditFolderLoading, startFoldersTypesLoading, startGroupsListLoading, startUpdateFolderLoading, validateFolders } from 'actions/adminFolders';
import { startFoldersInitLoading } from 'actions/folders';
import Button from 'components/ui/Button';
import { CheckField, SelectField, TextField } from 'components/ui/Form';
import { ACTION_CREATE, ACTION_EDIT } from 'constants/constUtil';
import IntlMessages from 'util/IntlMessages';

import schema from './FolderDialog.schema';
import GroupItems from './GroupItems'

const fieldName = <IntlMessages id="folders.modal.field.name" />
const fieldPosition = <IntlMessages id="folders.modal.field.position" />

const ITEM_HEIGHT = 78;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 150,
		},
	},
};


const useStyles = makeStyles((theme) => ({
	sectionT: {
		marginTop: theme.spacing(2)
	},
	sectionB: {
		marginBottom: theme.spacing(2)
	},
	actions:{
		margin: theme.spacing(0,2)
	}
}));

const FolderDialog = () => {

	const dispatch = useDispatch();
	const classes = useStyles();

	const { authUser } = useSelector(state => state.auth);

	const { openModal, folder, actionModal, currentFolders, typeFolders = [], groupList, foldersName } = useSelector(state => state.adminFolders);

	const { id } = currentFolders

	const { register, setValue, handleSubmit, control, watch, setError, reset, formState: { errors } } = useForm({
		mode: 'onBlur',
		name: 'folderForm',
		defaultValues: {
			groups: []
		},
		resolver: yupResolver(schema),
	});

	const groupSelected = watch('groups', null)
	const { parentId } = folder;

	useEffect(() => {
		if (openModal && groupList === null)
			dispatch(startGroupsListLoading(authUser))

	}, [openModal, groupList])

	useEffect(() => {
		reset(folder)
		dispatch(startFoldersTypesLoading(authUser, id < 0 ? 0 : id))

	}, [folder]);

	useEffect(() => {
		actionModal === ACTION_EDIT 
		? reset({ groups: [], ...folder, originalName: folder?.name})
		: reset({ groups: []})
	
	}, [folder, actionModal]);


	const handleClose = () => dispatch(closeModalFolder());

	const handleOnSave = values => {

		const data = {
			...values,
			parentId,
			company: 1,
		};
		data.name = data.name.trim()

		if (actionModal === ACTION_CREATE) {
			dispatch(startUpdateFolderLoading(authUser, data, id, parentId))
			dispatch(closeModalFolder());


		} else {
			dispatch(startEditFolderLoading(authUser, data, folder?.id));
			dispatch(closeModalFolder());

		}
		setTimeout(() => {
			dispatch(startFoldersInitLoading(authUser));
		}, 300)

	}

	const commonProps = {
		register,
		errors,
		control,
		shrink: true,
		size: "small",
	}

	const nameProps = {
		name: "name",
		label: fieldName,
		required: true,
		...commonProps,
	}

	const workSpaceTypeProps = {
		name: "type",
		label: <IntlMessages id="folders.type.workspace" />,
		required: true,
		...commonProps,
	}

	const groupsProps = {
		name: "groups",
		label: <IntlMessages id="folders.select.group" />,
		multiple: true,
		defaultValue: [],
		renderValue: selected => `${selected?.length ?? 0} grupos seleccionados`,
		MenuProps,
		...commonProps,
	}

	const isAnonymousProps = {
		name: 'inheritPermissions',
		label: <IntlMessages id="folders.father.permissions" />,
		...commonProps,
	};

	return (
		<div>
			<Dialog
				open={openModal}
				onClose={handleClose}
				aria-labelledby="form-dialog-title"
				fullWidth={true}
				maxWidth='md'
			>
				<DialogTitle>
					{
						actionModal === ACTION_CREATE
							? <IntlMessages id="folders.modal.title.create" style={{ fontSize: 16, fontFamily: "Poppins" }} />
							: <IntlMessages id="folders.modal.title.edit" />
					}
				</DialogTitle>
				<form onSubmit={handleSubmit(handleOnSave)}>
					<DialogContent>
						<div className={classes.sectionB}>
							<Grid container spacing={2}>
								{actionModal === ACTION_CREATE &&
									<Grid item md={6}>
										<SelectField {...workSpaceTypeProps}>
											{typeFolders && typeFolders.map((data, index) =>
												<MenuItem value={data} key={index}>{data.name}</MenuItem>
											)
											}
										</SelectField>
									</Grid>
								}
								<Grid item md={6}>
									<TextField {...nameProps} />
								</Grid>
							</Grid>
						</div>
						<Divider />
						<div className={clsx(classes.sectionB, classes.sectionT)}>
							<h4>
								<IntlMessages id="sidebar.permissions" />
							</h4>
							<CheckField {...isAnonymousProps} />

							<div className="mt-2">
								<SelectField
									id="groups-checkbox"
									{...groupsProps}
								>
									{
										(groupList || [])?.map(({ id, name }) => (
											<MenuItem
												key={id}
												value={name}
											>
												<Checkbox
													color="primary"
													checked={(groupSelected || [])?.find(x => x === name) ? true : false}
												/>
												<Typography variant="body2">
													{name}
												</Typography>
											</MenuItem>
										))
									}
								</SelectField>
								<GroupItems groupSelected={groupSelected} setValue={setValue} />
							</div>
						</div>
					</DialogContent>

					<DialogActions className={classes.actions}>
						<Button
							onClick={handleClose}
							variant="contained"
							color="secondary"
						>
							<IntlMessages id="button.text.cancel" />
						</Button>

						<Button
							disabled={!isEmpty(errors)}
							type="submit"
							variant="contained"
							color="primary"
						>
							<IntlMessages id="button.text.save" />
						</Button>
					</DialogActions>
				</form>
			</Dialog>
		</div>
	);
}

export default FolderDialog;
