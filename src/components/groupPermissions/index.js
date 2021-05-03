import { Divider, FormControl, InputLabel, makeStyles, MenuItem, Button, Select } from '@material-ui/core'
import Tags from './tags'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { actionsModuleSetValueField, startGetPolicies, startGetProfiles, startPermissionsModuleLoading, startGetActionsByModuleByPolicy, startSaveActionsModuleByPolicy } from 'actions/permissions';
import { get, isEmpty } from 'lodash-es';

const useStyles = makeStyles(theme => ({
    divider: {
        margin: theme.spacing(3, 0),
    },
}));

export default function GroupPermissions() {
    const dispatch = useDispatch();
    const { authUser } = useSelector(state => state.auth);
    const { actionsModule, profiles, policies,  fields } = useSelector(state => state.modulePermissions);
    const classes = useStyles();
    const [actionsModuleList, setActionsModuleList] = useState([])
    const profileIdSelected = get(fields.find(({name}) => name === "profile"),'value', null)


    const geyPolicyId = () => {
        const profileName = profiles.find(({ id }) => id === profileIdSelected)?.name
        const matchPolicy = policies.find(({ name }) => name.replace("POLITIC_", "") === profileName)
        const policyId = get(matchPolicy, 'id')
        return policyId
    }
    
    console.log("profileIdSelected", profileIdSelected)
    useEffect(() => {
        dispatch(startGetProfiles(authUser))
        dispatch(startGetPolicies(authUser))
        dispatch(startPermissionsModuleLoading(authUser))
    }, [])

    useEffect(() => {
        if (profileIdSelected){
            const policyId = geyPolicyId()
            dispatch(startGetActionsByModuleByPolicy({ authUser, policyId }, setActionsModuleList))
        }

    }, [profileIdSelected])



    const handleSaveActions = () => {
        const policyId = geyPolicyId()
        dispatch(startSaveActionsModuleByPolicy({ authUser, policyId, data: actionsModuleList}))

    }

    const handleOnChange = ({ target }) => {
        const { name, value } = target;
        dispatch(actionsModuleSetValueField(name, value));

    }
    const updateActions = (id, actions) => {
        if(actions){
            const newArray = actionsModuleList.filter(e => e.id !== id)
            newArray.push({
                id,
                actions
            })
            setActionsModuleList(newArray)
        }

    }
    
    const getActionsByModuleId = id => get(actionsModuleList.find((e) => e.id === id),'actions', [])

    return <>
        <div className="jr-card">
            <h3>Perfiles</h3>
            <FormControl variant="outlined">
                <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    name="profile"
                    onChange={handleOnChange}
                >
                    {
                        profiles && profiles.map(({ id, name }) => <MenuItem key={id} value={id}>{name}</MenuItem>)
                    }
                </Select>
            </FormControl>
        </div>
        <div className="jr-card">
            {
                actionsModule && actionsModule.map(({ id, name, actions }, index) => <div key={id}>
                    <h3>{name}</h3>
                    <Tags
                        moduleId={id}
                        name="Seleccionar etiquetas"
                        tagsSelected={getActionsByModuleId(id)}
                        tagsList={actions}
                        updateActions={updateActions} />
                    {index + 1 !== actionsModule.length && <Divider className={classes.divider} />}
                </div>
                )
            }

            <Button onClick={handleSaveActions}>Guardar</Button>
        </div>
    </>
}