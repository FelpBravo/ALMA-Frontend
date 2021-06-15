import React from 'react';
import {List} from '@material-ui/core';
import NavMenuItem from "./NavMenuItem";
import NavSection from "./NavSection";
import NavCollapse from "./NavCollapse";

const Navigation = props => {
  const {menuItems, privileges } = props;

  return (
    <List component="nav" disablePadding className='side-nav-menu'>
      {
        menuItems.map((item, index) => {
          switch (item.type) {
            case 'section' :
              return <NavSection {...item} key={index} privileges={privileges}/>;
            case 'collapse' :
              return <NavCollapse {...item} key={index}/>;
            case 'item' :
              return <NavMenuItem {...item} key={index}/>;
              
          }
        })
      }
    </List>
  )
};

export default Navigation;