import React, { useState, Text } from 'react';
import { TextField, Grid, makeStyles } from '@material-ui/core';
import { searchSetValueFilter } from 'actions/search';
import { useDispatch } from 'react-redux';
import IntlMessages from 'util/IntlMessages';


const useStyles = makeStyles((theme) => ({
	root: {
		border: "1px solid rgba(0, 0, 0, 0.24)",
		borderRadius: 4,
		padding: 2,
		height: 40,
		width: '100%',
		minWidth:430,
		'&:hover': {
			border: "1px solid #575757",  
		},

	},
	root2: {
		border: "1px solid #3699FF",
		borderRadius: 4,
		padding: 2,
		height: 40,
		width: '100%',
		minWidth:430,

	},
	containerText: {
		marginTop: -14,
		marginBottom: 5
	},
	containerInput:{
		display:'flex',
		marginTop:-7,
		paddingLeft:15,
		paddingRight:15
	},
	label:{
		marginLeft:15,
		marginRight:15, 
        fontSize:10,
        marginTop:6,
        fontWeight:600,
	},
	text: {
		fontSize: '0.75em',
		marginLeft: 8,
		paddingRight: 12,
		paddingLeft: 5,
		background: "white",
	},
	textblue: {
		fontSize: '0.75em',
		marginLeft: 8,
		paddingRight: 12,
		paddingLeft: 5,
		color:'#3699FF',
		background: "white",
	},
	inter: {
		padding: 4,
		marginTop: -15,
		marginLeft: 15,
	}
}));



export const DateRange = (props) => {
	
	const { namecomponent , label} = props
	const dispatch = useDispatch();
	const classes = useStyles();
	const [date, setDate] = useState({ start: '', end: '' })
	const [active,setActive] = useState(false)
	
	const handleOnChange = ({ target }) => {
		const { name, value } = target;
		if (name === 'startDate') {
			setDate({ start: value, end: date.end })
			if (date.end != '') {
				dispatch(searchSetValueFilter(namecomponent,`['`+value+`' , '`+date.end+`']`));
			}
		}
		else {
			setDate({ start: date.start, end: value })
			if (date.start != '') {
				dispatch(searchSetValueFilter(namecomponent,`['`+date.start+`' , '`+value+`']`));
			}

		}
	}

	return (
		<Grid container spacing={2}>
			
			<Grid item xs={6}>
			<TextField
						//key={name}
						label={label}
						name='startDate'
						fullWidth
						type="date"
						variant="outlined"
						//value={value ? value : '2017-05-24'}
						size="small"
						InputLabelProps={{
							shrink: true,
						}}
						style={{
							color: '#3699FF',
						}}
						onChange={handleOnChange}
					/>
					</Grid>
				    <Grid item xs={6}>
					<TextField
						//key={name}
						label="hasta"
						variant="outlined"
						name='endDate'
						fullWidth
						type="date"
						//value={value ? value : '2017-05-24'}
						size="small"
						InputLabelProps={{
							shrink: true,
						}}
						style={{
							color: '#3699FF',
						}}
						onChange={handleOnChange}
					/>
			</Grid>
			
		</Grid>
	)
}
