import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { useDispatch, useSelector } from 'react-redux';
import { closeModalVisibility } from 'actions/search';
import IntlMessages from 'util/IntlMessages';
import { DialogTitle } from '@material-ui/core';
import { startDocumentByIdLoading, visibilityDocuments } from 'actions/documents';
import Grid from '@material-ui/core/Grid';

 
const ModalVisibility = () => {

  const dispatch = useDispatch();

  const { authUser } = useSelector(state => state.auth);

  const { openModal} = useSelector(state => state.searchs);

  const { docs } = useSelector(state => state.documents);
  console.log("nadia", docs)
  
  const { aspectGroup, tags, fileId, folderId } = docs;
  console.log(aspectGroup)

  //const { name } = aspectGroup;

  //const {customPropertyList, label } = aspectList;


  const handleClose = () => {
    dispatch(closeModalVisibility());
  }


  return (

    <div>
      <Dialog
        open={openModal}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth={true}
      >

        <DialogTitle id="form-dialog-title">
     
            <IntlMessages id="visibility.modal.title" />
             
        </DialogTitle>

        <DialogContent>
          <p>Imagen de previsualización</p>

        {/*h3>Tipo de documento : {name}</h3>*/}
       


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

export default ModalVisibility;