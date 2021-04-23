
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

const bgColor = "#E1F0FF";
const fontColor = "#3699FF";

const StyledChip = withStyles(theme => ({
    root: {
        margin: theme.spacing(0, 0.5),
        borderRadius: 4,
        backgroundColor: bgColor,
        color: fontColor,
        border: 'none',
        fontWeight: '400'
    },
}))(Chip);

export default StyledChip;