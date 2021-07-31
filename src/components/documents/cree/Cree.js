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
import { TextField } from 'components/ui/Form';
import { TitleCard } from 'components/ui/helpers/TitleCard';
import IntlMessages from 'util/IntlMessages';
import schema from './requestReviewCree.schema';
import RolItemCree from './RolItemCree';

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
const Cree = () => {
    const classes = useStyles();
    const { authUser } = useSelector(state => state.auth);
    const { approvesList} = useSelector(state => state.flowDocument);
    //useEffect(() => {
    //if (flowId){
    // dispatch(startGetInvolvedLoading(flowId))
    // }
    //}, [flowId])
    //const [formData, setFormData] = useState(null)
    const { control, register, handleSubmit, formState: { errors }, setValue, setError, getValues, reset } = useForm({
        // defaultValues: initialApprovers,
        mode: "onTouched",
        shouldFocusError: true,
        resolver: yupResolver(schema),
    });
    {/*const getUsers = (role, approvers) => approvers.find( app => app.role === role)?.users;
    useEffect(() => {
        if (!isEmpty(initialApprovers) && !isEmpty(approvesList)) {
            const { comment } = form
            const currentData = { 
                ...initialApprovers,
                comment,
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
const getIndex = (arr, userId) => arr.findIndex(e => userId === e.userId)*/}
    {/* const onSubmit = values => {
        let canOpenModal = true;
        const { approves, comment } = values;
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
                    "name": "hola"
                },
                "document": {
                    "uuid": get(filesLoaded, '0.fileIdLoaded', null),
                    "name": get(filesLoaded, '0.name', null),
                    "author": user?.userId,
                    pathFolderName,
                    folderId,
                    //tagsField: tagsField?.length
                },
                "startedBy": user?.userId,
                //Edit
                taskId,
                "approve": false,
                "role": role,
                ...values,
                comment: values.comment
            }
            setFormData(data)
        }
    };
  */}
    const commonProps = {
        register,
        errors,
        control,
        shrink: true,
        size: "small",
    }
    {/*
    useEffect(() => {
        dispatch(startApprovesListLoading({ authUser, flowName }))
    }, [authUser])

    const handleClose = () => {
        setFormData(null)
    }*/}
   
    return (
        <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                <div className="jr-card">
                    <form>
                        <Grid container spacing={2}>
                            <Grid item md={12}>
                                <TitleCard message="document.title.creeDocument" />
                            </Grid>
                            <Grid item md={12}>
                                <Alert severity="warning">
                                    <p style={{ margin: 0 }}>
                                        <IntlMessages id="document.loadDocuments.info.cree.message" />
                                    </p>
                                </Alert>
                            </Grid>
                            <Grid container item md={12} >
                               
                                {
                                    approvesList.map(({ role, ...rest }, index) =>
                                        <Grid container key={role} item md={12} spacing={2}>
                                            <RolItemCree
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
                            </Grid>
                            
                            <Grid container item md={12}>
                            <TitleCard message="document.loadDocuments.general.remarks" />
                                <TextField
                                    name={"comment"}
                                    //label="Comentario"
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
                                            //type="submit"
                                            variant="contained"
                                            color="primary"
                                        >
                                            <IntlMessages id="table.shared.dialog.field.createDocument" />
                                        </Button>
                                    </div>
                                </Grid>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Cree;