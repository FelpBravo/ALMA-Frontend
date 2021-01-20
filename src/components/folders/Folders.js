import React, { useEffect } from 'react';
import IntlMessages from 'util/IntlMessages';
import { useDispatch, useSelector } from 'react-redux';

import { openModalFolder, setActionModal, setFolder, startFoldersLoading, startSaveCurrentFolder } from 'actions/adminFolders';
import { DataTableFolders } from './ui/DataTableFolders';
import SimpleBreadcrumbs from 'components/ui/SimpleBreadcrumbs';
import FolderDialog from './ui/FolderDialog';
import { Button, Grid, IconButton } from '@material-ui/core';
import { ACTION_CREATE } from 'constants/constUtil';

const Folders = () => {

	const dispatch = useDispatch();
	const { folders = [], currentFolders, historyFolders = [] } = useSelector(state => state.adminFolders);

	console.log(folders);

	useEffect(() => {

		if (folders.length === 0) {
			dispatch(startFoldersLoading());
		}

	}, [dispatch, folders]);

	const handleClickBreadcrumbs = (e, { id, }) => {

		e.preventDefault();

		dispatch(startSaveCurrentFolder(id));

	}

	const handleNewFolder = () => {

		dispatch(openModalFolder());

		dispatch(setActionModal(ACTION_CREATE));

		dispatch(setFolder({
			name: '',
			parentId: currentFolders.id,
			parentName: currentFolders.name,
			position: 0,
			state: true,
			icon: '',
		}));

	}

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

					<div className="row">
						<div className="col-xl-12 col-lg-12 col-md-12 col-12">

							<Grid
								container
								justify="flex-end"
								alignItems="flex-end"

							>

								<Button
									color="primary"
									size="small"
									type="button"
									variant="contained"
									onClick={handleNewFolder}
								>
									<i className="fa fa-plus cursor-pointer"></i>
								</Button>

							</Grid>

						</div>
					</div>

					<div className="row">
						<div className="col-xl-12 col-lg-12 col-md-12 col-12">

							<SimpleBreadcrumbs
								items={historyFolders}
								currentItem={currentFolders.id}
								handleClick={handleClickBreadcrumbs}
							/>

						</div>
					</div>

					<div className="row">
						<div className="col-xl-12 col-lg-12 col-md-12 col-12">

							<DataTableFolders
								folders={currentFolders.folders}
							/>

						</div>
					</div>

				</div>
			</div>

			<FolderDialog />

		</div>

	);
}

export default Folders;
