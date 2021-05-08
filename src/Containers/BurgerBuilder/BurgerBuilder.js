import React,{Component} from 'react';
import Aux from '../../hoc/AuxHoc/Hoc';
import Burger from '../../Components/Burger/Burger';
import BuildControls from "../../Components/Burger/BuildControls/BuildControls"
import Modal from "../../Components/UI/Modal/Modal"
import OrderSummary from "../../Components/Burger/orderSummary/orderSummary"
import axios from "../../axios-order.js"
import Spinner from '../../Components/UI/Spinner/Spinner' 
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
const  INGREDIENT_PRICE={
    salad:10,
    bacon:11.25,
    cheese:5.25,
    meat:30.56
 
}

class BurgerBuilder extends Component{
    state={
        ingredients:null,
    totalPrice:4,
    purchasable:false,
    purchasing: false,
    loading:false,
    error:null
}

componentDidMount(){
   // console.log(this.props)
    axios.get('https://burger2-876e0-default-rtdb.asia-southeast1.firebasedatabase.app/ingredients.json')
    .then(response=> 
        this.setState({ingredients:response.data}))
    .catch(error=>this.setState({error:true}));
}
addIngredientHandler=(type )=>{
    
    const oldCount=this.state.ingredients[type];
    const updatedCount=oldCount+1;
    const updatedIngredient={
        ...this.state.ingredients
    };
    updatedIngredient[type]=updatedCount;

    const priceAddition=INGREDIENT_PRICE[type];
    const oldPrice=this.state.totalPrice;
    const updatedPrice=oldPrice+priceAddition;
    this.setState({totalPrice:updatedPrice ,ingredients:updatedIngredient});
    this.updatePurchaseState(updatedIngredient);
}
removeIngredientHandler=(type )=>{
    
    const oldCount=this.state.ingredients[type];
    const updatedCount=oldCount-1;
    if(oldCount<=0){
        return;
    }
    const updatedIngredient={
        ...this.state.ingredients
    };
    updatedIngredient[type]=updatedCount;

    const priceReduction=INGREDIENT_PRICE[type];
    const oldPrice=this.state.totalPrice;
    const updatedPrice=oldPrice-priceReduction;
    this.setState({totalPrice:updatedPrice ,ingredients:updatedIngredient});
    this.updatePurchaseState(updatedIngredient);
}
updatePurchaseState (ingredients) {
    const sum = Object.keys( ingredients )
        .map( igKey => {
            return ingredients[igKey];
        } )
        .reduce( ( sum, el ) => {
            return sum + el;
        }, 0 );
    this.setState( { purchasable: sum > 0 } );
}
purchaseHandler = () => {
    this.setState({purchasing: true});
}
purchaseCanhelHandler=()=>{
    this.setState({purchasing:false});
}
purchaseContinueHandler = ()=>{
// this.setState({loading:true});
//     const order ={
//         ingredients:this.state.ingredients,
//         totalPrice:this.state.totalPrice,
//         customer:{
//             name:'asutosh',
//             address:{
//                 street:'ramakrisna nagar',
//                 zipcode:"760001",
//                 country:'india'
//             },
//             email:'asutosh99@gmail.com'
//         },
//         delivaryMethod:'fast'
//     }
//     axios.post('/orders.json',order)
//     .then(response=>this.setState({loading:false ,purchasing:false})
//     ).catch(error=>this.setState({loading:false,purchasing:false})
//     );
//this.props.history.push('/checkout')
const queryParams = [];
for (let i in this.state.ingredients) {
    queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
}
queryParams.push('price='+this.state.totalPrice);
const queryString = queryParams.join('&');
this.props.history.push({
    pathname: '/checkout',
    search: '?' + queryString
});
}

    render(){
        const disableInfo={
            ...this.state.ingredients
        };
        for(let key  in disableInfo){
            disableInfo[key]=disableInfo[key]<=0;
        }

        let orderSummary =null;
     
let burger=this.state.error?'something error hanppened': <Spinner/>;
if(this.state.ingredients){
    burger=(
        <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                addIngredient={this.addIngredientHandler}
                removeIngredient={this.removeIngredientHandler}
                price={this.state.totalPrice}
                disable={disableInfo}
                ordered={this.purchaseHandler}
                purchasable={this.state.purchasable}/>
        </Aux>
    );
    orderSummary=<OrderSummary 
        ingredients={this.state.ingredients}
        price={this.state.totalPrice}
        purchaseCancelled={this.purchaseCanhelHandler}
        purchaseContinued={this.purchaseContinueHandler}/>

}

if(this.state.loading){
    orderSummary=<Spinner/>
}
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
export default withErrorHandler(BurgerBuilder,axios) ;