import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from 'react-redux';
import IntlMessages from 'util/IntlMessages';
import {closeModalGroup , dependenciesGroupInitLoading, profilesGroupInitLoading} from 'actions/adminUsersAndGroup';
import SelectAndChips from 'components/ui/SelectAndChips';
import { DialogTitle, Divider, Grid, FormControl, InputLabel, Select, MenuItem} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
  },

}));


const ModalGroup = () => {
 
  const classes = useStyles();

  const dispatch = useDispatch();

  const { authUser } = useSelector(state => state.auth);

  const { openModal1 ,dependencies, profiles } = useSelector(state => state.adminUsers);

  const [value, setValue] = useState('');

  const [messageErrorUser, setMessageErrorUser] = useState(null);

  const [checked, setChecked] = React.useState([0]);

  const [dataUser,setDataUser ] = useState({})


    useEffect(() => {

      dispatch(dependenciesGroupInitLoading(authUser));
      dispatch(profilesGroupInitLoading(authUser));

  }, [dispatch]);

  const handleClose = () => {
    dispatch(closeModalGroup());
  }

  return (

    <div>
      <Dialog
        open={openModal1}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth={true}
      >

        <DialogTitle id="form-dialog-title">
        <div style={{fontFamily:'Poppins', fontSize:"16px"}}>
        
            <IntlMessages id="Crear nuevo grupo" />
        
        </div>
        </DialogTitle>

        <DialogContent>

        <Grid container spacing={1}>
          <Grid item xs={4}>
            <FormControl  size="small" variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Dependencia</InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  //value={value}
                 // onChange={handleChange}
                  label="Dependencia"
                >
                  {dependencies.map(({id,name}) => {
                  return(<MenuItem value={id}>{name}</MenuItem>)
                  })}
                </Select>
            </FormControl>
          </Grid>  
          <Grid item xs={4}>
            <FormControl  size="small" variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Perfiles</InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  //value={dep}
                  //onChange={handleChange}
                  label="Perfiles"
                >
                  {profiles.map(({id, name}) => {
                  return(<MenuItem value={id}>{name}</MenuItem>)
                 
                  })}
                </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
              <TextField
                  value={dependencies.id}
                  fullWidth
                  size="small"
                  label="Nombre del grupo"
                  type="text"
                  variant="outlined"
                  disabled
                  //onChange={handleOnChange}
              />  
          </Grid>  
          </Grid>
       
          <Divider className="mt-3"/>
        
          <h5 className="mt-3">Asignación de usuarios</h5>

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
            //onClick={handleOnSave}
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

export default ModalGroup;