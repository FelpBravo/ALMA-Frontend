import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TreeItem from '@material-ui/lab/TreeItem';
import React from 'react';

const StyledTreeItem = (props) => {

    //const classes = useTreeItemStyles();

    const { labelText, labelIcon: LabelIcon, labelInfo, color, bgColor, ...other } = props;

    return (
        <TreeItem
            label={
                <div>
                    <Typography style={{ fontFamily: "Poppins", fontSize: '14px', fontWeight: 400, padding:"4px 30px 8px 0px" }}>
                        <LabelIcon style={{ fontSize: '14px', color:"#face02"}} className="mr-2" color="inherit"/>
                        {labelText}
                    </Typography>
                    <Typography>
                        {labelInfo}
                    </Typography>
                </div>
            }
           
            {...other}
        />
    );
}

export default StyledTreeItem;
