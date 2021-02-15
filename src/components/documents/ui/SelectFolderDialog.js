import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { Divider, List, ListItem, ListItemText } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';

import IntlMessages from 'util/IntlMessages';
import {
	documentSaveFolderId,
	startSaveCurrentFolderBreadcrumbs,
	startSubFoldersLoading,
	documentSaveFolderName,
} from 'actions/documents';
import SimpleBreadcrumbs from '../../ui/SimpleBreadcrumbs';
import SkeletonApp from 'components/ui/SkeletonApp';

export const SelectFolderDialog = ({ setOpenModal, openModal }) => {

	const dispatch = useDispatch();

	const {
		currentFolderBreadcrumbs,
		historyFoldersBreadcrumbs,
		loadingFolderModal = false,
	} = useSelector(state => state.documents);

	const { authUser } = useSelector(state => state.auth);

	const handleClickBreadcrumbs = (e, { id, }) => {

		e.preventDefault();

		dispatch(startSaveCurrentFolderBreadcrumbs(id));

	}

	const handleSelectItem = (folder) => {

		dispatch(documentSaveFolderId(folder.id));

		dispatch(documentSaveFolderName(folder.name));

		setOpenModal(!openModal);

	}

	const handleLoadChilds = (folder) => {

		dispatch(startSubFoldersLoading(folder, authUser));

	}

	const handleRenderItems = () => {
		console.log(currentFolderBreadcrumbs.folders);
		return (
			<List>
				{
					
					currentFolderBreadcrumbs.folders.map((folder, i) => {
						return (
							<div key={folder.id}>
								<ListItem>
									<ListItemText
										className="modal-select-folder"
										onClick={() => handleSelectItem(folder)}
									>
										{`${folder.name} `}
									</ListItemText>

									{
										folder.hashSubFolders
										&&
										<i
											onClick={() => handleLoadChilds(folder)}
											className="fas fa-chevron-right modal-select-folder"
											style={{ fontSize: 12 }}
										>
										</i>
									}

								</ListItem>

								{
									(currentFolderBreadcrumbs.folders.length - 1) !== i
									&&
									<Divider component="li" />
								}

							</div>
						)
					})
				}
			</List>
		);

	}

	return (
		<div>
			<Dialog
				open={openModal}
				aria-labelledby="form-dialog-title"
				fullWidth={true}
			>
				<DialogTitle id="form-dialog-title">
					<IntlMessages id="document.select.folder" />
				</DialogTitle>

				<DialogContent dividers>

					{
						!loadingFolderModal
						&&
						<>
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
						</>
					}

					{
						loadingFolderModal
						&&
						<SkeletonApp />
					}

				</DialogContent>

				<DialogActions>

					<Button
						onClick={() => setOpenModal(!openModal)}
						color="primary">
						<IntlMessages id="button.text.cancel" />
					</Button>

				</DialogActions>

			</Dialog>
		</div>
	)
}
