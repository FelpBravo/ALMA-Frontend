import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Grid, makeStyles } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import jwt_decode from 'jwt-decode'
import { filter, get, includes, values } from 'lodash';
import { isEmpty } from 'lodash-es';
import React, { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { TextField } from 'components/ui/Form';
import { TitleCard } from 'components/ui/helpers/TitleCard';
import IntlMessages from 'util/IntlMessages';
import schema from './requestReviewCree.schema';
import RolItemCree from './RolItemCree';
import DocumentInit from './DocumentInit';
import RolItemUser from './RollItemUser';
import { startInitFlowsCreeLoading } from 'actions/flowDocument';

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
    const dispatch = useDispatch();
    const history = useHistory();
    const { authUser } = useSelector(state => state.auth);
    const { approvesList, docCree} = useSelector(state => state.flowDocument);
    
    const [maxDays, setMaxDays] = useState();
    const [commentValue, setCommentValue] = useState();
 
 
    const { control, register, handleSubmit, formState: { errors }, setValue, setError, getValues, reset } = useForm({
       
        mode: "onTouched",
        shouldFocusError: true,
        resolver: yupResolver(schema),
    });
    console.log("valores", getValues())

    const commonProps = {
        register,
        errors,
        control,
        shrink: true,
        size: "small",
    }
  

    const documentList = [{
        "type":"Documentos Relacionados",
        "label":"prueba",
        "order":3,
        "mandatory": true
    }]

    const onSubmit = values => {
        console.log(values)
       
            const data = { 
                ...values,
                "fileId": docCree?.id,
            }
        dispatch(startInitFlowsCreeLoading(authUser, data,  () => history.push('/inbox')))
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
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

                            <DocumentInit  commonProps={commonProps}/>

                            <Grid container item md={12} >
                               
                                {
                                    documentList.map(({ type, ...rest }, index) =>
                                        <Grid container key={type} item md={12} spacing={2}>
                                            <RolItemCree
                                                index={index}
                                                rolName={type}
                                                setValue={setValue}
                                                name={`documents[${index}].documents`}
                                                commonProps={commonProps}
                                                control={control}
                                                setError={setError}
                                                getValues={getValues}
                                                {...rest} />
                                        </Grid>)
                                }
                            </Grid>

                            <Grid container item md={12} >
                               
                                {
                                   approvesList.map(({ role, ...rest }, index) =>
                                        <Grid container key={role} item md={12} spacing={2}>
                                            <RolItemUser
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
                                    {...commonProps}
                                   />
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
    </form>
    )
}
export default Cree;