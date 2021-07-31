import { CircularProgress, DialogTitle, Divider, Grid, InputBase, Paper, Tooltip } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import LinkIcon from '@material-ui/icons/Link';
import { KeyboardDatePicker } from "@material-ui/pickers";
import { get, isEmpty } from 'lodash-es';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { clearValues, sharedDocumentSetValue, startCreateSharedLink } from 'actions/sharedDocument';
import Button from 'components/ui/Button';
import { AliceBlue } from 'helpers/themes/indigoTheme';
import IntlMessages from 'util/IntlMessages';

const fieldName = <IntlMessages id="table.shared.dialog.field.password" />
const fieldWithoutPassword = <IntlMessages id="table.shared.dialog.field.withoutPassword" />

const useStyles = makeStyles(theme => ({
  dialogActions: {
    padding: theme.spacing(1, 3)
  },
  primaryColor: {
    color: theme.palette.primary.main
  },
  input: {
    color: theme.palette.primary.main,
    fontSize: '14px',
    radius: '4px',
    fontWeight: 500,
    fontFamily: "Poppins, sans-serif !important ",

    "&::placeholder": {
      fontFamily: "Poppins, sans-serif !important ",
      color: theme.palette.primary.main,
      align: 'left',
      fontWeight: 500,
    }
  },
  rootPaper: {
    background: AliceBlue,
    border: "none",
    boxShadow: "none",
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(1),
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
  const [finish, setFinish] = useState(true);

  const startDate = moment().format('YYYY-MM-DD'),
    endDate = moment('2100-01-01').format('YYYY-MM-DD'),
    range = date => (startDate <= date && date <= endDate)

  const URL = `${window.location.protocol}//${window.location.hostname}${window.location.port && `:${window.location.port}`}`
  const SHARED_URL = `${URL}/download/${token}/`;

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  useEffect(() => {
    dispatch(clearValues());
    setFinish(false);
  }, [data])

  useEffect(() => {
    setLoading(false);
  }, [token])

  useEffect(() => {
    if (!checked)
      dispatch(sharedDocumentSetValue("password", ""));
  }, [checked])

  const handleOnChange = ({ target }) => {
    const { name, value } = target;

    dispatch(sharedDocumentSetValue(name, value));

  }

  const handleOnSave = () => {
    setLoading(true)
    dispatch(startCreateSharedLink(authUser, data?.id, fields?.password, fields?.expirationDate, () => setFinish(true)));
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      fullWidth={true}
    >
      <DialogTitle disableTypography>
        <h2>
          <IntlMessages id="table.shared.dialog.title" />
        </h2>
        <h5 className={classes.primaryColor}>{data?.name}</h5>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>

          <Grid item xs={12} sm={12} md={12}>
            <KeyboardDatePicker
              label={<IntlMessages id="table.shared.dialog.field.expirationDate" />}
              name='expirationDate'
              fullWidth
              format='YYYY-MM-DD'
              inputVariant="outlined"
              size="small"
              disablePast
              InputProps={{ inputProps: { min: moment().add(1, 'days').format('YYYY-MM-DD') } }}
              InputLabelProps={{
                shrink: true,
              }}
              color="primary"
              value={get(fields, 'expirationDate', null)}
              onChange={value => handleOnChange({ target: { name: 'expirationDate', value: moment(value).format('YYYY-MM-DD') } })}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} container wrap="nowrap">
            <Grid item xs={1} sm={1} md={1}>
              <Checkbox
                checked={checked}
                onChange={handleChange}
                size="medium"
                color="primary"
              />
            </Grid>
            <Grid item xs={11} sm={11} md={11}>
              <TextField
                name="password"
                label={!checked ? fieldWithoutPassword : fieldName}
                type="text"
                variant="outlined"
                fullWidth
                disabled={!checked}
                size="small"
                type="password"
                value={get(fields, 'password', '')}
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
                  inputProps={{ select: "true" }}
                  className={classes.input}
                  value={SHARED_URL}
                  readOnly
                  fullWidth
                  onClick={e => e?.target?.select()}
                  autoFocus
                />
              </Paper>
              <Tooltip title={<IntlMessages id="table.shared.dialog.field.copyLink" />}>
                <IconButton aria-label="copy" onClick={() => navigator.clipboard.writeText(SHARED_URL)}>
                  <FileCopyIcon
                    color="primary"
                    fontSize="inherit" />
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
          {!finish
            ? <IntlMessages id="table.shared.dialog.field.cancelDocument" />
            : <IntlMessages id="table.shared.dialog.field.closeDocument" />
          }

        </Button>
        {
          !finish && <Button
            onClick={handleOnSave}
            variant="contained"
            color="primary"
            autoFocus
            disabled={loading || !range(moment(fields?.expirationDate).format('YYYY-MM-DD')) || !fields?.expirationDate || (checked && isEmpty(fields.password))}
          >
            {loading && <CircularProgress size={14} />}
            <IntlMessages id="table.shared.dialog.field.createDocument" />
          </Button>
        }
      </DialogActions>
    </Dialog>
  )
}

export default SharedDialog;