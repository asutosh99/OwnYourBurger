import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";
const controls=[
    {label:"Salad" ,type:"salad"},
    {label:"Becon",type:"bacon"},
    {label:"Cheese" ,type:"cheese"},
    {label:"Meat" ,type:"meat"},
];

const BuildControls =(props) =>(
    
    <div className={classes.BuildControls}>
        <p>total price :<strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl=>(
            <BuildControl 
            key={ctrl.label} 
            label={ctrl.label}
            added={()=>props.addIngredient(ctrl.type)}
            removed={()=>props.removeIngredient(ctrl.type)}
            disable={props.disable[ctrl.type]}
            />
      )  )}
      < button className={classes.OrderButton}
     onClick={props.ordered}
      disabled={!props.purchasable}>Order Now</button>
      </div>
);
      export default BuildControls;
