import { Button, Grid } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import AddIcon from '@material-ui/icons/Add';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { adminFoldersremoveAll, openModalFolder, setActionModal, setFolder, startFoldersLoading, startFoldersTypesLoading, startSaveCurrentFolder } from 'actions/adminFolders';
import SimpleBreadcrumbs from 'components/ui/SimpleBreadcrumbs';
import { ACTION_CREATE } from 'constants/constUtil';
import { hasAuthority } from 'util/authorities';
import IntlMessages from 'util/IntlMessages';

import { DataTableFolders } from './ui/DataTableFolders';
import FolderDialog from './ui/FolderDialog';

const Folders = () => {

	const dispatch = useDispatch();

	const { folders = [], currentFolders, historyFolders = [], folder } = useSelector(state => state.adminFolders);

	const { authUser, authorities } = useSelector(state => state.auth);
	const canCreateFolder = useSelector(hasAuthority('ROLE_FOLDER_CREATE'));

	useEffect(() => {
			dispatch(adminFoldersremoveAll())
			dispatch(startFoldersLoading(authUser));

	}, [dispatch]);

	const handleClickBreadcrumbs = (e, { id, name}) => {
		e.preventDefault();
		dispatch(startSaveCurrentFolder(authUser,id,name));

	}

	const handleNewFolder = () => {

		dispatch(openModalFolder());

		dispatch(setActionModal(ACTION_CREATE));

		dispatch(setFolder({
			name: '',
			parentId: currentFolders.id <0? 0 : currentFolders.id,
			parentName: currentFolders.name,
			position: 0,
			state: true,
			icon: '',
		}));

	}
	const valid_create = authorities.find(rol=>rol === 'ROLE_FOLDER_CREATE')? false : true


	return (
		<div className="row">
			<div className="col-xl-12 col-lg-12 col-md-12 col-12">
				<div className="jr-card">

					<div className="row">
						<div className="col-xl-12 col-lg-12 col-md-12 col-12">

							<div className="jr-card-header d-flex align-items-center">
								<h3 className="mb-0">
									<IntlMessages id="folders.title" />
								</h3>
								<div className="ml-auto">
									<span className="custom-link-dash">

									</span>
								</div>
							</div>

						</div>
					</div>

					{
						folders.length >= 0
						&&
						<div className="row">
							<div className="col-xl-12 col-lg-12 col-md-12 col-12">

								<Grid container spacing={2}>

									<Grid item xs={10}>

									<SimpleBreadcrumbs
									className="mb-0"
									items={historyFolders}
									currentItem={currentFolders.id}
									handleClick={handleClickBreadcrumbs}
								/>
									</Grid>

									<Grid item xs={2}>
									{
										canCreateFolder &&
										<Link component="button" variant="body2" onClick={handleNewFolder} >
																		<AddIcon color='primary' />
																			Crear nuevo directorio
									</Link>
									}
									</Grid>
								</Grid>

							</div>
						</div>
					}
					{
						folders.length >= 0
						&&
						<div className="row mt-3">
							<div className="col-xl-12 col-lg-12 col-md-12 col-12">

								<DataTableFolders
									folders={currentFolders.folders}
									privileges={authorities}
								/>

							</div>
						</div>
					}

				</div>
			</div>

			<FolderDialog />

		</div>

	);
}

export default Folders;
