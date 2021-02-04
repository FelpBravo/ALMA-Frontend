import React, { useEffect, useState, makeStyles } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { useDispatch, useSelector } from 'react-redux';
import { closeModalVisibility } from 'actions/search';
import IntlMessages from 'util/IntlMessages';
import { DialogTitle } from '@material-ui/core';
import { startDocumentByIdLoading } from 'actions/documents';

import { downloadDocument } from 'services/filesService';

import { InterfaceColorSet } from '@amcharts/amcharts4/core';
import Grid from '@material-ui/core/Grid';


const ModalVisibility = () => {


  const dispatch = useDispatch();

  const { authUser } = useSelector(state => state.auth);

  const { openModal } = useSelector(state => state.searchs);

  const { docs } = useSelector(state => state.documents);

  const [pdf, setPDF] = useState('')

  console.log("nadia", docs)
  
  const handleClose = () => {
    setPDF('')
    dispatch(closeModalVisibility());
  }

  const getPDF = async () => {
    setPDF('')
    if (docs.fileId) {
      const { data } = await downloadDocument(authUser, docs.fileId);
      const file = new Blob([data], { type: 'application/pdf' });
      setPDF(URL.createObjectURL(file))

    }
  }

  
  useEffect(() => {
    getPDF()
  }, [docs])

  
   

  const PDFcomponent = () => {
    if (pdf != '') {
      return (
        <div style={{ width: '100%', height: '100%'}}>
                <object
                data={pdf}
                type="application/pdf"
                width="100%"
                height="100%"
                >
                    <br />
                    <a href={pdf} id="enlaceDescargarPdf"
                    download={docs.name}
                    >Tu dispositivo no puede visualizar los PDF, da click aquí para descargarlo</a>
                </object>
            </div>
   
        
      )
    }
    else {
      return (<><p>Cargando...</p></>)
    }

  }


    
  







  
  const Metadatacomponent = () => {
    if (docs.fileId) {
      return (
        <div>
          <p>{docs.fileId}</p>
          <p>{docs.aspectGroup.name}</p>
          {docs.aspectGroup.aspectList.map((a) => {
            return <p>{a.id} {a.name} {
              a.customPropertyList.map((p) => {
                return <p>{p.name}  {p.label} {p.value}</p>
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
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <IntlMessages id="visibility.modal.title" />
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