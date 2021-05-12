import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import { Grid, InputLabel } from '@material-ui/core';
import Chip from 'components/ui/Chip';
import { get } from 'lodash-es';

const Tags = ({ moduleId, tagsList, name, updateActions, tagsSelected}) => {
    const handleChange = ({ target }) => {
        const { value } = target;
        updateActions(moduleId,value)
    };

    const handleRenderValue = (tagsSelected) => {
        const nTags = tagsSelected?.length
        if (tagsSelected && nTags > 0) {
            return `${nTags} etiqueta${nTags > 1 ? 's' : ''}`;
        }
        return '0 etiquetas';
    }

    const handleRemove = id => [...tagsSelected?.filter((elem) => elem !== id)]

    const getNameById = id => get(tagsList.find(e =>e.id === id), 'name', '')

    return (<Grid container spacing={1}>
        <Grid item md={3}>
            <FormControl fullWidth variant="outlined" size="small" >
                <InputLabel id="demo-mutiple-checkbox-label">{name}</InputLabel>
                <Select
                    id="tags-mutiple-checkbox"
                    multiple
                    label={name}
                    value={tagsSelected}
                    onChange={handleChange}
                    renderValue={handleRenderValue}
                >
                    {
                        tagsList.map(({ name, id }) => (
                            <MenuItem
                                key={id}
                                value={id}
                            >
                                <Checkbox
                                    color="primary"
                                    checked={tagsSelected?.find(x => x === id) ? true : false}
                                />

                                <ListItemText
                                    primary={name}
                                />
                            </MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
        </Grid>
        <Grid item md={9} container>
            {tagsSelected?.map( id => <Chip
                key={`${getNameById(id)}${id}${Math.random()}`}
                size="small"
                variant="outlined"
                label={getNameById(id)}
                onDelete={() => updateActions(moduleId, handleRemove(id))}
                color="primary"
            />)}
        </Grid>
    </Grid>
    )
}

export default Tags;

