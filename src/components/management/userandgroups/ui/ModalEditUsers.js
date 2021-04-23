import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { useParams,  } from 'react-router-dom';
import IntlMessages from 'util/IntlMessages';
import { DialogTitle, Divider, FormControl, Grid, InputLabel, MenuItem, Select } from '@material-ui/core';
import { editUserData } from 'actions/adminUsersAndGroup';

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
  },

}));

const ModalEditUsers = (props) => {
  const { data, close, open } = props

  const { id, firstName = '', lastName = '', email = '' , company = '', department = '', search } = data

  const dispatch = useDispatch();

  const classes = useStyles();

  const { authUser } = useSelector(state => state.auth);

  const {companys, departments} = useSelector(state => state.adminUsers);

  const [dataEdit, setDataEdit] = useState({});

  const [validation, setValidation] = useState({ firstName: true, lastName:true, email:true})

  const [stateCompany,setStateCompany] = useState({ name:false,department:false})

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
        email: email,
        company: company,
        department: department
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
      case 'company':
        if(value === "Other"){  
          setStateCompany({ name:true, department:stateCompany.department})
        }else
        {
          setStateCompany({ name:false, department:stateCompany.department})
        }
      break
      case 'department':
        if(value === "Other"){  
          setStateCompany({ name:stateCompany.name, department:true})
        }else
        {
          setStateCompany({ name:stateCompany.name, department:false})
        }
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
        maxWidth={'md'}
      >
        <DialogTitle id="form-dialog-title" >
            <IntlMessages id="users.title.edit" />
        </DialogTitle>

        <DialogContent>
        <Grid item xs={4}>
              <TextField
                  value={id}
                  fullWidth
                  label="Usuario"
                  name='usuario'
                  type="text"
                  variant="outlined"
                  size="small"
                  disabled
              /> 
             
          </Grid>
          <Grid container spacing={1} className="mt-3" >
            <Grid item xs={4} >
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
            <Grid item xs={4}>
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
            <Grid item xs={4}>
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
          </Grid>
          <Grid container spacing={1} className="mt-3" >
          <Grid item xs={4}>
            <FormControl  size="small" variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Empresa</InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  name="company"
                  onChange={handleOnChange}
                  label="Empresa"
                  value={dataEdit.company}
                >
                  {companys.map((item) => {
                  return(<MenuItem value={item}>{item}</MenuItem>)
                  })}
                </Select>
            </FormControl>
          </Grid>  
          {stateCompany.name &&
          <Grid item xs={4}>
              <TextField
                // value={value}
                  fullWidth
                  label="Escriba nombre de la empresa"
                  name='Compañia'
                  type="text"
                  variant="outlined"
                  size="small"
              /> 
         
          </Grid>
          }
          </Grid>
          <Grid container spacing={1} className="mt-3" >
          <Grid item xs={4}>
            <FormControl  size="small" variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Departamento</InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  name='department'
                  onChange={handleOnChange}
                  label="Departamento"
                  value={dataEdit.department}
                >
                  {departments.map((dep) => {
                  return(<MenuItem value={dep}>{dep}</MenuItem>)
                 
                  })}
                </Select>
            </FormControl>
          </Grid>
          {stateCompany.department &&
          <Grid item xs={4}>
              <TextField
                  //value={value}
                  fullWidth
                  label="Escriba nombre del departamento"
                  name='departamento'
                  type="text"
                  variant="outlined"
                  size="small"
              /> 
         
          </Grid>
          }
          </Grid>
          
          <Divider className="mt-3"/>

        </DialogContent>

        <DialogActions style={{marginRight:12}}>

          <Button
            onClick={handleClose}
            variant="contained"
            style={{
              backgroundColor: '#E1F0FF', color: '#3699FF', fontFamily: "Poppins", fontSize: '12px', fontWeight: 500, border: "none",
              boxShadow: "none", height: '45px', width: '120px'
            }}
          >
            <IntlMessages id="button.text.cancel" />
          </Button>

          <Button
          style={{
           fontFamily: "Poppins", fontSize: '12px', fontWeight: 500, border: "none", boxShadow: "none", height: '45px', width: '120px'
          }}
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