import React from 'react';
import classes from './Logo.module.css';
import BurggerLogo from '../../assets/images/burger-logo.png';

const Logo=()=>(
    <div className={classes.Logo}>
        <img src={BurggerLogo} alt="burgerimage"/>
    </div>
)
export default Logo;