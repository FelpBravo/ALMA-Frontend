import { createMuiTheme } from '@material-ui/core/styles';
import indigoTheme from '../helpers/themes/indigoTheme';

import cyanTheme from './themes/cyanTheme';
import orangeTheme from './themes/orangeTheme';
import amberTheme from './themes/amberTheme';
import pinkTheme from './themes/pinkTheme';
import blueTheme from './themes/blueTheme';
import purpleTheme from './themes/purpleTheme';
import greenTheme from './themes/greenTheme';
import {
	AMBER,
	BLUE,
	CYAN,
	DARK_AMBER,
	DARK_BLUE,
	DARK_CYAN,
	DARK_DEEP_ORANGE,
	DARK_DEEP_PURPLE,
	DARK_GREEN,
	DARK_INDIGO,
	DARK_PINK,
	DEEP_ORANGE,
	DEEP_PURPLE,
	GREEN,
	INDIGO,
	PINK
} from '../constants/ThemeColors';

export const getColorTheme = (themeColor, applyTheme) => {
	switch (themeColor) {
		case INDIGO: {
			applyTheme = createMuiTheme(indigoTheme);
			break;
		}
		case CYAN: {
			applyTheme = createMuiTheme(cyanTheme);
			break;
		}
		case AMBER: {
			applyTheme = createMuiTheme(amberTheme);
			break;
		}
		case DEEP_ORANGE: {
			applyTheme = createMuiTheme(orangeTheme);
			break;
		}
		case PINK: {
			applyTheme = createMuiTheme(pinkTheme);
			break;
		}
		case BLUE: {
			applyTheme = createMuiTheme(blueTheme);
			break;
		}
		case DEEP_PURPLE: {
			applyTheme = createMuiTheme(purpleTheme);
			break;
		}
		case GREEN: {
			applyTheme = createMuiTheme(greenTheme);
			break;
		}
		case DARK_INDIGO: {
			applyTheme = createMuiTheme({ ...indigoTheme, direction: 'rtl' });
			break;
		}
		case DARK_CYAN: {
			applyTheme = createMuiTheme(cyanTheme);
			break;
		}
		case DARK_AMBER: {
			applyTheme = createMuiTheme(amberTheme);
			break;
		}
		case DARK_DEEP_ORANGE: {
			applyTheme = createMuiTheme(orangeTheme);
			break;
		}
		case DARK_PINK: {
			applyTheme = createMuiTheme(pinkTheme);
			break;
		}
		case DARK_BLUE: {
			applyTheme = createMuiTheme(blueTheme);
			break;
		}
		case DARK_DEEP_PURPLE: {
			applyTheme = createMuiTheme(purpleTheme);
			break;
		}
		case DARK_GREEN: {
			applyTheme = createMuiTheme(greenTheme);
			break;
		}
		default: createMuiTheme(indigoTheme);
	}
	return applyTheme;
};