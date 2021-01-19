import { fileBase64 } from 'helpers/fileBase64';
import { toBase64 } from 'helpers/toBase64';
import { getAll, getById } from 'services/aspectGroupsService';
import { editDocumentVersion, getDocumentById, getThumbnail, saveForm, uploadDocument } from 'services/filesService';
import { getTags } from 'services/tagsServices';
import Swal from 'sweetalert2';
import { types } from 'types/types';
import { KEY_DOC } from '../constants/constUtil';

export const startDocumentsTypeLoading = () => {
	return async (dispatch) => {

		try {

			const resp = await getAll();

			dispatch(documentsTypeLoaded(resp.data));

		} catch (error) {
			console.log(error);
		}

	}
};

const documentsTypeLoaded = (documentsType) => {
	return {
		type: types.docsDocumentsTypeLoaded,
		payload: documentsType
	}
};

export const startDetailDocumentTypeLoading = (id) => {
	return async (dispatch) => {

		try {

			Swal.fire({
				title: 'Loading...',
				text: 'Please wait...',
				allowOutsideClick: false,
				heightAuto: false,
			});

			Swal.showLoading();

			const resp = await getById(id);

			dispatch(detailDocumentTypeLoaded(resp.data));

		} catch (error) {
			console.log(error);
		} finally {
			Swal.close();
		}

	}
};

const detailDocumentTypeLoaded = (folders) => {
	return {
		type: types.docsDetailDocumentTypeLoaded,
		payload: folders
	}
};

export const documentsRemoveAll = () => {
	return {
		type: types.docsRemoveAll,
	}
};

export const removeDetailDocumentType = () => {
	return {
		type: types.docsRemoveDetailDocumentType,
	}
};

export const detailDocumentSetValueField = (sectionId, name, value) => {
	return {
		type: types.docsSetValueField,
		payload: {
			sectionId,
			name,
			value
		}
	}
};

export const startSaveFormLoading = (fileId, folderId, aspectGroup) => {
	return async (dispatch) => {

		try {

			Swal.fire({
				title: 'Loading...',
				text: 'Please wait...',
				allowOutsideClick: false,
				heightAuto: false,
			});

			Swal.showLoading();

			await saveForm(fileId, folderId, aspectGroup);

			dispatch(saveFormFinish());

		} catch (error) {
			console.log(error);
		} finally {
			Swal.close();
		}

	}
};

const saveFormFinish = () => {
	return {
		type: types.docsSaveFormFinish,
	}
};

export const documentSaveFolderId = (folderId) => {
	return {
		type: types.docsSaveFolderId,
		payload: folderId,
	}
};

export const startDropFileLoading = (files) => {
	return async (dispatch) => {
		try {

			Swal.fire({
				title: 'Loading...',
				text: 'Please wait...',
				allowOutsideClick: false,
				heightAuto: false,
			});

			Swal.showLoading();

			const resp = await uploadDocument(KEY_DOC, files[0]);

			// SAVE STORE ID LOADED
			dispatch(saveFileIdLoaded(resp.data.id));
			dispatch(saveThumbnailGenerated(resp.data.thumbnailGenerated));

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
};

const saveFileIdLoaded = (fileId) => {
	return {
		type: types.docsSaveFileIdLoaded,
		payload: fileId,
	}
};

const saveThumbnailGenerated = (thumbnailGenerated) => {
	return {
		type: types.docsSaveThumbnailGenerated,
		payload: thumbnailGenerated,
	}
};

export const startThumbnailLoading = (fileId) => {
	return async (dispatch) => {

		try {

			const resp = await getThumbnail(fileId);

			dispatch(documentSaveThumbnail(`data:;base64,${fileBase64(resp.data)}`));

		} catch (error) {
			console.log(error);
		}

	}
};

const documentSaveThumbnail = (thumbnail) => {
	return {
		type: types.docsSaveThumbnail,
		payload: thumbnail
	}
};

export const documentsClear = () => {
	return {
		type: types.docsClear,
	}
};

export const startDocumentByIdLoading = (fileId) => {
	return async (dispatch) => {

		try {

			Swal.fire({
				title: 'Loading...',
				text: 'Please wait...',
				allowOutsideClick: false,
				heightAuto: false,
			});

			Swal.showLoading();

			const resp = await getDocumentById(fileId);

			Swal.close();

			dispatch(documentByIdLoaded(resp.data));

		} catch (error) {
			Swal.close();
			console.log(error);
		}

	}
};

const documentByIdLoaded = ({ aspectGroup, fileId, folderId }) => {
	return {
		type: types.docsDocumentByIdLoaded,
		payload: {
			aspectGroup, fileId, folderId
		}
	}
}

export const startTagsLoading = () => {
	return async (dispatch) => {

		try {

			const resp = await getTags();

			dispatch(tagsLoaded(resp.data));

		} catch (error) {
			console.log(error);
		}

	}
};

const tagsLoaded = (tags) => {
	return {
		type: types.docsTagsLoaded,
		payload: tags,
	}
}

export const saveVersioningType = (type) => {
	return {
		type: types.docsSaveVersioningType,
		payload: type,
	}
};

export const saveVersioningComments = (comments) => {
	return {
		type: types.docsSaveVersioningComments,
		payload: comments,
	}
};

export const clearVersioningType = () => {
	return {
		type: types.docsClearVersioningType,
	}
};

export const clearVersioningComments = () => {
	return {
		type: types.docsClearVersioningComments
	}
};

export const startEditDocumentLoading = (
	files,
	fileId,
	versioningType,
	versioningComments,
	folderId,
	aspectGroup
) => {
	return async (dispatch) => {

		try {

			Swal.fire({
				title: 'Loading...',
				text: 'Please wait...',
				allowOutsideClick: false,
				heightAuto: false,
			});

			Swal.showLoading();

			await editDocumentVersion(files[0], fileId, versioningType, versioningComments);

			//await saveForm(fileId, folderId, aspectGroup);

			dispatch(saveFormFinish());

		} catch (error) {
			console.log(error);
		} finally {
			Swal.close();
		}

	}
};
