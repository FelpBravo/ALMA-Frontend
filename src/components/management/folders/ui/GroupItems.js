import { Chip } from "@material-ui/core";
import GroupIcon from '@material-ui/icons/Group';
import { makeStyles } from "@material-ui/styles";
import React from 'react';

const useStyles = makeStyles((theme) => ({
    rootChips: {
        display: 'flex',
        marginTop: theme.spacing(1),
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
}));

const GroupItems = ({ groupSelected, setValue }) =>{
    const classes = useStyles();
    return( <div className={classes.rootChips}>
        {groupSelected?.length > 0 && groupSelected.map(name => <Chip
            size="small"
            variant="outlined"
            key={name}
            icon={<GroupIcon style={{ marginLeft: 5 }} />}
            onDelete={() => setValue('groups', groupSelected.filter(e => e !== name))}
            label={name}
            color="primary" />)}
    </div>
)}
export default GroupItems;