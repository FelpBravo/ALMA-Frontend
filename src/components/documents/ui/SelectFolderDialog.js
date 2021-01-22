import React, { useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';

import IntlMessages from 'util/IntlMessages';
import {
	closeModalSelectFolder, documentSaveFolderId,
	startSaveCurrentFolderBreadcrumbs, startSubFoldersLoading,
	documentSaveFolderName,
	startFoldersLoading
} from 'actions/documents';
import SimpleBreadcrumbs from '../../ui/SimpleBreadcrumbs';

export const SelectFolderDialog = () => {

	const dispatch = useDispatch();

	const {
		folders = [],
		openModalSelectFolder = false,
		currentFolderBreadcrumbs,
		historyFoldersBreadcrumbs,
	} = useSelector(state => state.documents);

	const { authUser } = useSelector(state => state.auth);

	useEffect(() => {

		if (authUser && folders.length === 0) {
			dispatch(startFoldersLoading(authUser));
		}

	}, [dispatch, authUser, folders])

	const handleClose = () => {

		dispatch(closeModalSelectFolder());

	}

	const handleClickBreadcrumbs = (e, { id, }) => {

		e.preventDefault();

		dispatch(startSaveCurrentFolderBreadcrumbs(id));

	}

	const handleSelectItem = async (folder) => {

		if (!folder.hashSubFolders) {

			dispatch(documentSaveFolderId(folder.id));

			dispatch(documentSaveFolderName(folder.name));

			dispatch(closeModalSelectFolder());

			return;

		}

		dispatch(startSubFoldersLoading(folder));

	}

	const handleRenderItems = () => {

		return (
			<List>
				{
					currentFolderBreadcrumbs.folders.map(folder => {
						return (
							<ListItem key={folder.id}>
								<ListItemText
									className="modal-select-folder"
									onClick={() => handleSelectItem(folder)}
								>
									{`${folder.name} `}
									{
										folder.hashSubFolders
										&& <i className="fas fa-chevron-right" style={{ fontSize: 12 }}></i>
									}
								</ListItemText>
							</ListItem>
						)
					})
				}
			</List>
		);

	}

	return (
		<div>
			<Dialog
				open={openModalSelectFolder}
				onClose={handleClose}
				aria-labelledby="form-dialog-title"
			>
				<DialogTitle id="form-dialog-title">
					<IntlMessages id="document.select.folder" />
				</DialogTitle>

				<DialogContent dividers>

					<div className="row">
						<div className="col-xl-12 col-lg-12 col-md-12 col-12">

							<SimpleBreadcrumbs
								items={historyFoldersBreadcrumbs}
								currentItem={currentFolderBreadcrumbs.id}
								handleClick={handleClickBreadcrumbs}
							/>

						</div>
					</div>

					<div className="row">
						<div className="col-xl-12 col-lg-12 col-md-12 col-12">
							{

								handleRenderItems()

							}
						</div>
					</div>

				</DialogContent>

				<DialogActions>
					<Button
						onClick={handleClose}
						color="primary">
						<IntlMessages id="button.text.cancel" />
					</Button>
				</DialogActions>

			</Dialog>
		</div>
	)
}
