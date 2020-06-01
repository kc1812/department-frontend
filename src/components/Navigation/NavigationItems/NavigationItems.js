import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {
    const  onClickHandler = () => {
        if(props.type==='SideDrawer') {
            props.drawerToggle();
        }
    }
     return (
        <ul className={classes.NavigationItems} onClick={onClickHandler}>
            <NavigationItem link="/home" exact >Home</NavigationItem>
            <NavigationItem link="/sent">Request Sent</NavigationItem>
            <NavigationItem link="/pending">All Pending</NavigationItem>
            <NavigationItem link="/approval">Pending</NavigationItem>
            <NavigationItem link="/approved">Approved</NavigationItem>
            <NavigationItem link="/rejected">Rejected</NavigationItem>
            <NavigationItem link="/logout">Logout</NavigationItem>
        </ul>
    )
  

};

export default navigationItems;