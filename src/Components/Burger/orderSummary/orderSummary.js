import React,{Component} from "react";
import Aux from "../../../hoc/AuxHoc/Hoc";
import Button from "../../UI/Button/Button"


class OrderSummary extends Component{
  componentDidUpdate(){
    console.log("ordersummer[] did update")
  }

  render(){
  const ingredientsSummary=Object.keys(this.props.ingredients)
  .map(igKeys=>{
      return (
         <li key={igKeys}><span style={{textTransform:"capitalize"}}>{igKeys}</span>:{this.props.ingredients[igKeys]} 
         </li>);
  });
  
    return(
      <Aux>
      <p>Your Order</p>
      <p>your delicious Burger has following ingredients : </p>
      <ul>{ingredientsSummary}</ul>  
      <p><strong>Total Price {this.props.price.toFixed(2)}</strong></p>
      <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button> 
      <Button btnType="Success" clicked={this.props.purchaseContinued}> CONTINUE</Button>     
     
</Aux>  
    );
  }
} 

export default OrderSummary;