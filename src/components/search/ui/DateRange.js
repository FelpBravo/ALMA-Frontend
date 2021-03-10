import React, { useState, Text, useEffect } from 'react';
import { TextField, Grid, makeStyles } from '@material-ui/core';
import { searchSetValueFilter, changeCleanFilter } from 'actions/search';
import { useDispatch ,useSelector} from 'react-redux';
import IntlMessages from 'util/IntlMessages';


export const DateRange = (props) => {
	
	const { namecomponent , label, clear} = props
	const dispatch = useDispatch();
	const { cleanfilter } = useSelector(state => state.searchs);
	const [date, setDate] = useState({ start: '', end: '' })
	const [active,setActive] = useState(false)
	
	const handleOnChange = ({ target }) => {
		const { name, value } = target;
		if (name === 'startDate') {
			setDate({ start: value, end: date.end })
			if (date.end != '') {
				dispatch(searchSetValueFilter(namecomponent,`['`+value+`' , '`+date.end+`']`));
			}
			dispatch(changeCleanFilter())
		}
		else {
			setDate({ start: date.start, end: value })
			if (date.start != '') {
				dispatch(searchSetValueFilter(namecomponent,`['`+date.start+`' , '`+value+`']`));
			}
			dispatch(changeCleanFilter())
		}
	}
	useEffect(()=>{
		console.log("ASDDDD");
		if(!cleanfilter){
			setDate({ start: '', end: '' })
		}
	},[cleanfilter])


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
						value={cleanfilter ? date.start: ''}
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
						value={cleanfilter ? date.end:''}
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
