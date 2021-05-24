import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import IntlMessages from 'util/IntlMessages';
import { DialogTitle, Divider} from '@material-ui/core';
import { SummaryDocument } from './SummaryDocument';
import { SummaryInvolved } from './SummaryInvolved';


const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
  },

}));


const ModalLoadFlow = (props) => {
  const { data, close, open } = props

  const classes = useStyles();

  const dispatch = useDispatch();

  const { authUser } = useSelector(state => state.auth);
       
  const handleClose = () => {
    close()
  }
  return (

    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth={'md'}
      >
        <DialogTitle id="form-dialog-title">
        <div style={{fontFamily:'Poppins', fontSize:"16px"}}>
            <IntlMessages id="Resumen documento" />
        </div>
        </DialogTitle>

        <DialogContent>
          <SummaryDocument/>

            <Divider className="mt-3"/>

        <h3>Involucrados</h3> 

          <SummaryInvolved/>

        
           <Divider className="mt-3"/>

        <h3>Observaciones Generales</h3>

        <TextField
          id="outlined-textarea"
          label="Multiline Placeholder"
          placeholder="Placeholder"
          multiline
          variant="outlined"
        />
        
        </DialogContent>

        <DialogActions>
        
          <Button
          style={{
            backgroundColor: '#E1F0FF', color: '#3699FF', fontFamily: "Poppins", fontSize: '12px', fontWeight: 500, border: "none",
            boxShadow: "none", height: '45px', width: '120px'
          }}
            onClick={handleClose}
            variant="contained"
            color="primary"
          >
            Cancelar
          </Button>

          <Button
           style={{
           fontFamily: "Poppins", fontSize: '12px', fontWeight: 500, border: "none",boxShadow: "none", height: '45px', width: '120px'
          }}
            //onClick={handleOnSave}
            variant="contained"
            color="primary"
           // disabled={messageErrorName}
          >
           Confirmar
          </Button>

        </DialogActions>

      </Dialog>

    </div>

  )
}

export default ModalLoadFlow;