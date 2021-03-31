import { Grid, makeStyles, Paper, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Button from 'components/ui/Button'
import GetAppIcon from '@material-ui/icons/GetApp';
import AlmaLogo from 'assets/images/alma-logo.jpg';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { sharedDocumentSetValue, startVerifyFile } from 'actions/sharedDocument';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import { CircularProgress, DialogTitle, Divider, } from '@material-ui/core';
import IntlMessages from 'util/IntlMessages';

const useStyles = makeStyles(theme => ({

}));

const fieldName = <IntlMessages id="table.shared.dialog.field.password" />


export default function DialogPassword({ canDownload, setCanDownload }) {
    const { documentId } = useParams();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const classes = useStyles();
    const { fields } = useSelector(state => state.sharedDocument);

    useEffect(() => {
        dispatch(startVerifyFile(documentId));
    }, [documentId])


    const handleOnChange = ({ target }) => {
        const { name, value } = target;

        dispatch(sharedDocumentSetValue(name, value));

    }

    return (<Dialog
        open={!canDownload}
        onClose={null}
        aria-labelledby="form-dialog-title"
        fullWidth={true}
    >
        <DialogTitle>
            Contraseña
          </DialogTitle>
        <DialogContent>
            <Grid container spacing={2}>
                <Grid item md={12}>
                    <h5 style={{ textAlign: 'justify' }}><b>Legend of zelda.pdf</b>                 
                    <IntlMessages id="downloadFile.shared.dialog.message.protected" />
                    </h5>
                </Grid>
                <Grid item md={12} container wrap="nowrap">
                    <TextField
                        name="password"
                        label={fieldName}
                        type="text"
                        variant="outlined"
                        fullWidth
                        size="small"
                        type="password"
                        onChange={handleOnChange}
                    />
                </Grid>
            </Grid>
        </DialogContent>
        <Divider />

        <DialogActions className={classes.dialogActions}>
            <Button
                onClick={() => setCanDownload(true)}
                variant="contained"
                color="primary"
                autoFocus
                disabled={!fields?.password || fields?.password === ""}
            >
                {loading && <CircularProgress size={14} />}
                <IntlMessages id="downloadFile.shared.dialog.button.send" />
              </Button>
        </DialogActions>
    </Dialog>
    )
}