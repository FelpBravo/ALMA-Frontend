import { Grid, InputAdornment, Snackbar } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import { LockOpen } from '@material-ui/icons';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { Alert } from '@material-ui/lab';
import { startRestorePassword, startVerifyPasswordStatus } from 'actions/changePassword';
import { isEmpty, omit } from 'lodash-es';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import IntlMessages from 'util/IntlMessages';

const regularExp = /^(?=.*\d{2,})(?=.*[A-Z])(?=.*?[#?!@$%^&*-])(?=.*[a-zA-Z]).{8,}$/g

const ChangePasswordPage = () => {
    const { tokenId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const { processStatus, invalidCode } = useSelector(state => state.restorePassword);

    const [loading, setLoading] = useState(false)
    const [openSnackBar, setOpenSnackBar] = useState(false)
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [errors, setErrors] = useState({});
    const [pageFound, setPageFound] = useState(null)

    const handleClose = (e, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackBar(false);
    };

    useEffect(() => {
        tokenId && dispatch(startVerifyPasswordStatus(tokenId, setPageFound));
    }, [tokenId])

    useEffect(() => {
        switch (true) {


            case isEmpty(password) || isEmpty(rePassword):
            case password === rePassword:
                setErrors({ ...omit(errors, 'rePassword') })
                break;

            case password !== rePassword:
                setErrors({ ...errors, rePassword: "Las contraseñas no coinciden" })
                break;


            default:
                break;
        }
    }, [password, rePassword])

    useEffect(() => {
        if (regularExp.test(password) || isEmpty(password)) {
            setErrors({ ...omit(errors, 'password') })
        } else {
            setErrors({ ...errors, password: "No cumple con la política de contraseñas" })
        }
    }, [password])

    useEffect(() => {
        if (invalidCode && !loading) {
            setErrors({ ...errors, code: "Código de verificación incorrecto" })
        }
    }, [invalidCode, loading])

    useEffect(() => {
        if (invalidCode && errors?.code) {
            setErrors({ ...omit(errors, 'code') })
        }
    }, [code])

    useEffect(() => {
        if (processStatus) {
            setOpenSnackBar(true)
        }
    }, [processStatus])

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        dispatch(startRestorePassword(tokenId, { code, password, rePassword, }, setLoading));
    }

    const handleExiting = () => {
        history.push('/auth/signin');
    };

    if (pageFound === null)
        return <Grid container alignItems="center" justify="center">
            <CircularProgress />
        </Grid>

    return (
        <div className="app-login-container d-flex justify-content-center align-items-center animated slideInUpTiny animation-duration-3">
            <div className="app-login-main-content">
                <div className="app-logo-content d-flex align-items-center justify-content-center">
                    <div className="logo-lg" to="/" title="Jambo">
                        <img height="260" src={require("assets/images/alma-logo.jpg")} alt="logo alma" title="logo alma" />
                    </div>
                </div>

                <div className="app-login-content">
                    <div className="app-login-header mb-4">
                        <h1 className="text-color-apiux">
                            <IntlMessages id="changePassword.paper.title" />
                        </h1>
                    </div>

                    <div className="app-login-form">
                        {!pageFound
                            ? <Grid container alignItems="center" justify="center" direction="column">
                                <ErrorOutlineIcon color="error" style={{ fontSize: 72 }} />
                                <h2>
                                    <IntlMessages id="changePassword.paper.title.notFound" />
                                </h2>
                                <h5>
                                    <IntlMessages id="changePassword.paper.subtitle.notFound" />
                                </h5>
                            </Grid>
                            : <form onSubmit={handleSubmit}>
                                <TextField
                                    size="small"
                                    label={<IntlMessages id="changePassword.input.verificationCode" />}
                                    fullWidth
                                    onChange={(event) => setCode(event.target.value)}
                                    defaultValue={code}
                                    error={!isEmpty(errors['code'])}
                                    helperText={errors['code']}
                                    margin="normal"
                                    variant="outlined"
                                    className="mt-1 my-sm-3"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <VpnKeyIcon color="primary" />
                                            </InputAdornment>
                                        ),
                                    }}
                                />

                                <TextField
                                    size="small"
                                    type="password"
                                    label={<IntlMessages id="changePassword.input.password" />}
                                    fullWidth
                                    onChange={(event) => setPassword(event.target.value)}
                                    defaultValue={password}
                                    error={!isEmpty(errors['password'])}
                                    helperText={errors['password']}
                                    margin="normal"
                                    variant="outlined"
                                    className="mt-1 my-sm-3"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LockOpen color="primary" />
                                            </InputAdornment>
                                        ),
                                    }}
                                />

                                <TextField
                                    size="small"
                                    type="password"
                                    label={<IntlMessages id="changePassword.input.rePassword" />}
                                    fullWidth
                                    onChange={(event) => setRePassword(event.target.value)}
                                    defaultValue={rePassword}
                                    margin="normal"
                                    variant="outlined"
                                    className="mt-1 my-sm-3"
                                    error={!isEmpty(errors['rePassword'])}
                                    helperText={errors['rePassword']}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LockOpen color="primary" />
                                            </InputAdornment>
                                        ),
                                    }}
                                />


                                <Button
                                    disabled={!isEmpty(errors) || !code || !password || !rePassword || openSnackBar}
                                    className="mt-3"
                                    variant="contained"
                                    type="submit"
                                    color="primary"
                                    fullWidth
                                >
                                    {loading && <CircularProgress size={20} />}
                                    <IntlMessages id="changePassword.button.submit" />
                                </Button>

                            </form>}
                    </div>
                </div>
            </div>
            <Snackbar open={openSnackBar} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} onExited={handleExiting} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    <IntlMessages id="changePassword.paper.title.success" />
                </Alert>
            </Snackbar>
        </div>
    );
};


export default ChangePasswordPage;
