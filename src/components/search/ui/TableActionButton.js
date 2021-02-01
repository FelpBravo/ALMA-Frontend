import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  tableActionButtonWrapper: {
    height: 25,
    width: 25,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#E1F0FF",
    margin: "0px 2px",
    borderRadius: 4,
  },
}));

const TableActionButton = ({ materialIcon }) => {
  const classes = useStyles();

  return <div className={classes.tableActionButtonWrapper}>{materialIcon}</div>;
};

export default TableActionButton;