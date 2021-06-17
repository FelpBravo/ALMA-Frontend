import { yupResolver } from '@hookform/resolvers/yup';
import { Checkbox, Chip, Divider, Grid, ListItemText, MenuItem, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import GroupIcon from '@material-ui/icons/Group';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { isEmpty } from 'lodash';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { closeModalFolder, startEditFolderLoading, startFoldersTypesLoading, startGroupsListLoading, startUpdateFolderLoading, validateFolders } from 'actions/adminFolders';
import { startFoldersInitLoading } from 'actions/folders';
import { CheckField, SelectField, TextField } from 'components/ui/Form';
import { ACTION_CREATE } from 'constants/constUtil';
import IntlMessages from 'util/IntlMessages';

import schema from './FolderDialog.schema';

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
	rootChips: {
		display: 'flex',
		marginTop: theme.spacing(1),
		flexWrap: 'wrap',
		'& > *': {
			margin: theme.spacing(0.5),
		},
	},
	sectionT: {
		marginTop: theme.spacing(2)
	},
	sectionB: {
		marginBottom: theme.spacing(2)
	}
}));

const FolderDialog = () => {

	const dispatch = useDispatch();
	const classes = useStyles();

	const { authUser } = useSelector(state => state.auth);

	const { openModal, folder, actionModal, currentFolders, typeFolders = [], groupList, foldersName } = useSelector(state => state.adminFolders);

	const { id } = currentFolders

	const { register, setValue, handleSubmit, control, watch, setError, formState: { errors } } = useForm({
		mode: 'onTouched',
		name: 'folderForm',
		defaultValues: {
			groups: []
		},
		resolver: yupResolver(schema),
	});

	const workSpaceName = watch('name', null)
	const groupSelected = watch('groups', null)
	console.log("groupSelected", groupSelected)
	console.log("groupList", groupList)
	const { parentId, parentName } = folder;

	useEffect(() => {
		if (openModal && groupList === null)
			dispatch(startGroupsListLoading(authUser))

	}, [openModal, groupList])

	useEffect(() => {
		dispatch(startFoldersTypesLoading(authUser, id < 0 ? 0 : id))

	}, [folder]);

	useEffect(() => {
		if (workSpaceName)
			if (workSpaceName?.length > 3)
				dispatch(validateFolders(authUser, workSpaceName))
	}, [workSpaceName])

	useEffect(() => {
		if (foldersName) {
			setError('name', { type: 'manual', message: 'folders.modal.title.errors.name' })
		}
	}, [foldersName])

	const handleClose = () => {

		dispatch(closeModalFolder());

	}

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
			dispatch(startEditFolderLoading(authUser, data, parentId, parentName));
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
		// helperText = {!foldersName ? (messageErrorName ? messageErrorName : '') : 'Usuario ya existe'
	}

	const workSpaceTypeProps = {
		name: "type",
		label: "Tipo de espacio de trabajo",
		required: true,
		...commonProps,
		// helperText = {!foldersName ? (messageErrorName ? messageErrorName : '') : 'Usuario ya existe'
	}

	const groupsProps = {
		name: "groups",
		label: "Seleccionar grupos",
		multiple: true,
		renderValue: selected => `${selected?.length ?? 0} grupos seleccionados`,
		MenuProps,
		...commonProps,
	}

	const isAnonymousProps = {
		name: 'is_anonymous',
		label: 'Heredar permisos',
		...commonProps,
	};

	const handleRenderGroups = () => groupSelected?.length > 0 && <div className={classes.rootChips}>
		{groupSelected.map(name => <Chip
			size="small"
			variant="outlined"
			key={name}
			icon={<GroupIcon style={{ marginLeft: 5 }} />}
			onDelete={() => setValue('groups', groupSelected.filter(e => e !== name))}
			label={name}
			color="primary" />)}
	</div>

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
								<Grid item md={6}>
									{actionModal === ACTION_CREATE &&
										<SelectField {...workSpaceTypeProps}>
											{typeFolders && typeFolders.map((data, index) =>
												<MenuItem value={data} key={index}>{data.name}</MenuItem>
											)
											}
										</SelectField>
									}
								</Grid>
								<Grid item md={6}>
									<TextField {...nameProps} />
								</Grid>
							</Grid>
						</div>
						<Divider />
						<div className={clsx(classes.sectionB, classes.sectionT)}>
							<h4>
								Permisos de grupo
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
								{handleRenderGroups()}
							</div>
						</div>
					</DialogContent>

					<DialogActions style={{ margin: 20 }}>
						<Button
							onClick={handleClose}
							variant="contained"
							style={{ backgroundColor: '#E1F0FF', color: '#3699FF', fontFamily: "Poppins", border: "none", boxShadow: "none" }}
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
