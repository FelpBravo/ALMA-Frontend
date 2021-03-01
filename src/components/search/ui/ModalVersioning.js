import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { useDispatch, useSelector } from 'react-redux';
import { closeModalVersioning, versioningRemove  } from 'actions/search';
import IntlMessages from 'util/IntlMessages';
import { DialogTitle, InputAdornment, makeStyles, Paper, TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { TableVersioning } from './TableVersioning';



const useStyles = makeStyles((theme) => ({
  root: {
    height: 1000,
    maxWidth: 500,  
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(1),
  },
}));

const ModalVersioning= () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const { authUser, userId = '' } = useSelector(state => state.auth);

  const { openModal3 } = useSelector(state => state.searchs);

  const { docs } = useSelector(state => state.documents);

  const { signatures = [] } = docs


  const handleClose = () => {
    dispatch(versioningRemove())
    dispatch(closeModalVersioning());
  }

  
  return (

    <div>
      <Dialog
        open={openModal3}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth={true}
        maxWidth={true}
      >
        <DialogTitle >
          <div style={{ fontFamily: "Poppins", }}>
            <IntlMessages id="versioning.modal.title" />
          </div>
        </DialogTitle>

        <DialogContent >
          <Grid container spacing={2}>
            <Grid item xs={12}>
             <TableVersioning/>
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

export default ModalVersioning;