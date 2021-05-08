import React from 'react';
import Button from '../../UI/Button/Button'
import Burger from "../../Burger/Burger"
import classes from './checkOutSummary.module.css'


 const checkOutSummary =(props)=>{
     
    return (
        <div className={classes.CheckoutSummary}>
            <h1>hope it teast well</h1>
            <div style ={{width: '100%', margin :'auto'}}>
                <Burger ingredients={props.ingredients}></Burger>
            </div>
            <Button btnType='Danger' 
           clicked={props.checkoutCancelled}> Cancel</Button>
            <Button btnType='Success'
           clicked={props.checkoutContinued}> Countinue</ Button>
           
        </div>
    );
 }

 export default checkOutSummary;