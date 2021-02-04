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
import PDFViewer from 'pdf-viewer-reactjs' 
import { startDocumentByIdLoading } from 'actions/documents';
import { downloadDocument } from 'services/filesService';
import Swal from 'sweetalert2';
import { InterfaceColorSet } from '@amcharts/amcharts4/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    padding: theme.spacing(0, 3),
  },
  paper: {
    maxWidth: 500,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
}));

const ModalVisibility = () => {  
  const classes = useStyles();

  const dispatch = useDispatch();

  const { authUser } = useSelector(state => state.auth);

  const { openModal } = useSelector(state => state.searchs);

  const { docs } = useSelector(state => state.documents);

  const [pdf, setPDF] = useState('')

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
      <div className='mt-3'>
          <h3>Tipo de Documento: {docs.aspectGroup.name}</h3>
          {docs.aspectGroup.aspectList.map((a)=>{
            return  <div className={classes.root}>
              <h3 className='mt-2'>{a.label}</h3>
            <Paper className={classes.paper}>
              {a.customPropertyList.map((p)=>{
              return <div className="container">
              <div className="row">
                <div style={{ fontWeight:'bold'}}>
                {p.label}:
                </div>
                <div className='ml-1'>
                {p.value}
                </div>
              </div>
            </div>
           })}
            </Paper>
            </div>
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

        <DialogTitle >
          <div style={{ fontFamily: "Poppins",}}>
          <IntlMessages id="visibility.modal.title" />
          </div>
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