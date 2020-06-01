import React from 'react';
import classes from './DrawerToggler.css';

const drawerToggler = (props) => (
  <div
    className={classes.DrawerToggle}
    onClick={props.clicked}
  >
    <div></div>
    <div></div>
    <div></div>
  </div>

);

export default drawerToggler;