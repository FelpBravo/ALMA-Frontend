import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  tableActionButtonWrapper: {
    height: 25,
    width: 25,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#ffc10740",
    margin: "0px 2px",
    borderRadius: 4,
  },
}));

const TableActionButtonCree = ({ materialIcon }) => {
  const classes = useStyles();

  return <div className={classes.tableActionButtonWrapper}>{materialIcon}</div>;
};

export default TableActionButtonCree;