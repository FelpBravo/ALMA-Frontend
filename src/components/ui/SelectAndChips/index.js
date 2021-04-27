import React, { useEffect } from 'react';
import { Button, Chip, Grid, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import DoneIcon from '@material-ui/icons/Done';
   

const SelectAndChips = (props) => {
    const { data } = props
    console.log("data del chip", data)

    const [values, setValues] = React.useState([]);


    const onChange = (_, value) => {
     setValues(value);
     console.log("usuarios elegidos",value)
    };

    return (
        <>
        <Grid container spacing={2}>
            <Grid item xs={8}>
            <Autocomplete
                multiple
                size="small"
                id="tags-outlined"
                options={data}
                getOptionLabel={(option) => option.id}
                getOptionSelected={(option, value) => option.id === value.id}
                value={values}
                onChange={onChange}
                filterSelectedOptions
                renderInput={(params) => (
                    <TextField {...params} variant="outlined" placeholder="Categories" />
                )}
                renderTags={(value, getTagProps) => <></>}
            />
            </Grid>
            <Grid item xs={4}>
            {values.map((objet, index) => (
               
                    <Chip
                    style={{fontFamily:"Poppins", color:"#3699FF", background:"#E1F0FF"}}
                    label={objet.id}
                    size="small"
                    onDelete={(objet3, index2) => {
                        setValues(values.filter((i, index2) => index2 !== index));
                    }}
                    />
               
            ))}
           
            </Grid>
        </Grid>
       
        
      </>
    )
}

export default SelectAndChips