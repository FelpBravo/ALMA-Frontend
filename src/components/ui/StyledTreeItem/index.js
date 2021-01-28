import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeItem from '@material-ui/lab/TreeItem';
import Typography from '@material-ui/core/Typography';

const useTreeItemStyles = makeStyles((theme) => ({
   root: {
        color: theme.palette.text.secondary,
        '&:hover > $content': {
            backgroundColor: '#181824',
            color: '#FFFFFF'
        },
        '&:focus > $content, &$selected > $content': {
            backgroundColor: '#181824', //`var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
            color: '#FFFFFF',
        },
        '&:focus > $content $label, &:hover > $content $label, &$selected > $content $label': {
            backgroundColor: 'transparent',
            color: '#FFFFFF'
        },
    },

    content: {
        color: theme.palette.text.secondary,
        borderTopRightRadius: theme.spacing(2),
        borderBottomRightRadius: theme.spacing(2),
        paddingRight: theme.spacing(1),
        fontWeight: theme.typography.fontWeightMedium,
        '$expanded > &': {
            fontWeight: theme.typography.fontWeightRegular,
        },
    },
    group: {
        marginLeft: 0,
        '& $content': {
            paddingLeft: theme.spacing(2),
        },
    },
    expanded: {},
    selected: {},
    label: {
        fontWeight: 'inherit',
        color: 'inherit',
    },
    labelRoot: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0.5, 0),
    },
    labelIcon: {
        marginRight: theme.spacing(2),
        fontSize: 15,
        color: '#a1a1a1'
    },
    labelText: {
        fontWeight: 'inherit',
        flexGrow: 1,
        color: '#a1a1a1',
        padding: theme.spacing(0.5, 0),
        fontFamily: 'Poppins'
    },
}));

const StyledTreeItem = (props) => {

    const classes = useTreeItemStyles();

    const { labelText, labelIcon: LabelIcon, labelInfo, color, bgColor, ...other } = props;

    return (
        <TreeItem
            label={
                <div className={classes.labelRoot}>
                    <LabelIcon color="inherit" className={classes.labelIcon} />
                    <Typography variant="body2" className={classes.labelText}>
                        {labelText}
                    </Typography>
                    <Typography variant="caption" color="inherit">
                        {labelInfo}
                    </Typography>
                </div>
            }
            style={{
                '--tree-view-color': color,
                '--tree-view-bg-color': bgColor,
            }}
            classes={{
                root: classes.root,
                content: classes.content,
                expanded: classes.expanded,
                selected: classes.selected,
                group: classes.group,
                label: classes.label,
            }}
            {...other}
        />
    );
}

export default StyledTreeItem;
