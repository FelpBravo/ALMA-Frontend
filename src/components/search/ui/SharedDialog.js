import React, { useEffect, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { TwitterPicker } from 'react-color';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from 'react-redux';
import IntlMessages from 'util/IntlMessages';
import { DialogTitle } from '@material-ui/core';
import Button from 'components/ui/Button'
const fieldName = <IntlMessages id="table.shared.dialog.field.password" />

const SharedDialog = ({ open, handleClose}) => {

  const dispatch = useDispatch();

  const { authUser } = useSelector(state => state.auth);

  const { openModal, actionModal, tags, tagslist = [] } = useSelector(state => state.tags);

  const [color, setColor] = useState('#fff');

  const [value, setValue] = useState('');

  const [messageErrorName, setMessageErrorName] = useState(null);


  return (

    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth={true}
      >

        <DialogTitle id="form-dialog-title">
          <IntlMessages id="table.shared.dialog.title" />
        </DialogTitle>

        <DialogContent>

          <TextField
            value={value}
            autoFocus
            label={fieldName}
            type="text"
            variant="outlined"
            fullWidth
            size="small"
            // onChange={handleOnChange}
          />

          <span className="text-danger text-error">{messageErrorName}</span>

        </DialogContent>

        <DialogActions>

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

    </div>

  )
}

export default SharedDialog;