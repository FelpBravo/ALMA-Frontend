import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from 'react-redux';

import IntlMessages from 'util/IntlMessages';
import { DialogTitle, Grid} from '@material-ui/core';
import {closeModalEditUsers} from 'actions/adminUsers';



const ModalEditUsers = () => {

  const dispatch = useDispatch();

  const { authUser } = useSelector(state => state.auth);

  const { openModal1} = useSelector(state => state.adminUsers);

  const { userslist = [], } = useSelector(state => state.adminUsers);

  const {email, firstName, lastName }= userslist
  
  const [value, setValue] = useState('');

  const [messageErrorName, setMessageErrorName] = useState(null);

  const handleClose1 = () => {
    dispatch(closeModalEditUsers());
  }

  return (

    <div>
      <Dialog
        open={openModal1}
        onClose={handleClose1}
        aria-labelledby="form-dialog-title"
        fullWidth={true}
      >

        <DialogTitle id="form-dialog-title">
         
            <IntlMessages id="users.title.creation" />
        
        </DialogTitle>

        <DialogContent>
          <Grid container spacing={1}>
          <Grid item xs={6}>
              <TextField
                  value={firstName}
                  fullWidth
                  label="Nombres"
                  type="text"
                  variant="outlined"
                  size="small"
                  //onChange={handleOnChange}
              />  
          </Grid>  
          <Grid item xs={6}>
              <TextField
                  value={lastName}
                  fullWidth
                  label="Apellidos"
                  type="text"
                  variant="outlined"
                  size="small"
                // onChange={handleOnChange}
              />
          </Grid>
          </Grid>
          <Grid item xs className="mt-3">
              <TextField
                  value={email}
                  label="Correo electrónico"
                  type="text"
                  variant="outlined"
                  size="small"
                  fullWidth
                  //onChange={handleOnChange}
                />
          </Grid>
        
        </DialogContent>

        <DialogActions>

          <Button
            onClick={handleClose1}
            variant="contained"
            style={{ backgroundColor: '#E1F0FF', color: '#3699FF', fontFamily: "Poppins", border: "none",boxShadow: "none" }}
          >
           <IntlMessages id="button.text.cancel" />
          </Button>

          <Button
            //onClick={handleOnSave}
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