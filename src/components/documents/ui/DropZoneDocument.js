import { Grid } from '@material-ui/core';
import { chunk, remove } from 'lodash-es';
import get from 'lodash/get';
import queryString from 'query-string';
import React, { useContext, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';

import { startDocumentByIdVisibility, startDropFileLoading, startThumbnailLoading } from 'actions/documents';
import DocumentLoaded from 'components/ui/components/DocumentLoaded';
import IntlMessages from 'util/IntlMessages';

import { documentRemoveFile } from '../../../actions/documents';
import ThumbnailPreview from '../../ThumbnailPreview/ThumbnailPreview.js';
import { DocumentContext } from '../helpers/DocumentContext';
import DialogPreview from './DialogPreview';
import { ThumbnailItem } from './ThumbnailItem';

export function DropZoneDocument( {document, setFiles} ){
	const dispatch = useDispatch();
	const location = useLocation();
	const [dataDialogPreview, setDataDialogPreview] = useState(null);

	console.log("document.length", document)
	// ID DOCUMENTO URL	
	const MAX_FILES = document.length === 0 ? 20 : 1;
	// const { thumbnail = null,
	// 	thumbnailGenerated = false,
	// 	name = '',
	// 	fileIdLoaded = '', } = useSelector(state => state.documents);

	const documentsList = useSelector(state => state.documents.filesLoaded)
	const nDocuments = documentsList?.length;
	const nColumns = (documentsList.length >= 5 && documentsList.length <= 8) ? 2 : 4
	const [count, setCount] = useState(nDocuments)

	useEffect(() => {
		if (count === 0)
			setCount(nDocuments);
	}, [nDocuments])

	const data = chunk(documentsList, nColumns)
	const { acceptedFiles, getRootProps, getInputProps, open } = useDropzone({
		onDrop: (acceptedFiles) => dropFile(acceptedFiles),
		noClick: true,
		noKeyboard: true,
	});

	const dropFile = async (files) => {
		setCount(files.length)
		const diff = MAX_FILES - nDocuments - files.length
		console.log("diff", diff)
		if (diff < 0) {
			const resp = await Swal.fire({
				title: 'Error',
				text: `Sólo puedes subir ${MAX_FILES} documentos a la carga.`,
				icon: "error",
				showCancelButton: false,
				focusConfirm: true,
				heightAuto: false,
			});
		} else {
			if (document.length === 0) {
				console.log("startDropFileLoading")
				dispatch(startDropFileLoading(files));


			} else {
				setFiles(files);
			}
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

	const previewListWithThumbnail = () => 
	{
	return(<Grid container>
		{count > 0 &&
			data.map((row, index)=>
				{
					return(<Grid key={index} item container alignItems="center" md={12} spacing={5} style={{ marginTop: 10 }}>
					{
						row.map(({ fileIdLoaded, thumbnailGenerated, thumbnail, name }) =>
							<Grid item md={3} container justify="center" key={fileIdLoaded}>
								<ThumbnailItem
									key={fileIdLoaded}
									fileIdLoaded={fileIdLoaded}
									thumbnailGenerated={thumbnailGenerated}
									thumbnail={thumbnail}
									name={name}
									setDataDialogPreview={() => setDataDialogPreview({ fileIdLoaded, thumbnailGenerated, thumbnail, name })}
									onRemoveFile={() => onRemoveFile(fileIdLoaded)} />
							</Grid>)
					}
				</Grid>)}
				)
		}
	</Grid>)}

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
