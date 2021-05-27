import React, { useEffect, useRef, useState } from 'react';

import NotificationItem from './NotificationItem';
import { notifications } from './data';
import CustomScrollbars from 'util/CustomScrollbars';
import { CircularProgress, Grid } from '@material-ui/core';

const AppNotification = () => {
  const loader = useRef(null);
  const [page, setPage] = useState(0)
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
    const newList = data.concat(notifications);
    setTimeout(() => setData([...newList]), 2000)
  }, [page])

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

