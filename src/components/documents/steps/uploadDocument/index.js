import { Divider } from '@material-ui/core';
import { Fab } from '@material-ui/core';
import BackspaceSharpIcon from '@material-ui/icons/BackspaceSharp';
import EditIcon from '@material-ui/icons/Edit';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { clearFolderIdOrigin, documentsClear, startDocumentByIdLoading, startThumbnailLoading } from 'actions/documents';
import { TitleCard } from 'components/ui/helpers/TitleCard';
import IntlMessages from 'util/IntlMessages';

import { DocumentContext } from '../../helpers/DocumentContext';
import { DetailDocumentType } from '../../ui/DetailDocumentType';
import { DropZoneDocument } from '../../ui/DropZoneDocument';
import { FormInit } from '../../ui/FormInit';
import { SelectFolderDialog } from '../../ui/SelectFolderDialog';
import { SelectTags } from '../../ui/SelectTags';
import { Versioning } from '../../ui/Versioning';

export default function UploadDocument({ editMode, setFiles, document, files, handleClear }) {
    const [directorio, setDirectorio] = useState(false)
    const [openModal, setOpenModal] = useState(false);

    const {
        path = '',
        pathFolderName = '',
        folderName = '',
        folderIdOrigin = '',
    } = useSelector(state => state.documents);
    const dispatch = useDispatch();

    const clearPath = () => {
        setDirectorio(false)
        dispatch(clearFolderIdOrigin(folderIdOrigin))
    }

    useEffect(() => {
        if (pathFolderName != path && pathFolderName) {
            setDirectorio(true)
        }
        else {
            setDirectorio(false)
        }

    }, [pathFolderName, path])

    useEffect(() => { // Cargar datos para editar

        dispatch(documentsClear());

        if (document.length === 0) {
            return;
        }

        dispatch(startDocumentByIdLoading(document));

        dispatch(startThumbnailLoading(document));
        return () => handleClear();
    }, [dispatch, document]);

    const Directory = () => {
        if (directorio) {
            return <>
                <div style={{ display: 'flex', height: 38 }}>
                    <IntlMessages id="document.title.newDirectory" />
                </div>
                <p>{pathFolderName}
                    <BackspaceSharpIcon
                        color="primary"
                        onClick={clearPath}
                        style={{ marginLeft: 20 }}
                    />
                </p>
            </>

        }
        return <>
            <div style={{ display: 'flex', height: 38 }}>
                <h4 style={{ marginTop: 10 }}>
                    <IntlMessages id="document.title.currentDirectory" />
                </h4>
                <Fab
                    onClick={() => setOpenModal(!openModal)}
                    color="primary" style={{ width: 35, height: 35, marginLeft: 70 }}>
                    <EditIcon
                        style={{ width: 15, height: 15 }}
                        value={folderName} />
                </Fab>
            </div>
            <p> {path} </p>
        </>
    }

    return <>
        <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                {
                    editMode
                        ? <TitleCard message="document.title.editDocument" />
                        : <TitleCard message="document.loadDocuments" />

                }
            </div>
        </div>

        {
            !editMode
            &&
            <FormInit />
        }

        {editMode
            &&
            <div className="row">
                <div className="col-xl-12 col-lg-12 col-md-12 col-12 mt-3">
                    <Directory />
                </div>
                <div className="col-xl-4 col-lg-12 col-md-12 col-12 mt-3">
                    <SelectFolderDialog
                        setOpenModal={setOpenModal}
                        openModal={openModal}
                    />
                </div>
            </div>
        }
        <DocumentContext.Provider value={{ setFiles }}>
            <DropZoneDocument document={document} setFiles={setFiles} />
        </DocumentContext.Provider>

        <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-12 mt-3">

                <Divider />
            </div>
        </div>

        <DetailDocumentType />

        {
            editMode && files?.length > 0 &&
            <Versioning />
        }

        <SelectTags />
    </>
}