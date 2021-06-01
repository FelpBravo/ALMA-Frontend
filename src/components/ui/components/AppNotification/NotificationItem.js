import React from 'react';
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button';


const NotificationItem = ({notification}) => {
  const { icon, messageId, createdAt} = notification;
  return (
    <li className="media">
      <Avatar
        alt="https://via.placeholder.com/150x150"
        src="https://via.placeholder.com/150x150"
        className=" mr-2"
      />
      <div className="media-body align-self-center">
        <p className="sub-heading mb-0">{messageId}</p>
        <Button size="small" className="jr-btn jr-btn-xs mb-0"><i
          className={`zmdi ${'zmdi-card-giftcard text-info'} zmdi-hc-fw`} /></Button> <span className="meta-date"><small>{createdAt}</small></span>
      </div>
    </li>
  );
};

export default NotificationItem;
