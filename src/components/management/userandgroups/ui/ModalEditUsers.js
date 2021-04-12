import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from 'react-redux';

import IntlMessages from 'util/IntlMessages';
import { DialogTitle, Grid } from '@material-ui/core';
import { editUserData } from 'actions/adminUsers';



const ModalEditUsers = (props) => {
  const { data, close, open } = props

  const { id, firstName, lastName, email } = data

  const dispatch = useDispatch();

  const { authUser } = useSelector(state => state.auth);

  const [dataEdit, setDataEdit] = useState({});


  const [messageErrorName, setMessageErrorName] = useState(null);

  useEffect(() => {

    setDataEdit({
      firstName: firstName,
      lastName: lastName,
      email: email
    })

  }, [data])

  const handleClose = () => {
    close()
  }

  const handleOnChange = ({ target }) => {
    const { name, value } = target
    setDataEdit({ ...dataEdit, [name]: value })
  }

  const handleOnSave = ()=>{
    dispatch(editUserData(authUser,id,dataEdit))
    setTimeout(() => {
      close()
    }, 300);
    
  }


  return (

    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth={true}
      >
        <DialogTitle id="form-dialog-title" >

          <IntlMessages id="users.title.edit" /> <span style={{ color: '#3699FF' }} >{id}</span>

        </DialogTitle>

        <DialogContent>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <TextField
                value={dataEdit.firstName}
                name='firstName'
                fullWidth
                label="Nombres"
                type="text"
                variant="outlined"
                size="small"
                onChange={event => handleOnChange(event)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                value={dataEdit.lastName}
                name='lastName'
                fullWidth
                label="Apellidos"
                type="text"
                variant="outlined"
                size="small"
                onChange={event => handleOnChange(event)}
              />
            </Grid>
          </Grid>
          <Grid item xs className="mt-3">
            <TextField
              value={dataEdit.email}
              label="Correo electrónico"
              name='email'
              type="text"
              variant="outlined"
              size="small"
              fullWidth
              onChange={event => handleOnChange(event)}
            />
          </Grid>

        </DialogContent>

        <DialogActions>

          <Button
            onClick={handleClose}
            variant="contained"
            style={{ backgroundColor: '#E1F0FF', color: '#3699FF', fontFamily: "Poppins", border: "none", boxShadow: "none" }}
          >
            <IntlMessages id="button.text.cancel" />
          </Button>

          <Button
            onClick={handleOnSave}
            variant="contained"
            color="primary"
            autoFocus
            disabled={messageErrorName}
          >
            Editar
          </Button>

        </DialogActions>

      </Dialog>

    </div>

  )
}

export default ModalEditUsers;