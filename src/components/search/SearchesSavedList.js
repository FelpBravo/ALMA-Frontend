import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Skeleton from '@material-ui/lab/Skeleton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useSelector, useDispatch } from 'react-redux'
import { savedSearches } from 'actions/search';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        width: 300,
    },
    fullWidth: {
        width: '100%'
    },
    typography: {
        padding: theme.spacing(2),
    },
}));

export default function SearchesSavedList({ anchorEl, onClose }) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const open = Boolean(anchorEl);
    const history = useHistory();

    const savedSearchesList = useSelector(state => state.savedSearches);
    const loading = savedSearchesList?.length === 0
    const { authUser } = useSelector(state => state.auth);

    useEffect(() => {
        if (loading && open) dispatch(savedSearches(authUser))
    }, [loading, open])

    const handleGetSavedSearch = id => {
        history.push(`/search/p1/${id}`)
    }
    
    return (
        <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={onClose}
            //className={classes.root}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
           
        >
            {
                loading
                    ? <List component="nav" aria-label="secondary mailbox folders">
                        <ListItem button disabled>
                            <Skeleton                 variant="text" className={classes.fullWidth} />
                        </ListItem>
                        <ListItem button disabled>
                            <Skeleton className={classes.fullWidth} />
                        </ListItem>
                        <ListItem button disabled>
                            <Skeleton className={classes.fullWidth} />
                        </ListItem>
                    </List>
                    : <List component="nav" aria-label="secondary mailbox folders">
                        {
                            savedSearchesList?.slice(savedSearchesList.length-3, savedSearchesList.length ).reverse().map(({ name, id }) => 
                            <ListItem onClick={() => handleGetSavedSearch(id)} button key={id}>
                                <ListItemText primary={name} disableTypography={true} style={{color:'#FFA800'}}/>
                            </ListItem>)
                        }
                    </List>

            }
        </Popover>
    );
}
