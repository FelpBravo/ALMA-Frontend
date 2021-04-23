import React, { useState } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import { BootstrapInput } from 'components/ui/helpers/BootstrapInput';
import { Grid, makeStyles } from '@material-ui/core';
import Chip from 'components/ui/Chip';

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


const Tags = () => {
    const [tagsSelected, setTagsSelected] = useState([])
    const classes = useStyles();

    const handleChange = ({ target }) => {
        const { value } = target;
        setTagsSelected(handleAddOrRemove(value[value.length - 1]))
    };

    const handleRenderValue = (tagsSelected) => {
        const nTags = tagsSelected.length
        if (tagsSelected && nTags > 0) {
            return `${nTags} etiqueta${nTags > 1 ? 's' : ''}`;
        }
        return '0 etiquetas';
    }

    const handleRemove = id => [...tagsSelected.filter((elem) => elem.id !== id)]

    const handleAddOrRemove = id => {
        const existsTag = tagsSelected.find(x => x.id === parseInt(id));
        let response = []
        if (!existsTag) {
            response = [...tagsSelected, tagsList.find(x => x.id === parseInt(id))]
        } else {
            response = handleRemove(id)
        }
        return response;
    }


    return (<Grid container spacing={1}>
        <Grid item md={3}>
            <FormControl fullWidth>
                <Select
                    id="demo-mutiple-checkbox"
                    multiple
                    value={tagsSelected}
                    onChange={handleChange}
                    input={<BootstrapInput />}
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
                                    checked={tagsSelected.find(x => x.id === id) ? true : false}
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
            {tagsSelected.map(({ id, name }) => <Chip
                key={id}
                size="small"
                variant="outlined"
                label={name}
                onDelete={() => setTagsSelected(handleRemove(id))}
                color="primary"
            />)}
        </Grid>
    </Grid>
    )
}

export default Tags;

