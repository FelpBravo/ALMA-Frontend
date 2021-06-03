import React, { useEffect, useState } from 'react';
import { ThemeProvider } from '@material-ui/styles';
import URLSearchParams from 'url-search-params';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IntlProvider } from 'react-intl';
import 'assets/vendors/style';
import AppLocale from '../lngProvider';
import RTL from 'util/RTL';
import { setDarkTheme, setThemeColor } from '../actions/setting';
import AppLayout from '../components/ui/AppLayout';
import { PublicRouter } from 'routers/PublicRouter';
import { AuthRouter } from 'routers/AuthRouter';
import { PrivateRouter } from 'routers/PrivateRouter';
import { applyTheme } from 'helpers/applyTheme';
import DownloadFilePage from 'components/downloadFile';
import ChangePasswordPage from 'components/changePassword';
import FormTestPage from 'components/formTest';
import moment from 'moment';
import 'moment/locale/es';

const App = (props) => {

	const [isLogin, setIsLogin] = useState(false);
	const dispatch = useDispatch();
	const { themeColor, darkTheme, locale, isDirectionRTL } = useSelector(({ settings }) => settings);
	const { authUser } = useSelector(({ auth }) => auth);

	const isDarkTheme = darkTheme;
	const { match } = props;

	useEffect(() => {

		if (authUser) {

			setIsLogin(true);

		} else {

			setIsLogin(false);

		}

	}, [dispatch, setIsLogin, authUser]);

	useEffect(() => {

		window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

		const params = new URLSearchParams(props.location.search);
		if (params.has('theme-name')) {
			dispatch(setThemeColor(params.get('theme-name')));
		}

		if (params.has('dark-theme')) {
			dispatch(setDarkTheme());
		}

	}, [dispatch, props.history.location.pathname, props.location.search]);

	const currentAppLocale = AppLocale[locale.locale];

	useEffect(() => {
		currentAppLocale && moment.locale(currentAppLocale?.locale);
	}, [currentAppLocale])
	
	return (
		<ThemeProvider theme={applyTheme(isDarkTheme, darkTheme, themeColor, isDirectionRTL)}>
			<MuiPickersUtilsProvider utils={MomentUtils}>
				<IntlProvider
					locale={currentAppLocale.locale}
					messages={currentAppLocale.messages}>
					<RTL>
						<div className='app-main'>
							<Switch>

								<Route
									exact
									path="/download/:documentId"
									component={DownloadFilePage}
								/>

								<Route
									exact
									path="/change-password/:tokenId"
									component={ChangePasswordPage}
								/>

								{/* Formularios test */}
								<Route
									exact
									path="/form/test"
									component={FormTestPage}
								/>

								<PublicRouter
									path="/auth"
									isAuth={isLogin}
									component={AuthRouter}
								/>

								<PrivateRouter
									authUser={isLogin}
									path={`${match.url}`}
									component={AppLayout}
								/>

								<Redirect to="/auth/signin" />

							</Switch>
						</div>
					</RTL>
				</IntlProvider>
			</MuiPickersUtilsProvider>
		</ThemeProvider>
	);
};

export default App;
