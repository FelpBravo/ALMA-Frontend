import { Grid, makeStyles } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import clsx from 'clsx';
import moment from 'moment';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { startNotificationsViewedLoading } from 'actions/notifications';
import IntlMessages from 'util/IntlMessages';

const useStyles = makeStyles(theme => ({
  avatar: {
    backgroundColor: "#e1f0ff"
  },
  boldText: {
    fontWeight: 600
  },
  normalText: {
    fontWeight: 400
  },
  media: {
    display:'flex',
    alignItems: 'center',
    cursor: 'pointer',
    "&:hover": {
      background: "#f4f5f7",
    },
  },
}));

const NotificationItem = ({ notification }) => {
  const { id, icon = "info_outlined", values = {}, messageId, createdAt, viewed } = notification;
  const classes = useStyles();
  const dispatch = useDispatch()
  const { authUser } = useSelector(state => state.auth);
  const { data } = useSelector(state => state.notifications);

  const handleChangeState = () => {
    const newState = data.map(e => e.id !== id ? e : {
      ...e,
      viewed: true,
    })
    dispatch(startNotificationsViewedLoading({ authUser, id, newState }));
  }

  return (
    <li onClick={handleChangeState} className={clsx(classes.media, "media")}>
      <Icon className="mr-2" color="primary">
          {icon}
        </Icon>
      <div className="media-body align-self-center">
        <p className={clsx(!viewed ? classes.boldText : classes.normalText, "sub-heading mb-0")}>
          <IntlMessages id={messageId} values={values} />
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
