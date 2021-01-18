import React, { useEffect } from 'react'
import { useDropzone } from 'react-dropzone';
import IntlMessages from 'util/IntlMessages';
import { useDispatch, useSelector } from 'react-redux';
import { startDropFileLoading, startThumbnailLoading } from 'actions/documents';

export const DropZoneDocument = () => {

	const dispatch = useDispatch();

	const { thumbnail = null,
		thumbnailGenerated = false,
		fileIdLoaded = '' } = useSelector(state => state.documents);

	const { acceptedFiles, getRootProps, getInputProps, open } = useDropzone({
		onDrop: (acceptedFiles) => dropFile(acceptedFiles),
		noClick: true,
		noKeyboard: true,
	});

	useEffect(() => {

		if (!thumbnailGenerated || fileIdLoaded.length === 0) {
			return;
		}

		setTimeout(() => {

			loadThumbnail();

		}, 1000);

	}, [fileIdLoaded, thumbnailGenerated]);

	const dropFile = async (files) => {

		dispatch(startDropFileLoading(files));

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
