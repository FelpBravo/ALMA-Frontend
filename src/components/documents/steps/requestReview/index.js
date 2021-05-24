import { yupResolver } from '@hookform/resolvers/yup';
import { Grid, makeStyles } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { useContext, useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { startApprovesListLoading } from 'actions/flowDocument';
import { FlowContext } from 'components/documents/helpers/FlowContext';
import { TextField } from 'components/ui/Form';
import { TitleCard } from 'components/ui/helpers/TitleCard';
import { getUsersFilter } from 'services/usersService';
import IntlMessages from 'util/IntlMessages';

import schema from './requestReview.schema';
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
    const { setOnSubmitFlow } = useContext(FlowContext);
    console.log("setOnSubmitFlow", setOnSubmitFlow)
    const { control, register, handleSubmit, formState: { errors }, setValue } = useForm({
        defaultValues: {},
        mode: "onTouched",
        resolver: yupResolver(schema),
    });
    const flowName = "GENERAL";

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
                "author": "juan.suaza",
                "folderId": 101
            },
            "startedBy": "juan.suaza",
            ...values
        })
    };

    useEffect(() => {
        setOnSubmitFlow(onSubmit)
    }, [onSubmit])

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
            <Grid item md={12}>
                <Alert severity="info">
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley</p>
                </Alert>
            </Grid>
            {
                approvesList.map(({ role, ...rest }, index) =>
                    <Grid container item md={12} spacing={2}>
                        <RolItem
                            index={index}
                            rolName={role}
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
        </Grid>
    </form>
}