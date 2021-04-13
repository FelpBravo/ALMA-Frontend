import { Grid, makeStyles, Paper } from '@material-ui/core';
import { startDownloadFile, startVerifyFile } from 'actions/sharedDocument';
import FileSaver from 'file-saver';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import IntlMessages from 'util/IntlMessages';
import AliveFile from './alive';
import ErrorFile from './error';
import LoadingFile from './loading';

const useStyles = makeStyles(theme => ({
    rootPaper: {
        padding: theme.spacing(4),
    },
}));


export default function DownloadFile() {
    const { documentId } = useParams();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const classes = useStyles();
    const { fields, fileName, errors, alive } = useSelector(state => state.sharedDocument);
    const [file, setFile] = useState(null)
    const [goDownload, setGoDownload] = useState(false);

    useEffect(() => {
        dispatch(startVerifyFile(documentId));
    }, [documentId])

    const handleGetFile = (directDownload = false) => {
        setLoading(true);
        dispatch(startDownloadFile(documentId, fields?.password, fileName, file, setFile, setLoading, setGoDownload, directDownload))
    }

    useEffect(() => {
        if (goDownload && file) {
            FileSaver.saveAs(file?.data, file?.fileName)
            setGoDownload(false);
        };
    }, [goDownload, file])


    const getByStatus = () => {
        switch (true) {
            case alive:
                return <AliveFile file={file} handleGetFile={handleGetFile} loading={loading} />

            case errors?.notFound:
                return <ErrorFile
                    title={<IntlMessages id="downloadFile.shared.notFound.title" />}
                    description={<IntlMessages id="downloadFile.shared.notFound.subtitle" />} />

            case alive === false:
                return <ErrorFile
                    title={<IntlMessages id="downloadFile.shared.expired.title" />}
                    description={<IntlMessages id="downloadFile.shared.expired.subtitle" />} />

            default:
                return <LoadingFile />
        }
    }

    return (<Grid container alignItems="center" justify="center" >
        <Grid item md={8}>
            <Paper elevation={3} className={classes.rootPaper}>
                {getByStatus()}
            </Paper>
        </Grid>
    </Grid >)
}