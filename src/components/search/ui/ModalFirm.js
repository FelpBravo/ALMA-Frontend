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
import { startSaveFirmLoading } from 'actions/firm'
import HowToRegIcon from '@material-ui/icons/HowToReg';


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

  const { authUser, userId = '' } = useSelector(state => state.auth);

  const { openModal2 } = useSelector(state => state.searchs);

  const { docs } = useSelector(state => state.documents);

  const { signatures = [] } = docs

  const [activo, setActivo] = useState(false)

  const [valido, setValido] = useState(true)

  const handleClose = () => {
    setActivo(false)
    dispatch(closeModalFirm());
  }

 

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
          className="mt-5"
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
      return <p className="text-danger text-error mt-3">Documento ya se encuentra firmado</p>
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
                    return <div key={index} style={{ display: "flex", alignItems: "center" }}>
                      <HowToRegIcon color="primary" className='mr-1' />
                      <div>{data.userFullName}</div>
                    </div>
                  })
                }
                <FirmBox className="mt-5" />
              </div>
            </Grid>
            <Grid item xs={8}>
                
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