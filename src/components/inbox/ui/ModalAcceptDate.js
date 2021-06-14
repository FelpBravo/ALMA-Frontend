import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { useDispatch, useSelector } from 'react-redux';
import { closeModalVisibility } from 'actions/search';
import IntlMessages from 'util/IntlMessages';
import { DialogTitle, makeStyles, Paper } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Metadata from 'components/search/ui/Information/ui/Metadata';
import Preview from 'components/search/ui/Information/ui/Preview';
import { clearDocumentVisibility, startDocumentByIdVisibility } from 'actions/documents';



const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        overflow: 'hidden',
        padding: theme.spacing(0, 2),
    },
    paper: {
        maxWidth: 500,
        margin: `${theme.spacing(1)}px auto`,
        padding: theme.spacing(1),
    },
}));

const ModalAcceptDate = (props) => {
    const { close, open } = props
    const classes = useStyles();

    const dispatch = useDispatch();

    const { authUser } = useSelector(state => state.auth);

    const { docs } = useSelector(state => state.documents);
    console.log("metadata", docs)

    const { fileId } = useSelector(state => state.flowDocument);



    const handleClose = () => {
        close()
    }

    {/*useEffect(() => {
        dispatch(startDocumentByIdVisibility(fileId));

        return () => dispatch(clearDocumentVisibility())
    }, [fileId])*/}


    return (

        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
                fullWidth={true}
                maxWidth={true}
            >

                <DialogTitle >
                    <div style={{ fontFamily: "Poppins", }}>
                        <IntlMessages id="visibility.modal.title" />
                    </div>
                </DialogTitle>

                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Metadata/>
                        </Grid>
                        <Grid item xs={6}>
                            <Preview authUser={authUser} id={fileId} name={docs.name} />
                        </Grid>
                    </Grid>
                </DialogContent>

                <DialogActions>

                    <Button
                        onClick={handleClose}
                        variant="contained"
                        color="primary"
                    >
                        Cerrar
          </Button>

                </DialogActions>

            </Dialog>

        </div>

    )
}

export default ModalAcceptDate;