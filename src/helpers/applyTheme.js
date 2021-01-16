import { createMuiTheme } from '@material-ui/core/styles';
import indigoTheme from '../helpers/themes/indigoTheme';
import { getColorTheme } from "helpers/getColorTheme";

export const applyTheme = (isDarkTheme, darkTheme, themeColor, isDirectionRTL) => {
	let applyTheme = createMuiTheme(indigoTheme);

	if (isDarkTheme) {
		document.body.classList.add('dark-theme');
		applyTheme = createMuiTheme(darkTheme)
	} else {
		applyTheme = getColorTheme(themeColor, applyTheme);
	}

	if (isDirectionRTL) {
		applyTheme.direction = 'rtl';
		document.body.classList.add('rtl')
	} else {
		document.body.classList.remove('rtl');
		applyTheme.direction = 'ltr';
	}

	return applyTheme
}