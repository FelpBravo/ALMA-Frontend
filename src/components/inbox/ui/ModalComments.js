import { Button, Grid, IconButton, TextField } from '@material-ui/core';
import { DialogTitle, makeStyles} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import MessageOutlinedIcon from '@material-ui/icons/MessageOutlined';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IntlMessages from 'util/IntlMessages';
import CommentRole from './CommentRole';


const ModalComments = (props) => {
    const { close, open } = props
    const { commentList=[] } = useSelector(state => state.flowDocument);
    console.log("Servicio",commentList)
    const handleClose = () => {
        close()
    }

    return(
        <div>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
            fullWidth={true}
            //maxWidth={true}
        >

            <DialogTitle >
                <div style={{ fontFamily: "Poppins", }}>
                    <IntlMessages id="Comentarios por Rol" />
                </div>
            </DialogTitle>

            <DialogContent>
            <CommentRole/>
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

export default ModalComments