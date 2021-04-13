import indigo from '@material-ui/core/colors/indigo';
import pink from '@material-ui/core/colors/pink';

export const AliceBlue = "#E1F0FF";
export const RedOrange = "#f44336";

export default {
	palette: {
		primary: {
			light: indigo[300],
			main: '#369bff',
			dark: '#5CADFF',
			contrastText: '#fff'
		},
		secondary: {
			light: pink[300],
			main: pink['A200'],
			dark: pink[700],
			contrastText: '#fff'
		}
	},
	status: {
		danger: 'orange',
	},
	typography: {
		button: {
			fontWeight: 400,
			textAlign: 'capitalize'
		},
	},
};
