import { FormControl, InputLabel, MenuItem, NativeSelect, Select } from '@material-ui/core'
import Tags from './tags'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { startPermissionsModuleLoading } from 'actions/permissions';


export default function GroupPermissions() {
    const dispatch = useDispatch();
    const { authUser } = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(startPermissionsModuleLoading(authUser))
       
    }, [])
    return <>
        <div className="jr-card">
            <h3>Perfiles</h3>
            <FormControl variant="outlined">
                <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value="admin"
                    onChange={() => null}
                >
                    <MenuItem value={"admin"}>Ver perfil administrador</MenuItem>

                </Select>
            </FormControl>
        </div>
        <div className="jr-card">
            <Tags />
        </div>
    </>
}