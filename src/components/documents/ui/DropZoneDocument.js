import React, { useContext, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import IntlMessages from 'util/IntlMessages';
import { startDocumentByIdVisibility, startDropFileLoading, startThumbnailLoading } from 'actions/documents';
import { DocumentContext } from '../helpers/DocumentContext';
import ThumbnailPreview from '../../ThumbnailPreview/ThumbnailPreview.js';
import { Paper } from '@material-ui/core';
import { openModalVisibility } from 'actions/search';

export const DropZoneDocument = () => {

	const dispatch = useDispatch();
	const location = useLocation();

	const [shouldDisplayThumbnail, setShouldDisplayThumbnail] = useState(true);

	// Contexto provider
	const { setFiles } = useContext(DocumentContext);

	// ID DOCUMENTO URL	
	const { document = '' } = queryString.parse(location.search);

	const { thumbnail = null,
		thumbnailGenerated = false,
		fileIdLoaded = '' ,} = useSelector(state => state.documents);

	const prueba = useSelector(state => state.documents);

	const { acceptedFiles, getRootProps, getInputProps, open } = useDropzone({
		onDrop: (acceptedFiles) => dropFile(acceptedFiles),
		noClick: true,
		noKeyboard: true,
	});
    const {path} = acceptedFiles
	console.log(prueba)

	useEffect(() => {

		if (!thumbnailGenerated || fileIdLoaded.length === 0) {
			return;
		}

		setTimeout(() => {

			loadThumbnail();

		}, 3000);

	}, [fileIdLoaded, thumbnailGenerated]);

	const dropFile = (files) => {

		if (document.length === 0) {
			dispatch(startDropFileLoading(files));
		} else {
			setFiles(files);
		}

	}

	const loadThumbnail = () => {

		dispatch(startThumbnailLoading(fileIdLoaded));

	}

	return (
		<div className="row">
			<div className="col-xl-12 col-lg-12 col-md-12 col-12">

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
				</div>

				{
					
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
							console.log("Prueba kasdjask");
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
					{thumbnail &&
		            <Paper style={{ padding: 30 }}>
						<ThumbnailPreview
						thumbnail={thumbnail}
						remove={() => setShouldDisplayThumbnail(false)}
                        name='asdas'
						/>
						<div></div>
				</Paper>
				}
			</div>
		</div>
	)
}
