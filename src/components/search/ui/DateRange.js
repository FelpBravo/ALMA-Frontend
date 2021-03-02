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
	containerText: {
		marginTop: -12,
		marginBottom: 5
	},
	containerInput:{
		display:'flex',
		marginTop:-10,
		paddingLeft:15,
		paddingRight:15
	},
	label:{
		marginLeft:15,
		marginRight:15 
	},
	text: {
		fontSize: '0.75em',
		marginLeft: 8,
		paddingRight: 12,
		paddingLeft: 5,
		background: "white",
	},
	inter: {
		padding: 4,
		marginTop: -15,
		marginLeft: 15,
	}
}));



export const DateRange = (props) => {
	
	const { namecomponent } = props
	const dispatch = useDispatch();
	const classes = useStyles();
	const [date, setDate] = useState({ start: '', end: '' })

	const handleOnChange = ({ target }) => {
		const { name, value } = target;
		console.log(name);
		if (name === 'startDate') {
			setDate({ start: value, end: date.end })
			if (date.end != '') {
				dispatch(searchSetValueFilter(namecomponent,`'`+value+`','`+date.end+`'`));
			}
		}
		else {
			setDate({ start: date.start, end: value })
			if (date.start != '') {
				dispatch(searchSetValueFilter(namecomponent,`'`+date.start+`','`+value+`'`));
			}

		}
	}

	return (
		<div className={classes.root} >
			<div className={classes.containerText} >
				<span className={classes.text}>Modificado en</span>
			</div>
			<div className={classes.containerInput}>
		<p onClick={()=>{
			console.log(date);
		}}>Prueba</p>
			<TextField
						//key={name}
						//label={label}
						name='startDate'
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
					<span className={classes.label}>Hasta</span>
					<TextField
						//key={name}
						//label={label}
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
			</div>
			
		</div>
	)
}
