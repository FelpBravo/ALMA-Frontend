import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import IntlMessages from 'util/IntlMessages';
import { DialogTitle, Divider} from '@material-ui/core';
import { startDocumentsOfficeLoading } from 'actions/documents';
import Alert from '@material-ui/lab/Alert';




const ModalEditOnline = (props) => {
  const { data, close, open } = props
  const dispatch = useDispatch();
  const { authUser } = useSelector(state => state.auth);
   

  const handleOnSave = () => {
    dispatch(startDocumentsOfficeLoading(authUser, data?.id, close))
  }
  
  
  return (

    <div>
      <Dialog
        open={open}
        onClose={close}
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
          <IntlMessages id="edit.modal.warning" />
          </Alert>
        
            
          <Divider className="mt-3"/>
        
        </DialogContent>

        <DialogActions>
        
          <Button
          style={{
            backgroundColor: '#E1F0FF', color: '#3699FF', fontFamily: "Poppins", fontSize: '12px', fontWeight: 500, border: "none",
            boxShadow: "none", height: '45px', width: '120px'
          }}
            onClick={close}
            variant="contained"
            color="primary"
          >
            <IntlMessages id="document.loadDocuments.request.summary.button.cancel" />
          </Button>

          <Button
           style={{
           fontFamily: "Poppins", fontSize: '12px', fontWeight: 500, border: "none",boxShadow: "none", height: '45px', width: '120px'
          }}
            onClick={handleOnSave}
            variant="contained"
            color="primary"
           >
           <IntlMessages id="document.loadDocuments.edit" />
          </Button>

        </DialogActions>

      </Dialog>

    </div>

  )
}

export default ModalEditOnline;