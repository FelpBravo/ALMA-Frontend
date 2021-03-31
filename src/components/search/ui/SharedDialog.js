import React, { useEffect, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from 'react-redux';
import IntlMessages from 'util/IntlMessages';
import { CircularProgress, DialogTitle, Divider, Grid, InputBase, Paper, Tooltip } from '@material-ui/core';
import Button from 'components/ui/Button';
import IconButton from '@material-ui/core/IconButton';
import { sharedDocumentSetValue, startCreateSharedLink } from 'actions/sharedDocument';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import LinkIcon from '@material-ui/icons/Link';
import FileCopyIcon from '@material-ui/icons/FileCopy';

const fieldName = <IntlMessages id="table.shared.dialog.field.password" />

const useStyles = makeStyles(theme => ({
  dialogActions: {
    padding: theme.spacing(1, 3)
  },
  fileName: {
    color: '#3699FF',
  },
  input: {
    color: '#3699FF',
    fontSize: '14px',
    radius: '4px',
    fontWeight: 500,
    fontFamily: "Poppins, sans-serif !important ",

    "&::placeholder": {
      fontFamily: "Poppins, sans-serif !important ",
      color: '#3699FF',
      align: 'left',
      fontWeight: 500,
    }
  },
  rootPaper: {
    background: "#E1F0FF",
    border: "none",
    boxShadow: "none",
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    padding: 6,
    width: '100%'
  },
  margin: {
    marginRight: theme.spacing(1)
  }
}));

const SharedDialog = ({ data, handleClose }) => {

  const dispatch = useDispatch();
  const { authUser } = useSelector(state => state.auth);

  const classes = useStyles();
  const open = data !== null
  const { fields, token, documentId } = useSelector(state => state.sharedDocument);
  const [loading, setLoading] = useState(false)
  const [messageErrorName, setMessageErrorName] = useState(null);
  const [checked, setChecked] = React.useState(true);
  
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  useEffect(() => {
    setLoading(false);
  }, [token])

  const handleOnChange = ({ target }) => {
    const { name, value } = target;

    dispatch(sharedDocumentSetValue(name, value));

  }

  const handleOnSave = () => {
    setLoading(true)
    dispatch(startCreateSharedLink(authUser, data?.id, fields?.password, fields?.expirationDate));
  }

  const URL = `${window.location.protocol}//${window.location.hostname}${window.location.port && `:${window.location.port}`}`
  console.log("data", data)
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      fullWidth={true}
    >
      <DialogTitle>
        <h2>
          <IntlMessages id="table.shared.dialog.title" />
        </h2>
        <h5 className={classes.fileName}>{data?.name}</h5>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>

          <Grid item md={12}>
            <TextField
              autoFocus
              label="Fecha de vencimiento"
              name='expirationDate'
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
          <Grid item md={12} container wrap="nowrap">
            <Grid item md={1}>
              <Checkbox
                checked={checked}
                onChange={handleChange}
                size="medium"
                style={{
                  color: '#3699FF',
                }}
              />
            </Grid>
            <Grid item md={11}>
              <TextField
                name="password"
                label={fieldName}
                type="text"
                variant="outlined"
                fullWidth
                disabled={!checked}
                size="small"
                type="password"
                onChange={handleOnChange}
              />
            </Grid>
          </Grid>
          {
            documentId === data?.id &&
            token &&
            <Grid item container wrap="nowrap" md={12}>
              <Paper className={classes.rootPaper}>
                <LinkIcon color="primary" className={classes.margin} />
                <InputBase
                  className={classes.input}
                  value={`${URL}/download/${token}`}
                  readOnly
                  fullWidth
                />
              </Paper>
              <Tooltip title="Copiar enlace">
                <IconButton aria-label="copy">
                  <FileCopyIcon color="primary" fontSize="inherit" />
                </IconButton>
              </Tooltip>
            </Grid>
          }
        </Grid>
        <span className="text-danger text-error">{messageErrorName}</span>
      </DialogContent>
      <Divider />

      <DialogActions className={classes.dialogActions}>
        <Button
          onClick={handleClose}
          variant="contained"
          color="secondary"
        >
          Cancelar
          </Button>
        <Button
          onClick={handleOnSave}
          variant="contained"
          color="primary"
          autoFocus
          disabled={loading || !fields?.expirationDate}
        >
          {loading && <CircularProgress size={14} />}
          Crear
          </Button>
      </DialogActions>
    </Dialog>
  )
}

export default SharedDialog;