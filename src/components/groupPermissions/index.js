import { Divider, FormControl, InputLabel, makeStyles, MenuItem, NativeSelect, Select } from '@material-ui/core'
import Tags from './tags'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { actionsModuleSetValueField, startGetPolicies, startGetProfiles, startPermissionsModuleLoading } from 'actions/permissions';
import { get } from 'lodash-es';

const useStyles = makeStyles(theme => ({
    divider: {
        margin: theme.spacing(3, 0),
    },
}));

const actionsModuleList = [
    {
        "id": 1,
        "actions": [
            1,
            2,
            3,
            6,
            7
        ]
    },
    {
        "id": 2,
        "actions": [
            1,
            2,
            3,
            6,
            7
        ]
    },
    {
        "id": 3,
        "actions": [
            1,
            2,
            3,
            6,
            7
        ]
    }
]

const actionsSelectedHC = [
    {
        "id": 1,
        "actions": [
            1,
            2,
            3,
            6,
            7
        ]
    },
    {
        "id": 2,
        "actions": [
            1,
            2,
            3,
        ]
    },
    {
        "id": 3,
        "actions": [
            1,
            2,
            3,
            6,
            7,
            8,
            9,
            10,
            11,
            12
        ]
    }
]

export default function GroupPermissions() {
    const dispatch = useDispatch();
    const { authUser } = useSelector(state => state.auth);
    const { actionsModule, profiles, fields } = useSelector(state => state.modulePermissions);
    const classes = useStyles();
    const [actionsModuleList, setActionsModuleList] = useState(actionsSelectedHC)
    console.log("actionsModuleList", actionsModuleList)
    useEffect(() => {
        dispatch(startGetProfiles(authUser))
        dispatch(startGetPolicies(authUser))
        dispatch(startPermissionsModuleLoading(authUser))
    }, [])

    const handleOnChange = ({ target }) => {
        const { name, value } = target;
        console.log("name", name, "value", value)
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


        </div>
    </>
}