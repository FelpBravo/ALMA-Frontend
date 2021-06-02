import React from 'react';
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button';
import { Grid, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import moment from 'moment';
import IntlMessages from 'util/IntlMessages';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles(theme => ({
  avatar:{
    backgroundColor: "#e1f0ff"
  },
  boldText:{
    fontWeight: 600
  },
  normalText: {
    fontWeight: 400
  },
  media: {
    cursor: 'pointer',
    "&:hover": {
      background: "#f4f5f7",
    },
  },
}));

const NotificationItem = ({ notification }) => {
  const { icon = "info_outlined", values = {}, messageId, createdAt, viewed } = notification;
  const classes = useStyles();

  return (
    <li className={clsx(classes.media, "media")}>
      <Avatar variant="rounded" className={clsx(classes.avatar, "mr-2")}>
        <Icon color="primary">
          {icon}
          </Icon>
        </Avatar>
      <div className="media-body align-self-center">
        <p className={clsx(!viewed ? classes.boldText : classes.normalText, "sub-heading mb-0")}>
          <IntlMessages id={messageId} values={values}/>
        </p>
        <Grid container alignItems="center">
          <i className={`zmdi ${'zmdi-calendar-alt text-info'} zmdi-hc-fw`} />
          <span className="meta-date">
            <small className={!viewed ? classes.boldText : classes.normalText}>{moment(createdAt).fromNow()}</small>
          </span>
        </Grid>
      </div>
    </li>
  );
};

export default NotificationItem;
