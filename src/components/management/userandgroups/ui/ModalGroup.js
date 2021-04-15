import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from 'react-redux';

import IntlMessages from 'util/IntlMessages';

import { Card, CardHeader, DialogTitle, Divider, InputBase, Paper, Grid} from '@material-ui/core';
import {closeModalGroup ,validateUserNickname ,nicknameValidate} from 'actions/adminUsers';
import Checkbox from '@material-ui/core/Checkbox';
import Alert from '@material-ui/lab/Alert';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
  { title: 'The Good, the Bad and the Ugly', year: 1966 },
  { title: 'Fight Club', year: 1999 },
  { title: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001 },
  { title: 'Star Wars: Episode V - The Empire Strikes Back', year: 1980 },
  { title: 'Forrest Gump', year: 1994 },
  { title: 'Inception', year: 2010 },
  { title: 'The Lord of the Rings: The Two Towers', year: 2002 },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: 'Goodfellas', year: 1990 },
  { title: 'The Matrix', year: 1999 },
  { title: 'Seven Samurai', year: 1954 },
  { title: 'Star Wars: Episode IV - A New Hope', year: 1977 },
  { title: 'City of God', year: 2002 },
  { title: 'Se7en', year: 1995 },
  { title: 'The Silence of the Lambs', year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: 'Life Is Beautiful', year: 1997 },
  { title: 'The Usual Suspects', year: 1995 },
  { title: 'Léon: The Professional', year: 1994 },
  { title: 'Spirited Away', year: 2001 },
  { title: 'Saving Private Ryan', year: 1998 },
  { title: 'Once Upon a Time in the West', year: 1968 },
  { title: 'American History X', year: 1998 },
  { title: 'Interstellar', year: 2014 },
];
 

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const ModalGroup = () => {
 

  const dispatch = useDispatch();

  const { authUser } = useSelector(state => state.auth);

  const { openModal1 ,validateNickname } = useSelector(state => state.adminUsers);

  const [value, setValue] = useState('');

  const [messageErrorUser, setMessageErrorUser] = useState(null);

  const [checked, setChecked] = React.useState([0]);

  const [dataUser,setDataUser ] = useState({})



  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };


  const handleClose = () => {
    dispatch(closeModalGroup());
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
        
          <Grid item xs={6}>
              <TextField
                  //value={value}
                  fullWidth
                  label="Nombre del grupo"
                  type="text"
                  variant="outlined"
                  required
                  //onChange={handleOnChange}
              />  
          </Grid>  
       
          <Divider className="mt-3"/>
        
        <h5 className="mt-3">Asignación de usuarios</h5>

                <Autocomplete
                  multiple
                  id="checkboxes-tags-demo"
                  options={top100Films}
                  disableCloseOnSelect
                  getOptionLabel={(option) => option.title}
                  renderOption={(option, { selected }) => (
                    <React.Fragment>
                      <Checkbox
                        color="primary"
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option.title}
                    </React.Fragment>
                  )}
                  fullWidth
                  color="primary"
                  renderInput={(params) => (
                    <TextField {...params} variant="outlined" label="Seleccionar grupos" placeholder="Buscar por nombre" />
                  )}
                />  
          
            
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

export default ModalGroup;