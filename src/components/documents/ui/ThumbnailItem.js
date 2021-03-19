import React, { useContext, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import IntlMessages from 'util/IntlMessages';
import { startDocumentByIdVisibility, startDropFileLoading, startThumbnailLoading } from 'actions/documents';
import { DocumentContext } from '../helpers/DocumentContext';
import ThumbnailPreview from '../../ThumbnailPreview/ThumbnailPreview.js';

export const ThumbnailItem = ({ fileIdLoaded, thumbnailGenerated, thumbnail, name, onRemoveFile, setDataDialogPreview }) => {

    const dispatch = useDispatch();
    const currentFile = useSelector(state => state.documents.filesLoaded.find( item => item.fileIdLoaded === fileIdLoaded))

    useEffect(() => {

        if (fileIdLoaded && thumbnailGenerated && !thumbnail) {
            loadThumbnail();
        }

    }, [fileIdLoaded, thumbnailGenerated, thumbnail]);

    const loadThumbnail = () => {
        dispatch(startThumbnailLoading(fileIdLoaded));
    }

    return (
        fileIdLoaded && (
            <ThumbnailPreview
                thumbnail={currentFile?.thumbnail}
                remove={onRemoveFile ? () => onRemoveFile() : null}
                preview={setDataDialogPreview ? () => setDataDialogPreview() : null}
                name={name}
            />
        )
    )
}
