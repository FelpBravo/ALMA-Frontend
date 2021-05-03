import React, { useEffect, useState } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import { BootstrapInput } from 'components/ui/helpers/BootstrapInput';
import { Grid, InputLabel, makeStyles } from '@material-ui/core';
import Chip from 'components/ui/Chip';
import { get } from 'lodash-es';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
const tagsList = [{ id: 1, name: "Crear etiqueta" },
{ id: 2, name: "Editar etiqueta" },
{ id: 3, name: "Etiquetar" },
{ id: 4, name: "Eliminar" },
{ id: 5, name: "Crear etiqueta" },
{ id: 6, name: "Navegar en el árbol" },
];

const bgColor = "#E1F0FF";
const fontColor = "#3699FF";

const useStyles = makeStyles(theme => ({
    chip: {
        margin: theme.spacing(0, 0.5),
        borderRadius: 4,
        backgroundColor: bgColor,
        color: fontColor,
        border: 'none',
        fontWeight: '400'
    },
}));


const Tags = ({ moduleId, tagsList, name, updateActions, tagsSelected}) => {
    const classes = useStyles();
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

    console.log("tagsList", tagsList, 'tagsSelected',tagsSelected)
    return (<Grid container spacing={1}>
        <Grid item md={3}>
            <FormControl fullWidth variant="outlined">
                <InputLabel id="demo-mutiple-checkbox-label">{name}</InputLabel>
                <Select
                    id="demo-mutiple-checkbox"
                    multiple
                    label={name}
                    value={tagsSelected}
                    onChange={handleChange}
                    // input={<BootstrapInput />}
                    renderValue={handleRenderValue}
                    MenuProps={MenuProps}
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
                key={id}
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

