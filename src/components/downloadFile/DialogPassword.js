import { CircularProgress, DialogTitle, Divider, Grid, makeStyles } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import { clearErrors, sharedDocumentSetValue } from 'actions/sharedDocument';
import Button from 'components/ui/Button';
import { isEmpty } from 'lodash-es';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IntlMessages from 'util/IntlMessages';

const useStyles = makeStyles(theme => ({
    description:{
        textAlign: 'justify'
    }
})); 

const fieldName = <IntlMessages id="table.shared.dialog.field.password" />

export default function DialogPassword({ file, handleGetFile, loading }) {
    const dispatch = useDispatch();
    const classes = useStyles();
    const { fields, fileName, errors } = useSelector(state => state.sharedDocument);
    const errorPassword = Boolean(errors?.password)

    const handleOnChange = ({ target }) => {
        const { name, value } = target;
        if (!isEmpty(errors)) {
            dispatch(clearErrors())
        }
        dispatch(sharedDocumentSetValue(name, value));

    }

    return (<Dialog
        open={!Boolean(file)}
        onClose={null}
        aria-labelledby="form-dialog-title"
        fullWidth={true}
    >
        <DialogTitle>
            <IntlMessages id="downloadFile.shared.dialog.title" />
        </DialogTitle>
        <DialogContent>
            <Grid container spacing={2}>
                <Grid item md={12}>
                    <h5 className={classes.description}><strong>{`${fileName} `}</strong>
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
                        error={errorPassword}
                        helperText={errors?.password}
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
                onClick={() => handleGetFile(false)}
                variant="contained"
                color="primary"
                autoFocus
                disabled={loading || (!fields?.password || fields?.password === "")}
            >
                {loading && <CircularProgress size={14} />}
                <IntlMessages id="downloadFile.shared.dialog.button.send" />
            </Button>
        </DialogActions>
    </Dialog>
    )
}