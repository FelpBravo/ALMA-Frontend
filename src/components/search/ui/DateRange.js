import React, { useState, Text} from 'react';
import { TextField, Grid, makeStyles  } from '@material-ui/core';
import { useSelector } from 'react-redux';


import IntlMessages from 'util/IntlMessages';

const useStyles = makeStyles((theme) => ({
	root: {
        border: "1px solid #a1a1a1",
        borderRadius: 4,
        padding: 2,
        height: 50,
        width: 520,
        
    },
    text:{
        width: 100,
        fontSize: 12,
        marginTop: -12,
        marginLeft: 12,
        background: "white",
    },
    inter:{
        padding:4,
        marginTop:-15,
        marginLeft: 15,
    }	
  }));

export const DateRange = () => {

	const classes = useStyles();

	return (
        <div className={classes.root}>
        <div>
         <p className={classes.text}>Modificado en</p>
        </div>
		<Grid container className={classes.inter}>
			<Grid item xs={4}>
            <TextField
					//key={name}
					//label={label}
					//name={name}
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
            <Grid  className="ml-5" item xs={2} >
            <p>Hasta</p>
            </Grid>
            <Grid item xs={4}>
			<TextField
					//key={name}
					//label={label}
					//name={name}
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
