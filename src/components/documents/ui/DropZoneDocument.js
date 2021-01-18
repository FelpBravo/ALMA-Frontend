import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import { useDropzone } from 'react-dropzone';
import IntlMessages from 'util/IntlMessages';
import { getThumbnail, uploadDocument } from 'services/filesService';
import { fileBase64 } from 'helpers/fileBase64';
import { useDispatch, useSelector } from 'react-redux';
import { documentSaveThumbnail, saveFileIdLoaded } from 'actions/documents';

const keyDoc = '9d5f20ac-335b-4c64-b0b4-934cd795ba1a';

export const DropZoneDocument = () => {

	const dispatch = useDispatch();

	const { thumbnail = null } = useSelector(state => state.documents);

	const { acceptedFiles, getRootProps, getInputProps, open } = useDropzone({
		onDrop: (acceptedFiles) => dropFile(acceptedFiles),
		noClick: true,
		noKeyboard: true,
	});

	const [respUpload, setRespUpload] = useState({ id: '', thumbnailGenerated: false });


	useEffect(() => {

		setTimeout(() => {

			loadThumbnail();

		}, 1000);

	}, [respUpload]);

	const dropFile = async (files) => {
		try {

			Swal.fire({
				title: 'Loading...',
				text: 'Please wait...',
				allowOutsideClick: false,
				heightAuto: false,
			});

			Swal.showLoading();

			const resp = await uploadDocument(keyDoc, files[0]);

			setRespUpload({ ...resp.data });

			// SAVE STORE ID LOADED
			dispatch(saveFileIdLoaded(resp.data.id));

			Swal.close();

		} catch (error) {
			Swal.close();
			Swal.fire({
				title: 'Upload',
				text: 'Archivo ya existe',
				icon: "error",
				heightAuto: false,
			});
		}

	}

	const loadThumbnail = async () => {
		if (respUpload.thumbnailGenerated) {
			try {

				const resp = await getThumbnail(respUpload.id);

				dispatch(documentSaveThumbnail(`data:;base64,${fileBase64(resp.data)}`));

			} catch (error) {
				console.log(error);
			}
		}
	}

	return (
		<div className="row">
			<div className="col-xl-12 col-lg-12 col-md-12 col-12">

				<div className="row">
					<div className="col-xl-12 col-lg-12 col-md-12 col-12">

						<section className="mt-4">
							<div {...getRootProps({})} className="drop-down">
								<input {...getInputProps()} />
								<i className="fas fa-cloud-upload-alt" style={{ fontSize: 50 }}></i>
								<span>
									<IntlMessages id="document.dropDocument" />
								</span>
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
					acceptedFiles.length > 0
					&&
					<div className="row">
						<div className="col-xl-12 col-lg-12 col-md-12 col-12 mt-3">
							<h4>
								<IntlMessages id="document.documentsLoad" />
							</h4>
							<ul>
								{
									acceptedFiles.map((file) => {
										return (
											<li key={file.path}>
												{file.path} - {file.size} bytes
											</li>
										)
									})
								}
							</ul>
						</div>
					</div>
				}

				<div className="row">
					<div className="col-xl-12 col-lg-12 col-md-12 col-12 mt-3">
						{
							thumbnail
								?
								<img
									alt="Not available"
									className=""
									src={thumbnail} />
								:
								<span className="mt-3">
									<IntlMessages id="document.thumbnail.not.available" />
								</span>
						}
					</div>
				</div>

			</div>
		</div>
	)
}
