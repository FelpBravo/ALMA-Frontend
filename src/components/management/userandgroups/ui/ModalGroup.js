import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from 'react-redux';
import IntlMessages from 'util/IntlMessages';
import { closeModalGroup, dependenciesGroupInitLoading, profilesGroupInitLoading, startCreateGroupLoading, startUsersInitLoading, validateGroupName } from 'actions/adminUsersAndGroup';
import SelectAndChips from 'components/ui/SelectAndChips';
import { DialogTitle, Divider, Grid, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
  },

}));


const ModalGroup = () => {

  const classes = useStyles();

  const dispatch = useDispatch();

  const { authUser } = useSelector(state => state.auth);

  const { userslist = {}, } = useSelector(state => state.adminUsers);
  
  const { data = [] } = userslist

  const { openModal1, dependencies, profiles, groupname } = useSelector(state => state.adminUsers);

  const [messageErrorGroup, setMessageErrorGroup] = useState(null);

  const [nameGroup, setNameGroup] = useState({ dependencie: '', profile: '' , fullnamegroup: ''})

  useEffect(()=>{
    setNameGroup({ dependencie: '', profile: '' , fullnamegroup: ''})
  },[])

  const handleOnChangeName = ({ target }) => {
    const { name, value } = target
    console.log(name, value)

    switch (name) {
      case 'dependency':
        setNameGroup({ dependencie: value, profile: nameGroup.profile, fullnamegroup: value+'_'+nameGroup.profile  })
        if(value.length > 0 && nameGroup.profile.length > 0){
          dispatch(validateGroupName(authUser, value+'_'+nameGroup.profile))
          console.log("soy",groupname)
          setMessageErrorGroup()
        }
        break;
      case 'profile':
        setNameGroup({ profile: value, dependencie: nameGroup.dependencie, fullnamegroup: nameGroup.dependencie+'_'+value  })
        if(nameGroup.dependencie.length > 0 && value.length > 0){
          dispatch(validateGroupName(authUser, nameGroup.dependencie+"_"+value))
          console.log("soy",groupname)
          setMessageErrorGroup()
        }
        break;
      default:

        break;
    }
  }
  useEffect(() => {

    dispatch(dependenciesGroupInitLoading(authUser));
    dispatch(profilesGroupInitLoading(authUser));
    dispatch(startUsersInitLoading(authUser));

  }, [dispatch]);

  const handleClose = () => {
    dispatch(closeModalGroup());
  }
 
  const handleOnSave =() =>{
    dispatch(startCreateGroupLoading(authUser, nameGroup.fullnamegroup))
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
          <div style={{ fontFamily: 'Poppins', fontSize: "16px" }}>

            <IntlMessages id="Crear nuevo grupo" />

          </div>
        </DialogTitle>

        <DialogContent>

          <Grid container spacing={1}>
            <Grid item xs={4}>
              <FormControl size="small" variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Dependencia</InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  name="dependency"
                  onChange={handleOnChangeName}
                  label="Dependencia"
                >
                  {dependencies.map(({ id, name }) => {
                    return (<MenuItem value={name}>{name}</MenuItem>)
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl size="small" variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Perfiles</InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  name="profile"
                  onChange={handleOnChangeName}
                  label="Perfiles"
                >
                  {profiles.map(({ id, name }) => {
                    return (<MenuItem value={name}>{name}</MenuItem>)

                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <TextField
                value={nameGroup.fullnamegroup}
                fullWidth
                size="small"
                label="Nombre del grupo"
                type="text"
                variant="outlined"
                name="names"
                error={groupname || messageErrorGroup? true : false}
                onChange={handleOnChangeName}
                helperText={!groupname? (messageErrorGroup? messageErrorGroup : '' ): 'Grupo ya existe'}
              />
            </Grid>
          </Grid>

          <Divider className="mt-3" />

          <h5 className="mt-3">Asignación de usuarios</h5>

          <SelectAndChips data={data} />

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

export default ModalGroup;