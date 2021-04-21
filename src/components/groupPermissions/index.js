import { FormControl, InputLabel, MenuItem, NativeSelect, Select } from '@material-ui/core'
import Tags from './tags'
import { BootstrapInput } from 'components/ui/helpers/BootstrapInput'
import React from 'react'


export default function GroupPermissions() {
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