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
import get from 'lodash/get';
import InputLabel from '@material-ui/core/InputLabel';

export const ThumbnailItem = ({ fileIdLoaded, thumbnailGenerated, thumbnail, name }) => {

    const [shouldDisplayThumbnail, setShouldDisplayThumbnail] = useState(true);
    const dispatch = useDispatch();
    useEffect(() => {

        if (fileIdLoaded && thumbnailGenerated ) {
            loadThumbnail();
        }

    }, [fileIdLoaded, thumbnailGenerated]);

    const loadThumbnail = () => {
        dispatch(startThumbnailLoading(fileIdLoaded));
    }

    return (
        fileIdLoaded && (
                <ThumbnailPreview
                    thumbnail={thumbnail}
                    remove={() => setShouldDisplayThumbnail(false)}
                    name={name}
                />
            )
    )
}
