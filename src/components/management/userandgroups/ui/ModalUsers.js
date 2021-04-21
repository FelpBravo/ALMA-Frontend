import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from 'react-redux';
import IntlMessages from 'util/IntlMessages';
import { DialogTitle, Divider, InputBase, Paper, Grid, Chip, FormControl, InputLabel, Select, MenuItem} from '@material-ui/core';
import {closeModalUsers,validateUserNickname ,nicknameValidate, companyUsersInitLoading, departmentsUsersInitLoading} from 'actions/adminUsersAndGroup';
import Alert from '@material-ui/lab/Alert';
import SelectAndChips from 'components/ui/SelectAndChips';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
  },
  cardHeader: {
    padding: theme.spacing(1, 2),
    backgroundColor: '#E1F0FF'
  },
  list: {
    width: "100%",
    height: 230,
    backgroundColor: theme.palette.background.paper,
    overflow: 'auto',
  },
  button: {
    margin: theme.spacing(0.5, 0),
  },
  base: {
		border: "none",
		boxShadow: "none",
		padding: "2px 4px",
		display: "flex",
		alignItems: "center",
		padding: 6,
	},
  formControl: {
    width: "100%",
  },

}));


const ModalUsers = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const { authUser } = useSelector(state => state.auth);

  const { openModal ,validateNickname, company, departments} = useSelector(state => state.adminUsers);

  const [value, setValue] = useState('');

  const [messageErrorUser, setMessageErrorUser] = useState(null);

  const [checked, setChecked] = React.useState([0]);

  const [dataUser,setDataUser ] = useState({})
  
  const [age, setAge] = React.useState('');

    useEffect(() => {

        dispatch(companyUsersInitLoading(authUser));
        dispatch(departmentsUsersInitLoading(authUser));

    }, [dispatch]);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleClose = () => {
    dispatch(closeModalUsers());
  }

  const handleOnChange = ({target})=>{
    const { name, value} = target
    console.log(name,value)
   
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
        if(value === "other"){
          
        }
      default:

        break;
    }
  }

  const handleOnSave = () =>{
      if(!validateNickname){
        console.log('es valido')
      }
      console.log("EEEss");
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
                  //value={value}
                  fullWidth
                  label="Nombres"
                  type="text"
                  variant="outlined"
                  size="small"
                  required
                  //onChange={handleOnChange}
              />  
          </Grid>  
          <Grid item xs={4}>
              <TextField
                  //value={value}
                  fullWidth
                  label="Apellidos"
                  type="text"
                  variant="outlined"
                  size="small"
                  required
                // onChange={handleOnChange}
              />
          </Grid>
          <Grid item xs={4}>
              <TextField
                  //value={value}
                  label="Correo electrónico"
                  type="email"
                  required
                  variant="outlined"
                  size="small"
                  fullWidth
                  //onChange={handleOnChange}
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
                  onChange={handleChange}
                  label="Empresa"
                >
                  {company.map((item) => {
                  return(<MenuItem value={item}>{item}</MenuItem>)
                  })}
                </Select>
            </FormControl>
          </Grid>  
          <Grid item xs={4}>
            <FormControl  size="small" variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Departamento</InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  //value={dep}
                  onChange={handleChange}
                  label="Departamento"
                >
                  {departments.map((dep) => {
                  return(<MenuItem value={dep}>{dep}</MenuItem>)
                 
                  })}
                </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
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
          </Grid>
          </form>
       
          <Alert severity="info" style={{fontFamily:"Poppins", color:"#3699FF", fontSize:"12px"}} className="mt-3">
            La contraseña de generará automatícamente y llegara al correo indicado.
          </Alert>

          <Divider className="mt-3"/>
        
        <h5 className="mt-3">Asignar grupos</h5>

          <SelectAndChips/>
            
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