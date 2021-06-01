import React, { useEffect, useRef, useState } from 'react';

import NotificationItem from './NotificationItem';
import { notifications } from './data';
import CustomScrollbars from 'util/CustomScrollbars';
import { CircularProgress, Grid } from '@material-ui/core';
import { startNotificationsLoading } from 'actions/notifications';
import { useDispatch, useSelector } from 'react-redux';

const AppNotification = ({ isOpen = false }) => {
  const dispatch = useDispatch();
  const { authUser } = useSelector(state => state.auth);
  const { currentPage, totalItems, totalPages, data } = useSelector(state => state.notifications);


  const loader = useRef(null);
  const [page, setPage] = useState(currentPage)
  
  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting) {
      console.log("setPage", page + 1)
      setPage((page) => page + 1)
    }
  }

  useEffect(() => {
    if (isOpen) {
      const options = {
        root: null,
        rootMargin: "20px",
        threshold: 1.0
      };
      const observer = new IntersectionObserver(handleObserver, options);
      if (loader.current) {
        observer.observe(loader.current)
      }
    }
  }, [isOpen]);

  useEffect(() => {
    console.log("authUser", authUser, "page", page)
    if(page > 0)
      dispatch(startNotificationsLoading({authUser, page, size:5}))
    // const newList = data.concat(notifications);
    // setTimeout(() => setData([...newList]), 2000)
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

