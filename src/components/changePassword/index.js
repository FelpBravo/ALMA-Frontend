import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IntlMessages from 'util/IntlMessages';
import CircularProgress from '@material-ui/core/CircularProgress';
import { startUserSignInLogin } from 'actions/auth';
import { FormControlLabel, InputAdornment, Typography } from '@material-ui/core';
import { CheckBox, LockOpen, PermIdentity } from '@material-ui/icons';
import { uiShowLoading } from 'actions/uiAuth';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

const ChangePasswordPage = () => {

    const dispatch = useDispatch();
    const { loader } = useSelector(state => state.uiAuth);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVerify, setPasswordVerify] = useState('');


    const handleLogin = (e) => {
        e.preventDefault();

        dispatch(uiShowLoading());
        dispatch(startUserSignInLogin(email, password));
    }

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
                        <form onSubmit={handleLogin}>

                            <TextField
                                size="small"
                                label={<IntlMessages id="changePassword.input.verificationCode" />}
                                fullWidth
                                onChange={(event) => setEmail(event.target.value)}
                                defaultValue={email}
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
                                type="passwordVerify"
                                label={<IntlMessages id="changePassword.input.passwordVerify" />}
                                fullWidth
                                onChange={(event) => setPasswordVerify(event.target.value)}
                                defaultValue={password}
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


                            <Button
                                disabled={!email || !password || !passwordVerify}
                                className="mt-3"
                                variant="contained"
                                type="submit"
                                color="primary"
                                fullWidth
                            >
                                <IntlMessages id="changePassword.button.submit" />
                            </Button>

                        </form>
                    </div>
                </div>
            </div>
            {
                loader &&
                <div className="loader-view">
                    <CircularProgress />
                </div>
            }
        </div>
    );
};


export default ChangePasswordPage;
