import React, { useState, Text} from 'react';
import { TextField, Grid  } from '@material-ui/core';
import { useSelector } from 'react-redux';


import IntlMessages from 'util/IntlMessages';



export const DateRange = () => {



	return (
        <div>
     
		<Grid container spacing={2}>
			<Grid item xs={4}>
            <TextField
					//key={name}
					//label={label}
					//name={name}
					variant="outlined"
					fullWidth
					type="date"
					//value={value ? value : '2017-05-24'}
					size="small"
					InputLabelProps={{
						shrink: true,
					}}
					style={{ color: '#3699FF',	
					}}
					//onChange={handleOnChange}
				/>
            </Grid>
            <Grid item xs={4}>
			<TextField
					//key={name}
					//label={label}
					//name={name}
					variant="outlined"
					fullWidth
					type="date"
					//value={value ? value : '2017-05-24'}
					size="small"
					InputLabelProps={{
						shrink: true,
					}}
					style={{ color: '#3699FF',	
					}}
					//onChange={handleOnChange}
				/>
            </Grid>

			
		</Grid>
        </div>
	)
}
