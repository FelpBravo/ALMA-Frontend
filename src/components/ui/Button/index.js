import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const CustomButton = withStyles((theme) => ({
    root: {
        fontFamily: "Poppins",
        fontWeight: 600,
        border: "none",
        boxShadow: "none",
        textTransform: "none",
    },
    containedPrimary: {
        backgroundColor: '#3699FF',
        color: "#FFF",
    },
    containedSecondary: {
        backgroundColor: '#E1F0FF',
        color: '#3699FF',
        '&:hover': {
            backgroundColor: '#E1F0FF',
        },
    },
}))(Button);

export default CustomButton;