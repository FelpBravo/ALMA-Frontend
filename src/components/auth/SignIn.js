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

const SignIn = () => {

	const dispatch = useDispatch();
	const { loader } = useSelector(state => state.uiAuth);


	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

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
						<img src={require("assets/images/logo.apiux1.png")} alt="jambo" title="jambo" />
					</div>
				</div>

				<div className="app-login-content">
					<div className="app-login-header mb-4">
						<h1 className="text-color-apiux">
							<IntlMessages id="appModule.titleApp" />
						</h1>
					</div>

					<div className="app-login-form">
						<form onSubmit={handleLogin}>

							<TextField
								label={<IntlMessages id="appModule.email" />}
								fullWidth
								onChange={(event) => setEmail(event.target.value)}
								defaultValue={email}
								margin="normal"
								variant="outlined"
								className="mt-1 my-sm-3"
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<PermIdentity color="primary" />
										</InputAdornment>
									),
								}}
							/>

							<TextField
								type="password"
								label={<IntlMessages id="appModule.password" />}
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

							<div className="mb-3 d-flex align-items-center justify-content-between">
								<FormControlLabel
									control={
										<CheckBox
											color="primary"
										/>
									}
									className="checkbox-login"
									label={
										<Typography
											style={{ fontSize: "12px" }}>
											<IntlMessages id="appModule.rememberPassword" />
										</Typography>
									}
								/>

								<span className="link-login">
									<IntlMessages id="sidebar.appModule.forgotPassword" />
								</span>
							</div>

							<Button
								disabled={!email || !password}
								className="mt-3"
								variant="contained"
								type="submit"
								color="primary"
								fullWidth
							>
								<IntlMessages id="appModule.signIn" />
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


export default SignIn;
