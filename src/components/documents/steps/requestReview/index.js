import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Grid, makeStyles } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import jwt_decode from 'jwt-decode'
import { filter, get, includes } from 'lodash';
import { isEmpty } from 'lodash-es';
import React, { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { startApprovesListLoading, startGetInvolvedLoading } from 'actions/flowDocument';
import ModalLoadFlow from 'components/documents/resume/ModalLoadFlow';
import { TextField } from 'components/ui/Form';
import { TitleCard } from 'components/ui/helpers/TitleCard';
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
    },
    buttons: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    buttonPrimary: {
        fontFamily: "Poppins",
        fontSize: '12px',
        fontWeight: 600,
        border: "none",
        boxShadow: "none",
        height: '45px',
        width: '120px'
    }
}));

export default function RequestStep({ tagsField }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { authUser } = useSelector(state => state.auth);
    const { approvesList, initialApprovers, taskId, form } = useSelector(state => state.flowDocument);
    console.log("comentario",form)
    const { folderId, filesLoaded, pathFolderName } = useSelector(state => state.documents);
    const { user } = jwt_decode(authUser)
    const { flowId } = useParams();
    const EDIT_MODE = Boolean(flowId);
    const {role} = useSelector(state => state.flowDocument);

    useEffect(() => {
        if (flowId){
            dispatch(startGetInvolvedLoading(flowId))
        }
    }, [flowId])

    const [formData, setFormData] = useState(null)
    const { control, register, handleSubmit, formState: { errors }, setValue, setError, getValues, reset } = useForm({
        // defaultValues: initialApprovers,
        mode: "onTouched",
        shouldFocusError: true,
        resolver: yupResolver(schema),
    });

    const getUsers = (role, approvers) => approvers.find( app => app.role === role)?.users;

    useEffect(() => {
        if (!isEmpty(initialApprovers) && !isEmpty(approvesList)) {
            const { approverComment } = form
            const currentData = { 
                ...initialApprovers,
                approverComment,
                approves: approvesList?.map(({role}) =>({
                    role,
                    users: getUsers(role, initialApprovers.approves) || [],
                }))
            }
            console.log("currentData", currentData)
            reset(currentData)
        }
    }, [initialApprovers, setValue, approvesList, form])


    const flowName = "GENERAL";
    const getIndex = (arr, userId) => arr.findIndex(e => userId === e.userId)

    const onSubmit = values => {
        let canOpenModal = true;
        const { approves, approverComment } = values;

        // Revisar usuarios duplicados por rol
        const set = [...new Set(approves.map(x => get(x, 'users')?.map(({ userId }) => userId)))];
        const allList = set.map(arr => filter(arr, (val, i, iteratee) => includes(iteratee, val, i + 1)))
        allList.forEach((arr, index) => arr?.forEach(
            userId => {
                canOpenModal = false;
                setError(`approves[${index}].users[${getIndex(get(approves, `${index}.users`, []), userId)}].userId`, {
                    type: "focus",
                    message: "forms.errors.validation.string.unique.flows",
                }, { shouldFocus: true })
            }
        ))

        if (canOpenModal) {
            const data = { // TODO: Esta es la variable para enviar por props en el modal informativo.
                "flow": {
                    "name": flowName
                },
                "document": {
                    "uuid": get(filesLoaded, '0.fileIdLoaded', null),
                    "name": get(filesLoaded, '0.name', null),
                    "author": user?.userId,
                    pathFolderName,
                    folderId,
                    tagsField: tagsField?.length
                },
                "startedBy": user?.userId,
                //Edit
                taskId,
                "approve": false,
                "role": role,
                ...values,
                comment: EDIT_MODE ? approverComment : values.comment
            }
            setFormData(data)
        }
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

    const handleClose = () => {
        setFormData(null)
    }
    return <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
            <Grid item md={12}>
                <TitleCard message="document.title.requestDocument" />
            </Grid>
            <Grid item md={12}>
                <Alert severity="info">
                    <p style={{ margin: 0 }}>
                        <IntlMessages id="document.loadDocuments.info.message" />
                    </p>
                </Alert>
            </Grid>
            {
                approvesList.map(({ role, ...rest }, index) =>
                    <Grid container key={role} item md={12} spacing={2}>
                        <RolItem
                            index={index}
                            rolName={role}
                            setValue={setValue}
                            name={`approves[${index}].users`}
                            commonProps={commonProps}
                            control={control}
                            setError={setError}
                            getValues={getValues}
                            {...rest} />
                    </Grid>)
            }
            <Grid container item md={12}>
                <TitleCard message="document.loadDocuments.general.remarks" />
            </Grid>
            <Grid container item md={12}>
                <TextField
                    name={EDIT_MODE ? "approverComment" :"comment" }
                    label="Comentario"
                    multiline
                    rows={3}
                    {...commonProps} />
            </Grid>
        </Grid>
        <div className="row mt-4">
            <div className="col-xl-12 col-lg-12 col-md-12 col-12 mt-3">
                <Grid
                    container
                    justify="flex-end"
                    alignItems="flex-end"
                    spacing={2}
                >
                    <div className={classes.buttons}>

                        <Button
                            className={classes.buttonPrimary}
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            <IntlMessages id="document.loadDocuments.submit.flow.next" />
                        </Button>

                    </div>
                </Grid>

            </div>
            <ModalLoadFlow
                data={formData}
                close={handleClose}
                open={Boolean(formData)} />
        </div>

    </form>
}