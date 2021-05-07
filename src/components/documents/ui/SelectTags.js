import { Divider } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { startAddAndRemoveTag, startTagsLoading } from 'actions/documents';
import { AutoCompleteField, CheckField, SelectField } from 'components/ui/Form';
import { BootstrapInput } from 'components/ui/helpers/BootstrapInput';
import IntlMessages from 'util/IntlMessages';

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

    const { tags = [] } = useSelector(state => state.documents);

    const { authUser } = useSelector(state => state.auth);
    const { control, watch } = useFormContext();
    const tagsSelected = watch('tagsField', []);

    useEffect(() => {

        dispatch(startTagsLoading(authUser));

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
    const getTagData = id => tags.find(x => x?.id === id)

    const handleRenderTags = () => {

        if (tagsSelected && tagsSelected.length > 0) {
            return (
                <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-12 mt-2">
                        {
                            tagsSelected.map((id) => {
                                const tagElement = getTagData(id)
                                return (
                                    <span
                                        key={id}
                                        style={
                                            {
                                                background: tagElement?.hex,
                                                color: '#ffffff',
                                                paddingBottom: 5,
                                                paddingTop: 5,
                                                paddingLeft: 10,
                                                paddingRight: 10,
                                            }
                                        }
                                        className="x-2 jr-fs-sm mr-2 mb-0 rounded-xl order-sm-2"
                                    >
                                        {tagElement?.tag}
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

                            {/* <InputLabel>Seleccionar etiquetas</InputLabel> */}

                            <SelectField
                                id="demo-mutiple-checkbox"
                                multiple
                                // value={tagsSelected}
                                name="tagsField"
                                label="Seleccionar etiquetas"
                                control={control}
                                size="small"
                                // onChange={handleChange}
                                // input={<BootstrapInput />}
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
                                                color="primary"
                                                checked={tagsSelected.find(x => x === id) ? true : false}
                                            />

                                            <ListItemText
                                                primary={tag}
                                            />
                                        </MenuItem>
                                    ))
                                }
                            </SelectField>
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
