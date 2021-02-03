import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { useDispatch, useSelector } from 'react-redux';
import { closeModalVisibility } from 'actions/search';
import IntlMessages from 'util/IntlMessages';
import { DialogTitle } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import PDFViewer from 'pdf-viewer-reactjs' 
import { startDocumentByIdLoading } from 'actions/documents';
import { downloadDocument } from 'services/filesService';
import Swal from 'sweetalert2';
import { InterfaceColorSet } from '@amcharts/amcharts4/core';


const ModalVisibility = () => {

  const dispatch = useDispatch();

  const { authUser } = useSelector(state => state.auth);

  const { openModal } = useSelector(state => state.searchs);

  const { docs } = useSelector(state => state.documents);

  const [pdf, setPDF] = useState('')

  console.log("nadia", docs)
  
  const { aspectGroup, tags, fileId, folderId } = docs;
  console.log(aspectGroup)

  //const { name } = aspectGroup;

  //const {customPropertyList, label } = aspectList;



  const handleClose = () => {
    setPDF('')
    dispatch(closeModalVisibility());
  }

  const getPDF = async () => {
    setPDF('')
    if (docs.fileId) {
      const { data } = await downloadDocument(authUser, docs.fileId);
      const file = new Blob([data], { tipo: 'application/pdf' });
      setPDF(URL.createObjectURL(file))

    }
  }
  useEffect(() => {
    getPDF()
  }, [docs])


  const PDFcomponent = () => {
    if (pdf != '') {
      return (
        <PDFViewer
          document={{
            url: pdf,
          }}
          navbarOnTop={true}
          loader={true}
        />
      )
    }
    else {
      return (<><p>Cargando...</p></>)
    }
    
}
const Metadatacomponent = () => {
  if(docs.fileId){
    return (
      <div>
          <h3>Tipo de Documento: {docs.aspectGroup.name}</h3>
          {docs.aspectGroup.aspectList.map((a)=>{
            return <p>{a.id} {a.label} { 
              a.customPropertyList.map((p)=>{
              return <p>{p.label} {p.value}</p>
           })}</p>
          })}
        </div>
      )
    }
    else {
      return (<></>)
    }

  }


  return (

    <div>
      <Dialog
        open={openModal}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth={true}
        maxWidth={true}
      >

        <DialogTitle id="form-dialog-title">

          <IntlMessages id="visibility.modal.title" />

        </DialogTitle>

        <DialogContent> 
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Metadatacomponent />
            </Grid>
            <Grid item xs={8}>
               <PDFcomponent />
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

export default ModalVisibility;