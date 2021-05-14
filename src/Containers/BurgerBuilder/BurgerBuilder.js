import React,{Component} from 'react';
import Aux from '../../hoc/AuxHoc/Hoc';
import Burger from '../../Components/Burger/Burger';
import BuildControls from "../../Components/Burger/BuildControls/BuildControls"
import Modal from "../../Components/UI/Modal/Modal"
import OrderSummary from "../../Components/Burger/orderSummary/orderSummary"
import axios from "../../axios-order.js"
import Spinner from '../../Components/UI/Spinner/Spinner' 
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import * as BurgerBuilderActions from '../../Store/action/index'
import {connect} from 'react-redux'


class BurgerBuilder extends Component{
    state={
     
    // totalPrice:4,
    // purchasable:false,
    purchasing: false,
  
}

componentDidMount(){
   console.log(this.props);
   this.props.onInItIngredients();
    // axios.get('https://burger2-876e0-default-rtdb.asia-southeast1.firebasedatabase.app/ingredients.json')
    // .then(response=> 
    //     this.setState({ingredients:response.data}))
    // .catch(error=>this.setState({error:true}));
}
// addIngredientHandler=(type )=>{
    
//     const oldCount=this.state.ingredients[type];
//     const updatedCount=oldCount+1;
//     const updatedIngredient={
//         ...this.state.ingredients
//     };
//     updatedIngredient[type]=updatedCount;

//     const priceAddition=INGREDIENT_PRICE[type];
//     const oldPrice=this.state.totalPrice;
//     const updatedPrice=oldPrice+priceAddition;
//     this.setState({totalPrice:updatedPrice ,ingredients:updatedIngredient});
//     this.updatePurchaseState(updatedIngredient);
// }
// removeIngredientHandler=(type )=>{
    
//     const oldCount=this.state.ingredients[type];
//     const updatedCount=oldCount-1;
//     if(oldCount<=0){
//         return;
//     }
//     const updatedIngredient={
//         ...this.state.ingredients
//     };
//     updatedIngredient[type]=updatedCount;

//     const priceReduction=INGREDIENT_PRICE[type];
//     const oldPrice=this.state.totalPrice;
//     const updatedPrice=oldPrice-priceReduction;
//     this.setState({totalPrice:updatedPrice ,ingredients:updatedIngredient});
//     this.updatePurchaseState(updatedIngredient);
// }
updatePurchaseState (ingredients) {
    const sum = Object.keys( ingredients )
        .map( igKey => {
            return ingredients[igKey];
        } )
        .reduce( ( sum, el ) => {
            return sum + el;
        }, 0 );
    return  sum > 0 ;
}
purchaseHandler = () => {
    this.setState({purchasing: true});
}
purchaseCanhelHandler=()=>{
    this.setState({purchasing:false});
}
purchaseContinueHandler = ()=>{
    this.props.onInItpurchased();
this.props.history.push('/checkout');
}

    render(){
        const disableInfo={
            ...this.props.ings
        };
        for(let key  in disableInfo){
            disableInfo[key]=disableInfo[key]<=0;
        }

        let orderSummary =null;
     
let burger=this.props.error?'something error hanppened':<Spinner/>;
if(this.props.ings){
    burger=(
        <Aux>
                <Burger ingredients={this.props.ings}/>
                <BuildControls 
                addIngredient={this.props.onIngredientAdded}
                removeIngredient={this.props.onIngredientRemoved}
                price={this.props.price}
                disable={disableInfo}
                ordered={this.purchaseHandler}
                purchasable={this.updatePurchaseState(this.props.ings)}/>
        </Aux>
    );
    orderSummary=<OrderSummary 
        ingredients={this.props.ings}
        price={this.props.price}
        purchaseCancelled={this.purchaseCanhelHandler}
        purchaseContinued={this.purchaseContinueHandler}/>

}

// if(this.state.loading){
//     orderSummary=<Spinner/>
// }
        return (
            <Aux>
                <Modal show={this.state.purchasing } modelClosed={this.purchaseCanhelHandler}>
                    {orderSummary}
                    </Modal>
                {burger}
            </Aux>    
        )
                
    }
}
const mapStateToProps= state =>{
return{
    ings:state.burgerBuilder.ingredients,
    price:state.burgerBuilder.totalPrice,
    error:state.burgerBuilder.error
};
}
const mapDispatchToProps=dispatch=>{
    return{
        onIngredientAdded:(ingName)=>dispatch(BurgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved:(ingName)=>dispatch(BurgerBuilderActions.removeIngredient(ingName)),
   onInItIngredients:()=>dispatch(BurgerBuilderActions.initIngredients()),
   onInItpurchased:()=>dispatch(BurgerBuilderActions.purchaseInit())
    }
 

}

export default connect(mapStateToProps,mapDispatchToProps)( withErrorHandler(BurgerBuilder,axios)) ;