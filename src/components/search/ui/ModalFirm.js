import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { useDispatch, useSelector } from 'react-redux';
import { closeModalFirm} from 'actions/search';
import IntlMessages from 'util/IntlMessages';
import { DialogTitle, InputAdornment, makeStyles, Paper, TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { downloadDocument } from 'services/filesService';
import { LockOpenOutlined } from '@material-ui/icons';


const useStyles = makeStyles((theme) => ({
  root: {
    height: 1000,  
    maxWidth: 500,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(1),
  },
}));

const ModalFirm = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const { authUser } = useSelector(state => state.auth);

  const { openModal2 } = useSelector(state => state.searchs);

  const { docs } = useSelector(state => state.documents);

  const [pdf, setPDF] = useState('')

  const handleClose = () => {
    setPDF('')
    dispatch(closeModalFirm());
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
        <div style={{ width: '100%', height: '100%' }}>
          <object
            data={pdf}
            type="application/pdf"
            width="100%"
            height="100%"
          >
            <iframe src={pdf} width="100%" height="100%">
              <a href={pdf} id="enlaceDescargarPdf"
                download={docs.name}
              >Tu dispositivo no puede visualizar los PDF, da click aquí para descargarlo</a>
            </iframe>

          </object>
        </div>


      )
    }
    else {
      return (<><p>Cargando...</p></>)
    }

  }
  const FirmSimple = () => {
    if (docs.fileId) {
      return (
        <div className={classes.root}>
            <h4>Documento firmando por : </h4>

            <Button
            //onClick={}
            variant="contained"
            color="primary"
            fullWidth
            >
            Firmar documento
            </Button>

            <TextField
                size="small"
                type="password"
                label={<IntlMessages id="appModule.password" />}
                fullWidth
                //onChange={(event) => setPassword(event.target.value)}
                //defaultValue={password}
                margin="normal"
                variant="outlined"
                className="mt-1 my-sm-3"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <LockOpenOutlined color="primary" />
                        </InputAdornment>
                    ),
                }}
            />
            <Button
            //onClick={}
            variant="contained"
            color="primary"
            >
            Firmar
            </Button>

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
        open={openModal2}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth={true}
        maxWidth={true}
      >

        <DialogTitle >
          <div style={{ fontFamily: "Poppins", }}>
            <IntlMessages id="firm.modal.title" />
          </div>
        </DialogTitle>

        <DialogContent>
        <Grid container spacing={2}>
            <Grid item xs={4}>
              <FirmSimple />
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

export default ModalFirm;