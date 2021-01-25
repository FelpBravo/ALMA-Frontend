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

        if (tagsSelected && tagsSelected.length > 0) {

            return `${tagsSelected.length} etiquetas seleccionadas`;

        }

        return '0 etiquetas seleccionadas';

    }

    const handleRenderTags = () => {

        if (tagsSelected && tagsSelected.length > 0) {
            return (
                <div className="row mt-3">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                        {
                            tagsSelected.map(({id, tag, hex}) => {
                                return (
                                    <span
                                        key={id}
                                        style={
                                            {
                                                background: hex,
                                                color: '#ffffff',
                                                paddingBottom: 5,
                                                paddingTop: 5,
                                                paddingLeft: 10,
                                                paddingRight: 10,
                                            }
                                        }
                                        className="x-2 jr-fs-sm mr-2 mb-0 rounded-xl order-sm-2"
                                    >
                                        {tag}
                                    </span>
                                )
                            })

                        }
                    </div>
                </div>

            )
        }

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

                {handleRenderTags()}

                <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-12 mt-3">
                        <Divider />
                    </div>
                </div>

            </div>
        </div>
    )
}
