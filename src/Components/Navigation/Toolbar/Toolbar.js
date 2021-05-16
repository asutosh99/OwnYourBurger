import React from 'react';
import Logo from '../../Logo/Logo';
import classes from './Toolbar.module.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggler from '../SideDrawer/DrawToggler/DrawToggler'
const  toolbar = (props)=> (
    <header className={classes.Toolbar}>
         <DrawerToggler clicked={props.drawerToggleClicked} />
            
            <div className={classes.Logo}>
            <Logo/>
            </div>
            
            <nav className={classes.DeskTopOnly}>
                <NavigationItems isAuthenticated={props.isAuth}/>
            </nav>
    </header>
);

 export default toolbar;