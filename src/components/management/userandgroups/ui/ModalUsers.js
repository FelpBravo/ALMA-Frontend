import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import IntlMessages from 'util/IntlMessages';
import { DialogTitle, Divider, Grid, FormControl, InputLabel, Select, MenuItem} from '@material-ui/core';
import {closeModalUsers,validateUserNickname ,nicknameValidate, companyUsersInitLoading, departmentsUsersInitLoading, startCreateUsersLoading, startGroupInitLoading} from 'actions/adminUsersAndGroup';
import Alert from '@material-ui/lab/Alert';
import SelectAndChips from 'components/ui/SelectAndChips';

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
  },

}));


const ModalUsers = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const { authUser } = useSelector(state => state.auth);
 
  const { openModal ,validateNickname, companys, departments,  grouplist = {}, } = useSelector(state => state.adminUsers);

  const [messageErrorUser, setMessageErrorUser] = useState(null);

  const [stateCompany,setStateCompany] = useState({ name:false,department:false  })

  const [nameUser, setNameUser] = useState({ group:[] })

  const [dataCreate, setDataCreate] = useState({});

    useEffect(() => {

        dispatch(companyUsersInitLoading(authUser));
        dispatch(departmentsUsersInitLoading(authUser));
        dispatch(startGroupInitLoading(authUser));

    }, [dispatch]);

    useEffect(() => {
      
      setDataCreate({ ...dataCreate, ["group"]: nameUser })

    }, [nameUser]);

  const handleClose = () => {
    dispatch(closeModalUsers());
  }

  const handleOnChange = ({target})=>{
    const { name, value} = target
   
    switch (name) {
      case 'usuario':
        if(value.length > 4){
          dispatch(validateUserNickname(authUser,value))
          console.log(validateNickname);
          setMessageErrorUser()
        }else{
          dispatch(nicknameValidate(false))
          setMessageErrorUser('Debe contener 5 caracteres como minimo.')
        }
      
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
      break
      default:

        break;
    }
  setDataCreate({ ...dataCreate, [name]: value })
  console.log(dataCreate)
}

  const handleOnSave = () =>{
        dispatch(startCreateUsersLoading(authUser, dataCreate))    
        dispatch(closeModalUsers());
      }
      

  return (

    <div>
      <Dialog
        open={openModal}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth={'md'}
      >
        <DialogTitle id="form-dialog-title">
        <div style={{fontFamily:'Poppins', fontSize:"16px"}}>
            <IntlMessages id="user.modal.title" />
        </div>
        </DialogTitle>

        <DialogContent>
          <form onSubmit={handleOnSave}>
          <Grid container spacing={1}>
          <Grid item xs={4}>
              <TextField
                  fullWidth
                  name="firstName"
                  label="Nombres"
                  type="text"
                  variant="outlined"
                  size="small"
                  required
                  onChange={handleOnChange}
              />  
          </Grid>  
          <Grid item xs={4}>
              <TextField
                  fullWidth
                  name="lastName"
                  label="Apellidos"
                  type="text"
                  variant="outlined"
                  size="small"
                  required
                  onChange={handleOnChange}
              />
          </Grid>
          <Grid item xs={4}>
              <TextField
                  label="Correo electrónico"
                  type="email"
                  required
                  variant="outlined"
                  size="small"
                  fullWidth
                  onChange={handleOnChange}
                  name="email"
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
                  name='companyOther'
                  type="text"
                  variant="outlined"
                  size="small"
                  onChange={handleOnChange}
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
                // value={value}
                  fullWidth
                  label="Escriba nombre del departamento"
                  name='departmentOther'
                  type="text"
                  variant="outlined"
                  size="small"
                  onChange={handleOnChange}
              /> 
         
          </Grid>
          }
          </Grid>
          <Grid item xs={4} className="mt-3" >
              <TextField
                 // value={value}
                  fullWidth
                  label="Usuario"
                  name='usuario'
                  error={validateNickname || messageErrorUser? true : false}
                  type="text"
                  variant="outlined"
                  size="small"
                  required
                  onChange={handleOnChange}
                  helperText={!validateNickname? (messageErrorUser? messageErrorUser : '' ): 'Usuario ya existe'}
              /> 
             
          </Grid>
          </form>
       
          <Alert severity="info" style={{fontFamily:"Poppins", color:"#3699FF", fontSize:"12px"}} className="mt-3">
            La contraseña de generará automatícamente y llegara al correo indicado.
          </Alert>

          <Divider className="mt-3"/>
        
        <h5 className="mt-3">Asignar grupos</h5>

          <SelectAndChips data={grouplist} returnData={(group)=> setNameUser( group.map(group=> {
           return{'id': group.id}
          }))}/>
            
          <Divider className="mt-3"/>
        
        </DialogContent>

        <DialogActions>
        
          <Button
          style={{
            backgroundColor: '#E1F0FF', color: '#3699FF', fontFamily: "Poppins", fontSize: '12px', fontWeight: 500, border: "none",
            boxShadow: "none", height: '45px', width: '120px'
          }}
            onClick={handleClose}
            variant="contained"
            color="primary"
          >
            Cancelar
          </Button>

          <Button
           style={{
           fontFamily: "Poppins", fontSize: '12px', fontWeight: 500, border: "none",boxShadow: "none", height: '45px', width: '120px'
          }}
            onClick={handleOnSave}
            variant="contained"
            color="primary"
           // disabled={messageErrorName}
          >
           Crear
          </Button>

        </DialogActions>

      </Dialog>

    </div>

  )
}

export default ModalUsers;