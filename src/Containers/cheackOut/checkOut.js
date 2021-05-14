// import {React,Component} from "react";
// import CheckoutSummary from '../../Components/Order/checkOutSummary/checkOutsummary'
// import ContactData from '../ContactData/ContactData'
// import {Route} from 'react-router-dom';

// class CheckOut extends Component{
//     state = {
//         ingredients: {
//             salad: 1,
//             meat: 1,
//             cheese: 1,
//             bacon: 1
//         }
//     }
//     componentDidMount() {
//         //getting the details of previous url
//         const query = new URLSearchParams(this.props.location.search);
//         const ingredients = {};
//         for (let param of query.entries()) {
//             // ['salad', '1']
//             ingredients[param[0]] = +param[1];
//         }
//         this.setState({ingredients: ingredients});
//     }

//     checkoutCancelledHandler = () => {
//         this.props.history.goBack();
//     }

//     checkoutContinuedHandler = () => {
//      this.props.history.replace( '/checkout/contact-data' );
//     }
//     render(){

//         return(
//                 <div>
//                     <CheckoutSummary 
//                     ingredients={this.state.ingredients}
//                     checkoutCancelled={this.checkoutCancelledHandler}
//                     checkoutCountinued={this.checkoutContinuedHandler}/>
//                     <Route 
//                     path={this.props.match.path + '/contact-data'} 
//                    component={ContactData} />
//                 </div>
//         );
//     }
// }

// export default CheckOut;

import React, { Component } from 'react';
import { Route ,Redirect  } from 'react-router-dom';

import CheckoutSummary from '../../Components/Order/checkOutSummary/checkOutsummary';
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux'
class Checkout extends Component {
    // state = {
    //     ingredients: null,
    //     price: 0
    // }

    // componentWillMount () {
    //     const query = new URLSearchParams( this.props.location.search );
    //     const ingredients = {};
    //     let price = 0;
    //     for ( let param of query.entries() ) {
    //         // ['salad', '1']
    //         if (param[0] === 'price') {
    //             price = param[1];
    //         } else {
    //             ingredients[param[0]] = +param[1];
    //         }
    //     }
    //     this.setState( { ingredients: ingredients, totalPrice: price } );
    // }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace( '/checkout/contact-data' );
    }

    render () {
        let summary=<Redirect to='/'/>
        if(this.props.ings){
            console.log('purchased'+this.props.purchased);
            const purchasedRedirect=this.props.purchased ? <Redirect to='/'/>:null
           
            summary=(
                <div>
                    {purchasedRedirect }
                     <CheckoutSummary
                    ingredients={this.props.ings}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler} />
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                   component={ContactData} />
                </div>
            )
        }
        return summary;
    }
}

const mapStateToProps=state=>{
    return{
        ings:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        purchased:state.order.purchased
    }
}
export default connect(mapStateToProps)( Checkout);