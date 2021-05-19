import { Grid, makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { startApprovesListLoading } from 'actions/flowDocument';
import { TextField } from 'components/ui/Form';
import { TitleCard } from 'components/ui/helpers/TitleCard';

import RolItem from './RolItem';

const useStyles = makeStyles((theme) => ({
    rolTitle: {
        margin: theme.spacing(0, 1),
    },
    rolSubTitle: {
        color: "gray",
        margin: theme.spacing(0, 1),
    }
}));

export default function RequestStep() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { authUser } = useSelector(state => state.auth);
    const { approvesList } = useSelector(state => state.flowDocument);

    const { control, register, handleSubmit, formState: { errors }, setValue } = useForm({
        defaultValues: {}
    });
    const flowName = "GENERAL";

    const { fields } = useFieldArray({
        control,
        name: "approves",
    });

    const onSubmit = values => {
        console.log("values", values)
        // {
        //     "flow": {
        //         "name": "GENERAL"
        //     },
        //     "document": {
        //         "uuid": "89b95882-8803-40ca-8ed1-63476bfbb9e1",
        //             "name": "file1.jpg",
        //                 "author": "juan.suaza"
        //     },
        //     "approves": values.approves,
        //         "comment": "comentario general",
        //             "startedBy": "juan.suaza"
        // }
        console.log({
            "flow": {
                "name": flowName
            },
            "document": {
                "uuid": "89b95882-8803-40ca-8ed1-63476bfbb9e1",
                "name": "file1.jpg",
                "author": "juan.suaza"
            },
            "startedBy": "juan.suaza",
            ...values
        })
    };




    const commonProps = {
        register,
        errors,
        control,
        shrink: true,
        size: "small",
    }

    useEffect(() => {
        dispatch(startApprovesListLoading({ authUser, flowName }))
    }, [authUser])

    return <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
            <Grid item md={12}>
                <TitleCard message="document.title.requestDocument" />
            </Grid>

            {
                approvesList.map(({ name, ...rest }, index) =>
                    <Grid container item md={12} spacing={2}>
                        <RolItem
                            index={index}
                            rolName={name}
                            setValue={setValue}
                            name={`approves[${index}].users`}
                            commonProps={commonProps}
                            control={control}
                            {...rest} />
                    </Grid>)
            }
            <Grid container item md={12}>
                <TitleCard message="Observaciones generales" />
            </Grid>
            <Grid container item md={12}>
                <TextField
                    name="comment"
                    label="Comentario"
                    multiline
                    rows={3}
                    {...commonProps} />
            </Grid>

            <Grid container item md={12}>
                <button type="submit">Enviar</button>
            </Grid>
        </Grid>
    </form>
}