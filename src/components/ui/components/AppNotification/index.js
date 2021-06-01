import React, { useEffect, useRef, useState } from 'react';

import NotificationItem from './NotificationItem';
import { notifications } from './data';
import CustomScrollbars from 'util/CustomScrollbars';
import { CircularProgress, Grid } from '@material-ui/core';
import { startNotificationsLoading } from 'actions/notifications';
import { useDispatch, useSelector } from 'react-redux';

const AppNotification = () => {
  const dispatch = useDispatch();
  const { authUser } = useSelector(state => state.auth);

  const loader = useRef(null);
  const [page, setPage] = useState(1)
  const [data, setData] = useState(notifications)
  
  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting) {
      setPage((page) => page + 1)
    }
  }

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0
    };
    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current) {
      observer.observe(loader.current)
    }

  }, []);

  useEffect(() => {
    dispatch(startNotificationsLoading({authUser, page, size:5}))
    const newList = data.concat(notifications);
    setTimeout(() => setData([...newList]), 2000)
  }, [authUser,page])

  return (
    <CustomScrollbars className="messages-list scrollbar" style={{ height: 380 }}>
      <ul className="list-unstyled">
        {data.map((notification, index) => <NotificationItem key={index} notification={notification} />)
        }
        <Grid container alignItems="center" justify="center" ref={loader}>
          <CircularProgress size={30} thickness={7} />
        </Grid>
      </ul>
    </CustomScrollbars>
  )
};

export default AppNotification;

