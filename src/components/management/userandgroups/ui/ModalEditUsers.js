import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { useParams,  } from 'react-router-dom';
import IntlMessages from 'util/IntlMessages';
import { DialogTitle, Grid } from '@material-ui/core';
import { editUserData } from 'actions/adminUsers';



const ModalEditUsers = (props) => {
  const { data, close, open } = props

  const { id, firstName = '', lastName = '', email = '' , search } = data

  const dispatch = useDispatch();

  const { authUser } = useSelector(state => state.auth);

  const [dataEdit, setDataEdit] = useState({});

  const [validation, setValidation] = useState({ firstName: true, lastName:true, email:true})

  const letra = /^[a-zñ ]+$/i

  const correo = /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i

  const { page } = useParams()

  let page_url = 1

	if(page){
		page_url = page.trim()? page.replace(/[a-zA-Z ]/g,'') : 1
	}

  useEffect(() => {
      setDataEdit({
        firstName: firstName,
        lastName: lastName,
        email: email
      })
      if(id){
        setValidation({ firstName:!letra.test(firstName) || firstName.length < 3 ? false : true, lastName:!letra.test(lastName) || lastName.length < 3? false : true, email:email.length < 3? false : true})
      }
   }, [id,firstName,lastName,email])
   
  

  const handleClose = () => {
    close()
  }

  const handleOnChange = ({ target }) => {
    const { name, value } = target
    switch (name) {
      case 'firstName':
        setValidation({...validation,['firstName']:!letra.test(value) || value.length < 3 ? false: true})
      break;
      case 'lastName':
        setValidation({...validation,['lastName']:!letra.test(value) || value.length < 3 ? false: true})
      break;
      case 'email':
        setValidation({...validation,['email']:!correo.test(value)? false : true})
      break;
      default:
        break;
    }
    setDataEdit({ ...dataEdit, [name]: value})
  }

  const handleOnSave = ()=>{
     search? dispatch(editUserData(authUser,id,dataEdit,page_url,search)) :dispatch(editUserData(authUser,id,dataEdit,page_url))
      close()
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
                label={<IntlMessages id="users.firstName" />}
                type="text"
                variant="outlined"
                size="small"
                onChange={event => handleOnChange(event)}
                error={!validation.firstName}
                helperText={validation.firstName? ' ': <IntlMessages id="users.validate.firstName" />}

              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                value={dataEdit.lastName}
                name='lastName'
                fullWidth
                label={<IntlMessages id="users.lastName" />}
                type="text"
                variant="outlined"
                size="small"
                onChange={event => handleOnChange(event)}
                error={!validation.lastName}
                helperText={validation.lastName? ' ': <IntlMessages id="users.validate.lastName" />}
              />
            </Grid>
          </Grid>
          <Grid item xs className="mt-3">
            <TextField
              value={dataEdit.email}
              label={<IntlMessages id="users.email" />}
              name='email'
              error={!validation.email}
              type="text"
              variant="outlined"
              size="small"
              fullWidth
              onChange={event => handleOnChange(event)}
              helperText={validation.email? ' ': <IntlMessages id="users.validate.email" />}
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
            disabled={validation.email && validation.firstName && validation.lastName? false : true}
          >
             <IntlMessages id="button.text.edit" />
          </Button>

        </DialogActions>

      </Dialog>

    </div>

  )
}

export default ModalEditUsers;