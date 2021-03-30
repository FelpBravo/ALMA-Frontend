import React, { useEffect, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from 'react-redux';
import IntlMessages from 'util/IntlMessages';
import { DialogTitle, Grid } from '@material-ui/core';
import Button from 'components/ui/Button'
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import { sharedDocumentSetValue } from 'actions/sharedDocument';
import { makeStyles } from '@material-ui/core/styles';

const fieldName = <IntlMessages id="table.shared.dialog.field.password" />

const useStyles = makeStyles(theme => ({
  title: {
    textAlign: 'center',
  },
  dialogActions: {
    padding: theme.spacing(1, 3)
  },
  fileName:{
    color: '#3699FF',  
  }

}));

const SharedDialog = ({ data, handleClose }) => {

  const dispatch = useDispatch();
  const classes = useStyles();
  const open = data !== null
  const { authUser, sharedDocument } = useSelector(state => state.auth);

  const [messageErrorName, setMessageErrorName] = useState(null);


  const handleOnChange = ({ target }) => {
    const { name, value } = target;

    dispatch(sharedDocumentSetValue(name, value));

  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      fullWidth={true}
    >
      <DialogTitle className={classes.title}>
        <h3>
          <IntlMessages id="table.shared.dialog.title" />
        </h3>
        <h6 className={classes.fileName}>{data?.name}</h6>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>

          <Grid item md={12}>
            <TextField
              autoFocus
              label="Fecha de vencimiento"
              name='startDate'
              fullWidth
              type="date"
              variant="outlined"
              size="small"
              InputLabelProps={{
                shrink: true,
              }}
              style={{
                color: '#3699FF',
              }}
              onChange={handleOnChange}
            />
          </Grid>
          <Grid item md={12}>
            <TextField
              name="password"
              label={fieldName}
              type="text"
              variant="outlined"
              fullWidth
              size="small"
              type="password"
              onChange={handleOnChange}
            />
          </Grid>
        </Grid>
        <span className="text-danger text-error">{messageErrorName}</span>
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button
          onClick={handleClose}
          variant="contained"
          color="secondary"
        >
          Cancelar
          </Button>
        <Button
          // onClick={handleOnSave}
          variant="contained"
          color="primary"
          autoFocus
          disabled={true}
        >
          Crear
          </Button>
      </DialogActions>
    </Dialog>
  )
}

export default SharedDialog;