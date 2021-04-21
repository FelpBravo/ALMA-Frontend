import React, { useEffect, useState } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import { useDispatch, useSelector } from 'react-redux';

import { startAddAndRemoveTag, startTagsLoading } from 'actions/documents';
import { BootstrapInput } from 'components/ui/helpers/BootstrapInput';

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
const tagsList = [{ id: 1, name:"Crear etiqueta"},
    { id: 2, name: "Editar etiqueta" },
    { id: 3, name: "Etiquetar" },
    { id: 4, name: "Eliminar" },
    { id: 5, name: "Crear etiqueta" },
    { id: 6, name: "Navegar en el árbol" }];

const Tags = () => {
    const [tagsSelected, setTagsSelected] = useState([])
    const handleChange = ({ target }) => {
        const { value } = target;
        setTagsSelected(handleAddOrRemove(value[value.length - 1]))
    };

    const handleRenderValue = (tagsSelected) => {
        const nTags = tagsSelected.length
        if (tagsSelected && nTags > 0) {
            return `${nTags} etiqueta${nTags > 1 && 's'}`;
        }
        return '0 etiquetas';
    }

    const handleAddOrRemove = id => {
        const existsTag = tagsSelected.find(x => x.id === parseInt(id));
        let response = []
        if(!existsTag){
            response = [...tagsSelected, tagsList.find(x => x.id === parseInt(id))]
        }else{
            response = [...tagsSelected.filter((elem) => elem.id !== id)]
        }
        return response;
    }

    return (<>
        <div className="row">
            <div className="col-xl-3 col-lg-3 col-md-12 col-12">
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
                            tagsList.map(( {name, id} ) => (
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

            </div>
        </div>
    </>
    )
}

export default Tags;

