import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import IntlMessages from 'util/IntlMessages';
import { DialogTitle, Divider} from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { startDocumentsOfficeLoading } from 'actions/documents';
import Alert from '@material-ui/lab/Alert';


const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
  },

}));


const ModalEditOnline = ({ data, handleClose }) => {
  console.log(data)
  
  const classes = useStyles();
  const open = data !== null
  const dispatch = useDispatch();
  const { authUser } = useSelector(state => state.auth);
  const { documentsOffice } = useSelector(state => state.documents);
 

  useEffect(() => {
    if(data?.id !== null){
      dispatch(startDocumentsOfficeLoading(authUser, data?.id))}
  }, [data?.id]);

 

  const handleOnSave = () => { 
    dispatch(startDocumentsOfficeLoading(authUser, data?.id))
    documentsOffice ? window.location.replace(documentsOffice) : dispatch(console.log("funciono"))
    handleClose()
  }

  return (

    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
      >
        <DialogTitle id="form-dialog-title">
        <div style={{fontFamily:'Poppins', fontSize:"16px"}}>
            <IntlMessages id="edit.modal.title" />
        </div>
        </DialogTitle>

        <DialogContent>
        <Alert severity="info" style={{fontFamily:"Poppins", color:"#3699FF", fontSize:"12px"}} className="mt-3">
            Solo se puede editar en linea documentos del tipo no controlados
          </Alert>
        
            
          <Divider className="mt-3"/>
        
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
            onClick={handleOnSave}
            variant="contained"
            color="primary"
           >
           Editar
          </Button>

        </DialogActions>

      </Dialog>

    </div>

  )
}

export default ModalEditOnline;