import { DialogTitle, Divider, FormControl, Grid, InputLabel, MenuItem, Select } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { closeModalUsers, companyUsersInitLoading, departmentsUsersInitLoading, nicknameValidate, startCreateUsersLoading, startGroupInitLoading, validateUserNickname } from 'actions/adminUsersAndGroup';
import SelectAndChips from 'components/ui/SelectAndChips';
import IntlMessages from 'util/IntlMessages';

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
  },

}));


const ModalUsers = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const { authUser } = useSelector(state => state.auth);

  const { openModal, validateNickname, companys, departments, grouplist = {}, } = useSelector(state => state.adminUsers);

  const [messageErrorUser, setMessageErrorUser] = useState(null);

  const [stateCompany, setStateCompany] = useState({ name: false, department: false })

  const [nameUser, setNameUser] = useState({ group: [] })

  const [dataCreate, setDataCreate] = useState({});

  const { company, department } = dataCreate

  const [validation, setValidation] = useState({})

  const letra = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/

  const correo = /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i

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

  const handleOnChange = ({ target }) => {
    const { name, value } = target

    switch (name) {
      case 'firstName':
        setValidation({ ...validation, ['firstName']: !letra.test(value) || value.length < 1 ? false : true })
        break;
      case 'lastName':
        setValidation({ ...validation, ['lastName']: !letra.test(value) || value.length < 1 ? false : true })
        break;
      case 'email':
        setValidation({ ...validation, ['email']: !correo.test(value) ? false : true })
        break;
      case 'company':
        setValidation({ ...validation, ['company']: !letra.test(value) || value.length < 1 ? false : true })
        if (value === "Other") {
          setStateCompany({ name: true, department: stateCompany.department })
        } else {
          setStateCompany({ name: false, department: stateCompany.department })
        }
        break
      case 'department':
        setValidation({ ...validation, ['department']: !letra.test(value) || value.length < 1 ? false : true })
        if (value === "Other") {
          setStateCompany({ name: stateCompany.name, department: true })
        } else {
          setStateCompany({ name: stateCompany.name, department: false })
        }
        break
      case 'departmentOther':
        setValidation({ ...validation, ['departmentOther']: !letra.test(value) || value.length < 3 ? false : true })
        break
      case 'companyOther':
        setValidation({ ...validation, ['companyOther']: !letra.test(value) || value.length < 3 ? false : true })
        break
      case 'id':
        if (value.length > 4) {
          dispatch(validateUserNickname(authUser, value))
          setMessageErrorUser()
          setValidation({ ...validation, ['id']: !letra.test(value) || value.length < 3 ? false : true })
        } else {
          dispatch(nicknameValidate(false))
          setMessageErrorUser('Debe contener 5 caracteres como minimo.')
        }

        break;


      default:

        break;
    }
    setDataCreate({ ...dataCreate, [name]: value })
  }


  const handleOnSave = e => {
    e.preventDefault()
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
          <div style={{ fontFamily: 'Poppins', fontSize: "16px" }}>
            <IntlMessages id="user.modal.title" />
          </div>
        </DialogTitle>
        <form onSubmit={handleOnSave}>
        <DialogContent>
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
                  error={validation.firstName === false}

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
                  error={validation.lastName === false}

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
                  error={validation.email === false}

                />
              </Grid>
            </Grid>
            <Grid container spacing={1} className="mt-3" >
              <Grid item xs={4}>
                <FormControl size="small" variant="outlined" className={classes.formControl}>
                  <InputLabel id="demo-simple-select-outlined-label">Empresa</InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    name="company"
                    required
                    onChange={handleOnChange}
                    label="Empresa"
                    error={validation.company === false}

                  >
                    {companys.map((item) => {
                      return (<MenuItem value={item}>{item}</MenuItem>)
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
                    required
                    onChange={handleOnChange}
                    error={validation.companyOther === false}


                  />

                </Grid>
              }
            </Grid>
            <Grid container spacing={1} className="mt-3" >
              <Grid item xs={4}>
                <FormControl size="small" variant="outlined" className={classes.formControl}>
                  <InputLabel id="demo-simple-select-outlined-label">Departamento</InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    name='department'
                    required
                    onChange={handleOnChange}
                    label="Departamento"
                    error={validation.department === false}

                  >
                    {departments.map((dep) => {
                      return (<MenuItem value={dep}>{dep}</MenuItem>)

                    })}
                  </Select>
                </FormControl>
              </Grid>
              {stateCompany.department &&
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="Escriba nombre del departamento"
                    name='departmentOther'
                    type="text"
                    variant="outlined"
                    size="small"
                    required
                    onChange={handleOnChange}
                    error={validation.departmentOther === false}

                  />

                </Grid>
              }
            </Grid>
            <Grid item xs={4} className="mt-3" >
              <TextField
                fullWidth
                label="Usuario"
                name="id"
                error={validateNickname || messageErrorUser || validation.id === false ? true : false}
                type="text"
                variant="outlined"
                size="small"
                required
                onChange={handleOnChange}
                helperText={!validateNickname ? (messageErrorUser ? messageErrorUser : '') : 'Usuario ya existe'}
              />

            </Grid>

          <Alert severity="info" style={{ fontFamily: "Poppins", color: "#3699FF", fontSize: "12px" }} className="mt-3">
            La contraseña de generará automatícamente y llegara al correo indicado.
          </Alert>

          <Divider className="mt-3" />

          <h5 className="mt-3">Asignar grupos</h5>

          <SelectAndChips data={grouplist} returnData={(group) => setNameUser(group.map(group => {
            return { 'id': group.id }
          }))} />

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
            <IntlMessages id="button.text.cancel" />
          </Button>

          <Button
            style={{
              fontFamily: "Poppins", fontSize: '12px', fontWeight: 500, border: "none", boxShadow: "none", height: '45px', width: '120px'
            }}
            // onClick={handleOnSave}
            variant="contained"
            color="primary"
            type="submit"
            disabled={
              validation.email
                && validation.firstName
                && validation.lastName
                && validation.department
                && validation.company
                && validation.id
                && (department === 'Other' ? validation.departmentOther : true)
                && (company === 'Other' ? validation.companyOther : true) ? false : true
            }
          >
            Crear
          </Button>

        </DialogActions>
        </form>


      </Dialog>

    </div>

  )
}

export default ModalUsers;