import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { useDispatch, useSelector } from 'react-redux';
import { closeModalFirm } from 'actions/search';
import IntlMessages from 'util/IntlMessages';
import { DialogTitle, InputAdornment, makeStyles, Paper, TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { downloadDocument } from 'services/filesService';
import { LockOpenOutlined } from '@material-ui/icons';
import { startFirmLoading, startSaveFirmLoading } from 'actions/firm'
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';



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

  const { authUser, userId = ''} = useSelector(state => state.auth);

  const { openModal2 } = useSelector(state => state.searchs);

  const { docs } = useSelector(state => state.documents);

  const { signatures = [] } = docs

  const [pdf, setPDF] = useState('')

  const [activo, setActivo] = useState(false)

  const [valido, setValido] = useState(true)

  const handleClose = () => {
    setActivo(false)
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
    findFirm()
  }, [docs])

  const findFirm = () => {
    if (docs.signatures) {
      const busqueda = docs.signatures.find(signa => signa.userId === userId)
      if (busqueda) {
        setValido(false)
      }
      else {
        setValido(true)
      }
    }
    
  }

  const FirmBox = () => {
    const [password, setPassword] = useState('')

    const handleFirm = (e) => {
      e.preventDefault();
      dispatch(startSaveFirmLoading(authUser, password, docs.fileId))
      setValido(false)

    }
    if (valido) {
      if (!activo) {
        return (<Button
          onClick={() => setActivo(true)}
          variant="contained"
          color="primary"
          fullWidth
        >
          Firmar documento
        </Button>)
      }
      else {
        return (<div style={{ display: 'flex' }}>
          <form onSubmit={handleFirm}>
            <TextField
              size="small"
              type="password"
              label={<IntlMessages id="appModule.password" />}
              fullWidth
              onChangeCapture={(event) => setPassword(event.target.value)}
              defaultValue={password}
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
              onClick={handleFirm}
              variant="contained"
              type="submit"
              color="primary"
              style={{ height: 40, marginTop: 15, marginLeft: 15 }}

            >
              Firmar
                  </Button>
          </form>

        </div>)
      }
    }
    else {
      return <span className="text-danger text-error">Documento ya se encuentra firmado</span>
    }

  }

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
              <div className={classes.root}>
                <h4>Documento firmando por : </h4>
                {signatures &&
                  signatures.map((data, index) => {
                    return <div key={index}>
                        <CheckCircleOutlineOutlinedIcon color="primary" className='mr-3'/>
                        {data.userFullName}</div>
                  })
                }
                <FirmBox className="mt-5"/>
              </div>
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