import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from 'react-redux';
import IntlMessages from 'util/IntlMessages';
import { closeModalUsersGroup, createUsersGroupLoading, startUsersInitLoading } from 'actions/adminUsersAndGroup';
import SelectAndChips from 'components/ui/SelectAndChips';
import { DialogTitle, Divider, Grid} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
  },
}));

const ModalAddUsersGroup = () => {

  const classes = useStyles();
  const dispatch = useDispatch();
  const { authUser } = useSelector(state => state.auth);

  const { userslist = {}, nameGroup, idGroup, openModal2} = useSelector(state => state.adminUsers);
 
  const { data = [] } = userslist

  const [nameUsersGroup, setNameUsersGroup] = useState({ users:[] })
 
   useEffect(() => {
    dispatch(startUsersInitLoading(authUser));
  }, [dispatch]);

  
  const handleClose = () => {
    dispatch(closeModalUsersGroup());
  }
  
  const handleOnSave =() =>{
    dispatch(createUsersGroupLoading(authUser, idGroup, nameUsersGroup.users))
    dispatch(closeModalUsersGroup());
    
  }

  return (
    <div>
      <Dialog
        open={openModal2}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth={true}
      >
        <DialogTitle id="form-dialog-title">
          <div style={{ fontFamily: 'Poppins', fontSize: "16px" }}>
            <IntlMessages id="Agregar usuarios" />
          </div>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <TextField
                value={nameGroup}
                fullWidth
                size="small"
                label="Nombre del grupo"
                type="text"
                variant="outlined"
                name="names"
                disabled
               />
            </Grid>
          </Grid>

          <Divider className="mt-3" />

          <h5 className="mt-3">Asignación de usuarios</h5>
          <SelectAndChips data={data} returnData={(users)=> setNameUsersGroup({...nameUsersGroup,['users']:users.map(users=>{
             return{'id': users.id}
            })})
            }/>
          <Divider className="mt-3" />
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
              fontFamily: "Poppins", fontSize: '12px', fontWeight: 500, border: "none", boxShadow: "none", height: '45px', width: '120px'
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
export default ModalAddUsersGroup;