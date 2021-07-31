import { Button, Divider, Grid, makeStyles } from '@material-ui/core';
import { Fab } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import BackspaceSharpIcon from '@material-ui/icons/BackspaceSharp';
import EditIcon from '@material-ui/icons/Edit';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';

import { clearFolderIdOrigin, documentsClear, startDocumentByIdLoading, startFoldersLoading, startThumbnailLoading } from 'actions/documents';
import { TitleCard } from 'components/ui/helpers/TitleCard';
import IntlMessages from 'util/IntlMessages';

import { DocumentContext } from '../../helpers/DocumentContext';
import { DetailDocumentType } from '../../ui/DetailDocumentType';
import { DropZoneDocument } from '../../ui/DropZoneDocument';
import { FormInit } from '../../ui/FormInit';
import { SelectFolderDialog } from '../../ui/SelectFolderDialog';
import { SelectTags } from '../../ui/SelectTags';
import { Versioning } from '../../ui/Versioning';
import { CheckField, SelectField } from 'components/ui/Form';
import { useFormContext } from 'react-hook-form';

const useStyles = makeStyles((theme) => ({
    buttons: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    buttonPrimary: {
        fontFamily: "Poppins",
        fontSize: '12px',
        fontWeight: 600,
        border: "none",
        boxShadow: "none",
        height: '45px',
        width: '120px'
    }
}));

export default function UploadDocument({ editMode, setFiles, document, files, handleClear, controlledDocument, disabledSubmit, handleSaveForm, handleSubmit, nextStep }) {
    const [directorio, setDirectorio] = useState(false)
    const [openModal, setOpenModal] = useState(false);
    const history = useHistory();
    const classes = useStyles();
    const { authUser } = useSelector(state => state.auth);
    const [loading, setLoading] = useState(editMode)
    const { flowId } = useParams()
    const { control } = useFormContext();

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
        dispatch(startDocumentByIdLoading(document, flowId, () => setLoading(false)));

        dispatch(startThumbnailLoading(document));
        dispatch(startFoldersLoading(authUser))
        return () => dispatch(documentsClear());


    }, [dispatch, document, authUser, flowId]);

    const goBack = () => history.goBack()

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

    if (loading) return <Grid container alignItems="center" justify="center">
        <CircularProgress />
    </Grid>


    const isControlledDocument = {
        name: 'controlled_document',
        label: 'Documento controlado',
        control,

    };

    return <form onSubmit={handleSubmit(handleSaveForm)}>
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
        {!flowId && editMode &&
            <Grid container style={{ marginTop: 10 }}>
                <Grid item xl={4} lg={4} md={4} sm={12}>
                    <CheckField {...isControlledDocument} />
                </Grid>
            </Grid>}
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
            <DropZoneDocument
                controlledDocument={controlledDocument}
                document={document}
                setFiles={setFiles} />
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
        <Grid container className="mt-4">
            <Grid item md>
                <Button
                    variant="text"
                    color="primary"
                    size="large"
                    onClick={goBack}
                >
                    <KeyboardBackspaceIcon color="primary" style={{ marginRight: 10 }} />
                    <IntlMessages id="dashboard.button.back" />
                </Button>
            </Grid>
            <Grid item md>
                <Grid
                    container
                    justify="flex-end"
                    alignItems="flex-end"
                    spacing={2}
                >
                    <div className={classes.buttons}>
                        {<Button
                            style={{
                                backgroundColor: '#E1F0FF', color: '#3699FF', fontFamily: "Poppins", fontSize: '12px', fontWeight: 600, border: "none",
                                boxShadow: "none", height: '45px', width: '120px'
                            }}
                            type="button"
                            variant="contained"
                            onClick={editMode && flowId ? nextStep : handleClear}
                        >
                            {
                                editMode && flowId
                                    ? "Saltar paso"
                                    : <IntlMessages id="dashboard.advancedSearchClear" />
                            }

                        </Button>}



                        <Button
                            className={classes.buttonPrimary}
                            disabled={disabledSubmit}
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            {

                                controlledDocument
                                    ? <IntlMessages id="document.loadDocuments.submit.flow.next" />
                                    : editMode && flowId
                                        ? <IntlMessages id="document.loadDocuments.submit.edit" />
                                        : <IntlMessages id="document.loadDocuments.load" />
                            }
                        </Button>

                    </div>
                </Grid>
            </Grid>
        </Grid>
    </form>

}