import React, { useEffect } from 'react';
import { Button, Grid, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import DoneIcon from '@material-ui/icons/Done';
import Chip from 'components/ui/Chip';


const SelectAndChips = (props) => {
    const { data, returnData } = props

    const [values, setValues] = React.useState([]);

    useEffect(() => {
        returnData(values)
    }, [values])


    const onChange = (_, value) => {
        setValues(value);

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
                            label={objet.id}
                            size="small"
                            variant="outlined"
                            color="primary"
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