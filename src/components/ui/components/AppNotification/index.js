import { CircularProgress, Grid } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { startNotificationsLoading } from 'actions/notifications';
import CustomScrollbars from 'util/CustomScrollbars';

import { notifications } from './data';
import NotificationItem from './NotificationItem';

const SIZE = 5;

const AppNotification = ({ isOpen = false }) => {
  const dispatch = useDispatch();
  const { authUser } = useSelector(state => state.auth);
  const { currentPage, totalItems, data } = useSelector(state => state.notifications);
  const totalPages = Math.ceil(totalItems / SIZE);

  const loader = useRef(null);
  const [page, setPage] = useState(currentPage)
  const isFinishLoad = totalPages === 0 ? false : totalPages === page ? true : false

  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting) {
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
    if(page > 0)
      dispatch(startNotificationsLoading({ authUser, page, size: SIZE}))
  }, [authUser,page])
  console.log("Termino", isFinishLoad)
  return (
    <CustomScrollbars className="messages-list scrollbar" style={{ height: 380 }}>
      <ul className="list-unstyled">
        {data.map((notification, index) => <NotificationItem key={index} notification={notification} />)
        }
        {
        !isFinishLoad &&
        <Grid container alignItems="center" justify="center" ref={loader}>
          <CircularProgress size={30} thickness={7} />
        </Grid>
        }
      </ul>
    </CustomScrollbars>
  )
};

export default AppNotification;

