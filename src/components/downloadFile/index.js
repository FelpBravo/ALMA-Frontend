import { Grid, makeStyles, Paper, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Button from 'components/ui/Button'
import GetAppIcon from '@material-ui/icons/GetApp';
import AlmaLogo from 'assets/images/alma-logo.jpg';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { sharedDocumentSetValue, startDownloadFile, startVerifyFile } from 'actions/sharedDocument';
import DialogPassword from './DialogPassword';
import IntlMessages from 'util/IntlMessages';

const useStyles = makeStyles(theme => ({
    rootPaper:{
        padding: theme.spacing(4),
    },
    button: {
        padding: theme.spacing(2, 8),
        fontSize: 16
    },
}));

export default function DownloadFilePage() {
    const { documentId } = useParams();
    const dispatch = useDispatch();
    const { authUser } = useSelector(state => state.auth);
    const { fields, fileName } = useSelector(state => state.sharedDocument);
    const [canDownload, setCanDownload] = useState(false)
    const classes = useStyles()

    const handleDownload = () => {
        dispatch(startDownloadFile(documentId, fields?.password, fileName))
    }


    console.log("documentId", documentId)
    return <Grid container alignItems="center" justify="center" >
        <DialogPassword canDownload={canDownload} setCanDownload={setCanDownload} />
        <Grid item md={8}>
            <Paper elevation={3} className={classes.rootPaper}>
                <Grid direction="column" spacing={8} container alignItems="center" justify="center" >
                    <Grid item md>
                        <img style={{ height: 250 }} src={AlmaLogo} alt="alma logo" />
                    </Grid>
                    <Grid item md>
                        <h1>{fileName}</h1>
                    </Grid>
                    <Grid item md>
                        <Button
                            className={classes.button}
                            startIcon={<GetAppIcon size="large" />}
                            variant="contained"
                            size="large"
                            disabled={!canDownload || !fields?.password}
                            onClick={handleDownload}
                            color="secondary">
                            <IntlMessages id="downloadFile.shared.button.download" />
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    </Grid>
}