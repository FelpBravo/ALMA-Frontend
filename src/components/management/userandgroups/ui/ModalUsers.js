import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from 'react-redux';

import IntlMessages from 'util/IntlMessages';
import { ACTION_CREATE, ACTION_EDIT } from 'constants/constUtil';
import { Card, CardHeader, DialogTitle, Divider, InputBase, Paper, Grid} from '@material-ui/core';
import {closeModalUsers} from 'actions/adminUsers';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import SearchIcon from '@material-ui/icons/Search';


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
  input: {
		color: '#3699FF',
		fontSize: '14px',
		radius: '4px',
		fontWeight: 500,
		fontFamily: "Poppins, sans-serif !important ",

		"&::placeholder": {
			fontFamily: "Poppins, sans-serif !important ",
			color: '#3699FF',
			align: 'left',
			fontWeight: 500,
		}
	},
  base: {
		border: "none",
		boxShadow: "none",
		padding: "2px 4px",
		display: "flex",
		alignItems: "center",
		padding: 6,
	},

}));

const ModalUsers = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const { authUser } = useSelector(state => state.auth);

  const { openModal} = useSelector(state => state.adminUsers);

  const [value, setValue] = useState('');

  const [messageErrorName, setMessageErrorName] = useState(null);

  const [checked, setChecked] = React.useState([0]);

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

    dispatch(closeModalUsers());
  }

  return (

    <div>
      <Dialog
        open={openModal}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth={true}
      >

        <DialogTitle id="form-dialog-title">
         
            <IntlMessages id="Nuevo usuario" />
        
        </DialogTitle>

        <DialogContent>
          <Grid container spacing={1}>
          <Grid item xs={6}>
              <TextField
                  //value={value}
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
                  //value={value}
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
                  //value={value}
                  label="Correo electrónico"
                  type="text"
                  variant="outlined"
                  size="small"
                  fullWidth
                  //onChange={handleOnChange}
                />
          </Grid>
          <Grid item xs={6} className="mt-3">
              <TextField
                  //value={value}
                  fullWidth
                  label="Usuario"
                  type="text"
                  variant="outlined"
                  size="small"
                  //onChange={handleOnChange}
              /> 
          </Grid>
        <p className="mt-2">**La contraseña de generará automatícamente y llegara al correo indicado.</p>
        
        <h3>Grupos Asignados</h3>
                
          
            <Card>
            <CardHeader
             className={classes.cardHeader}
             title={
              
            <Grid container spacing={3}>
						<Grid item xs={8}>
						<Paper className={classes.base}>
								<SearchIcon color="primary" />
								<InputBase
									className={classes.input}
									//value={searchText}
									name="inputSearch"
									//className="custom-text-field"
									fullWidth
									placeholder="Buscar grupo"
									//onChange={handleOnChange}
								/>
							</Paper>
						
						</Grid>

						<Grid item xs={3}>
							<Button
								style={{ paddingTop: "12px", paddingBottom: "12px", fontFamily: "Poppins, sans-serif", fontSize: '10px', fontWeight: 400, border: "none",
                boxShadow: "none",}}
								variant="contained"
								//type="submit"
								color="primary"
								fullWidth
							>
								<IntlMessages id="dashboard.searchTextButton" />
							</Button>
						</Grid>
            </Grid>
          }
           />
            <Divider/>
            <List className={classes.list}>
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => {
                    const labelId = `checkbox-list-label-${value}`;

                    return (
                    <ListItem key={value} role={undefined} dense button onClick={handleToggle(value)}>
                     
                     <ListItemIcon>
                        <Checkbox
                            className="ml-1 mr-3"
                            edge="start"
                            checked={checked.indexOf(value) !== -1}
                            tabIndex={-1}
                            disableRipple
                            inputProps={{ 'aria-labelledby': labelId }}
                            color="primary"
                        />
                        </ListItemIcon>
  
                        <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
                      
                    </ListItem>
                    );
                })}
            </List>
            </Card>
      
        
        </DialogContent>

        <DialogActions>

          <Button
            onClick={handleClose}
            variant="contained"
            color="primary"
          >
            Cancelar
          </Button>

          <Button
            //onClick={handleOnSave}
            variant="contained"
            color="primary"
            autoFocus
            disabled={messageErrorName}
          >
           Crear
          </Button>

        </DialogActions>

      </Dialog>

    </div>

  )
}

export default ModalUsers;