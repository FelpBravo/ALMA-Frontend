import React, { useEffect } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import { useDispatch, useSelector } from 'react-redux';

import { startAddAndRemoveTag, startTagsLoading } from 'actions/documents';
import { BootstrapInput } from 'components/ui/helpers/BootstrapInput';
import IntlMessages from 'util/IntlMessages';
import { Divider } from '@material-ui/core';

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

export const SelectTags = () => {

    const dispatch = useDispatch();

    const { tags = [], tagsSelected } = useSelector(state => state.documents);


    useEffect(() => {

        dispatch(startTagsLoading());

    }, [dispatch]);


    const handleChange = ({ target }) => {

        const { value } = target;

        dispatch(startAddAndRemoveTag(value[value.length - 1]));

    };

    const handleRenderValue = (tagsSelected) => {

        let selected = '';

        for (const tagSelected of tagsSelected) {

            selected += `${tagSelected.tag} `;

        }

        return selected;

    }

    return (
        <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-12 mt-3">

                <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                        <h4>{<IntlMessages id="document.tags.title" />}</h4>
                    </div>
                </div>

                <div className="row">
                    <div className="col-xl-4 col-lg-4 col-md-12 col-12">
                        <FormControl fullWidth>

                            <InputLabel>Seleccionar etiquetas</InputLabel>

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
                                    tags.map(({ id, tag, hex }) => (
                                        <MenuItem
                                            key={id}
                                            value={id}
                                        >
                                            <Checkbox
                                                checked={tagsSelected.find(x => x.id === id) ? true : false}
                                            />

                                            <ListItemText
                                                primary={tag}
                                            />
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>

                    </div>
                </div>

                <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-12 mt-3">
                        <Divider />
                    </div>
                </div>

            </div>
        </div>
    )
}
