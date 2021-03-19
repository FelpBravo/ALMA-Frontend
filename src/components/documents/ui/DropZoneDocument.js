import React, { useContext, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import IntlMessages from 'util/IntlMessages';
import { startDocumentByIdVisibility, startDropFileLoading, startThumbnailLoading } from 'actions/documents';
import { DocumentContext } from '../helpers/DocumentContext';
import ThumbnailPreview from '../../ThumbnailPreview/ThumbnailPreview.js';
import { Grid } from '@material-ui/core';
import get from 'lodash/get';
import { ThumbnailItem } from './ThumbnailItem';
import DocumentLoaded from 'components/ui/components/DocumentLoaded';
import { chunk, remove } from 'lodash-es';
import { documentRemoveFile } from '../../../actions/documents';
import DialogPreview from './DialogPreview';
import Swal from 'sweetalert2';

const MAX_FILES = 20;

export const DropZoneDocument = () => {

	const dispatch = useDispatch();
	const location = useLocation();
	const [dataDialogPreview, setDataDialogPreview] = useState(null);

	// Contexto provider
	const { setFiles } = useContext(DocumentContext);

	// ID DOCUMENTO URL	
	const { document = '' } = queryString.parse(location.search);

	// const { thumbnail = null,
	// 	thumbnailGenerated = false,
	// 	name = '',
	// 	fileIdLoaded = '', } = useSelector(state => state.documents);

	const documentsList = useSelector(state => state.documents.filesLoaded)
	const nDocuments = documentsList?.length;
	const nColumns = (documentsList.length >= 5 && documentsList.length <= 8) ? 2 : 4

	const data = chunk(documentsList, nColumns)
	const { acceptedFiles, getRootProps, getInputProps, open } = useDropzone({
		onDrop: (acceptedFiles) => dropFile(acceptedFiles),
		noClick: true,
		noKeyboard: true,
	});
	const { path } = acceptedFiles

	const dropFile = async (files) => {

		if (document.length === 0) {
			const diff = MAX_FILES - nDocuments - files.length
			if(diff >= 0){
				dispatch(startDropFileLoading(files));
			}else{
				const resp = await Swal.fire({
					title: 'Error',
					text: `Sólo puedes subir ${MAX_FILES} documentos a la carga.`,
					icon: "error",
					showCancelButton: false,
					focusConfirm: true,
					heightAuto: false,
				});
			}
		} else {
			setFiles(files);
		}

	}

	const getPreviewList = (nDocuments) => {
		switch (typeof (nDocuments) === "number") {
			case nDocuments === 0:
				return null;

			case nDocuments < 5:
				return previewListWithThumbnail();

			case nDocuments > 4:
				return previewListWithoutThumbnail();
		}
	}

	const onRemoveFile = fileId => {
		remove(documentsList, item => fileId === item.fileIdLoaded);
		dispatch(documentRemoveFile(documentsList));
	}

	const onCloseDialogPreview = () => {
		setDataDialogPreview(null);
	};

	const previewListWithThumbnail = () => (<Grid container>
		{
			data.map(row =>
				<Grid item container alignItems="center" md={12} spacing={5} style={{ marginTop: 10 }}>
					{
						row.map(({ fileIdLoaded, thumbnailGenerated, thumbnail, name }) =>
							<Grid item md={3} container justify="center">
								<ThumbnailItem
									fileIdLoaded={fileIdLoaded}
									thumbnailGenerated={thumbnailGenerated}
									thumbnail={thumbnail}
									name={name}
									setDataDialogPreview={() => setDataDialogPreview({ fileIdLoaded, thumbnailGenerated, thumbnail, name })}
									onRemoveFile={() => onRemoveFile(fileIdLoaded)} />
							</Grid>)
					}
				</Grid>)
		}
	</Grid>)

	const previewListWithoutThumbnail = () => (<Grid container spacing={1}>
		{
			data.map(row =>
				<Grid item container md={12} spacing={1}>
					{row.map(({ fileIdLoaded, thumbnailGenerated, thumbnail, name }) =>
						<Grid item md={12 / nColumns}>
							<DocumentLoaded
								name={name}
								setDataDialogPreview={() => setDataDialogPreview({ fileIdLoaded, thumbnailGenerated, thumbnail, name })}
								onRemoveFile={() => onRemoveFile(fileIdLoaded)} />
						</Grid>)}
				</Grid>)
		}
	</Grid>)



	return (<>
		<div className="row">
			<div className="col-xl-12 col-lg-12 col-md-12 col-12">
				{nDocuments < MAX_FILES &&
					<div className="row">
						<div className="col-xl-12 col-lg-12 col-md-12 col-12">

							<section className="mt-4">
								<div {...getRootProps({})} className="drop-down">
									<input {...getInputProps()} />
									<img src={require("assets/images/upload.png")} alt="jambo" title="jambo" />
									<div>
										<IntlMessages id="document.dropDocument" />
									</div>
									<div>
										<IntlMessages id="document.dropDocuments" />
									</div>

									<button className="btn" type="button" onClick={open}>
										<IntlMessages id="document.selectDocument" />
									</button>
								</div>
							</section>

						</div>
					</div>}
				{/* {
					documentsList.map(({ fileIdLoaded, thumbnailGenerated, thumbnail }) =>
						<ThumbnailItem fileIdLoaded={fileIdLoaded} thumbnailGenerated={thumbnailGenerated} thumbnail={thumbnail} name="test"/>
					)

				} */}
				{nDocuments > 0 && <h4 style={{ marginTop: 20 }}>{<IntlMessages id="document.documentsLoad" />}</h4>}
				{getPreviewList(nDocuments)}

				{/* {

					acceptedFiles
					&&
					fileIdLoaded
					&&
					acceptedFiles.length > 0
					&&
					<Paper style={{ padding: 30 }}>
						{shouldDisplayThumbnail && thumbnail ? (
							<ThumbnailPreview
								thumbnail={thumbnail}
								remove={() => setShouldDisplayThumbnail(false)}
								name={acceptedFiles.map((file) => {
									return (
										<>{file.path}</>

									)
								})
								}

							/>
						) : (
							<div></div>
						)}
					</Paper>
				}
				{acceptedFiles.length === 0 && thumbnail && shouldDisplayThumbnail &&
					<Paper style={{ padding: 30 }}>
						<ThumbnailPreview
							thumbnail={thumbnail}
							name={name.slice(0, 50) + '...pdf'}
						/>
						<div></div>
					</Paper>
				} */}
			</div>
		</div>
		<DialogPreview data={dataDialogPreview} handleClose={onCloseDialogPreview} />
	</>
	)
}
