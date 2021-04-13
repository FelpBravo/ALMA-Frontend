import { CircularProgress, Grid, makeStyles } from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import AlmaLogo from 'assets/images/alma-logo.jpg';
import Button from 'components/ui/Button';
import React from 'react';
import { useSelector } from 'react-redux';
import IntlMessages from 'util/IntlMessages';
import DialogPassword from './DialogPassword';

const useStyles = makeStyles(theme => ({
    rootPaper: {
        padding: theme.spacing(4),
    },
    button: {
        padding: theme.spacing(2, 8),
        fontSize: 16
    },
}));

export default function AliveFile({ handleGetFile, file, loading }) {
    const { fields, fileName, passwordNeeded } = useSelector(state => state.sharedDocument);
    const classes = useStyles()
    const downloadDisabled = passwordNeeded && (!file || !fields?.password)

    return <>
        {passwordNeeded && <DialogPassword file={file} handleGetFile={handleGetFile} loading={loading} />}
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
                    disabled={loading || downloadDisabled}
                    onClick={() => handleGetFile(true)}
                    color="secondary">
                    {loading && !downloadDisabled && <CircularProgress size={14} />}

                    <IntlMessages id="downloadFile.shared.button.download" />
                </Button>
            </Grid>

        </Grid>
    </>
}