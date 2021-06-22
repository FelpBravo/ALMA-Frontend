import { CircularProgress, Divider, FormControl, Grid, InputLabel, makeStyles, MenuItem, Paper, Select } from '@material-ui/core'
import { get } from 'lodash-es';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { actionsModuleClear, actionsModuleSetValueField, startGetActionsByModuleByPolicy, startGetPolicies, startGetProfiles, startPermissionsModuleLoading, startSaveActionsModuleByPolicy } from 'actions/permissions';
import Button from 'components/ui/Button'
import { hasAuthority } from 'util/authorities';
import IntlMessages from 'util/IntlMessages';

import LoadingView from './loadingView';
import Tags from './tags'

const useStyles = makeStyles(theme => ({
    divider: {
        margin: theme.spacing(3, 0),
    },
    card: {
        padding: theme.spacing(2),
        marginBottom: theme.spacing(2),
        width: '100%'
    }
}));

export default function GroupPermissions() {
    const dispatch = useDispatch();
    const { authUser } = useSelector(state => state.auth);
    const { actionsModule, profiles, policies, fields } = useSelector(state => state.modulePermissions);
    const classes = useStyles();
    const [actionsModuleList, setActionsModuleList] = useState(null)
    const profileIdSelected = get(fields.find(({ name }) => name === "profile"), 'value', null)
    const [loading, setLoading] = useState(false)
    const [loadingSubmit, setLoadingSubmit] = useState(false)

    const geyPolicyId = () => {
        const profileName = profiles.find(({ id }) => id === profileIdSelected)?.name
        const matchPolicy = policies.find(({ name }) => name.replace("POLITIC_", "") === profileName)
        const policyId = get(matchPolicy, 'id')
        return policyId;
    }

    useEffect(() => {
        dispatch(startGetProfiles(authUser))
        dispatch(startGetPolicies(authUser))
        dispatch(startPermissionsModuleLoading(authUser))
        return () => dispatch(actionsModuleClear)
    }, [])

    useEffect(() => {
        if (profileIdSelected) {
            setLoading(true)
            const policyId = geyPolicyId()
            dispatch(startGetActionsByModuleByPolicy({ authUser, policyId }, setActionsModuleList, setLoading))
        }
        return () => dispatch(actionsModuleClear)

    }, [profileIdSelected])

    const handleSaveActions = () => {
        setLoadingSubmit(true);
        const policyId = geyPolicyId()
        dispatch(startSaveActionsModuleByPolicy({ authUser, policyId, data: actionsModuleList }, setLoadingSubmit))
    }

    const handleOnChange = ({ target }) => {
        const { name, value } = target;
        dispatch(actionsModuleSetValueField(name, value));
    }

    const updateActions = (id, actions) => {
        if (actions) {
            const newArray = actionsModuleList.filter(e => e.id !== id)
            newArray.push({
                id,
                actions
            })
            setActionsModuleList(newArray)
        }
    }

    const getActionsByModuleId = id => get(actionsModuleList.find((e) => e.id === id), 'actions', [])

    const canUpdatePermissions = useSelector(hasAuthority('ROLE_PERMISSIONS_UPDATE'));

    if (!canUpdatePermissions) return null

    return <Grid container alignItems="center" justify="center">
        <Paper className={classes.card}>
            <Grid item container md={12} xs={12} sm={12}>
                <Grid item md={5} xs={12} sm={12}>
                    <h3>
                        <IntlMessages id="groupPermissions.title" />
                    </h3>
                    <FormControl fullWidth variant="outlined" size="small" >
                        <InputLabel id="demo-mutiple-checkbox-label">
                            <IntlMessages id="groupPermissions.select.profile" />
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            name="profile"
                            label={<IntlMessages id="groupPermissions.select.profile" />}
                            value={profileIdSelected}
                            onChange={handleOnChange}
                        >
                            {
                                profiles && profiles.map(({ id, name }) => <MenuItem key={id} value={id}>{name}</MenuItem>)
                            }
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </Paper>

        {(loading || actionsModuleList) &&
            <Paper className={classes.card}>
            <Grid item container md={12} xs={12} sm={12}>
                    {
                        loading && <LoadingView />
                    }
                    {
                        actionsModuleList && <>
                            {
                                !loading && actionsModule && actionsModule.map(({ id, name, actions }) =>
                                    <Grid item md={12} xs={12} sm={12} key={id}>
                                        <h4>{name}</h4>
                                        <Tags
                                            moduleId={id}
                                            name={<IntlMessages id="groupPermissions.select.tags" />}
                                            tagsSelected={getActionsByModuleId(id)}
                                            tagsList={actions}
                                            updateActions={updateActions} />
                                        <Divider className={classes.divider} />
                                    </Grid>
                                )
                            }
                        <Grid item md={12} xs={12} sm={12} container justify="flex-end">
                                <Button
                                    disabled={loadingSubmit}
                                    size="large"
                                    variant="contained"
                                    color="primary"
                                    onClick={handleSaveActions}>
                                    {loadingSubmit && <CircularProgress size={14} />}
                                    <IntlMessages id="groupPermissions.permissions.submit" />
                                </Button>
                            </Grid>
                        </>
                    }
                </Grid>
            </Paper>}
    </Grid>
}