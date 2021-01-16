import { makeStyles } from '@material-ui/core/styles';

const useStylesButton = makeStyles({
	root: {
		background: '#369bff',
		'&:hover': {
			background: '#369bff',
		},
		borderRadius: 3,
		border: 0,
		color: 'white',
		height: 48,
		padding: '0 30px',
		boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
	},
	label: {
		textTransform: 'capitalize',
	},
});

export {
	useStylesButton
}