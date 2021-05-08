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
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../Components/Order/checkOutSummary/checkOutsummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients: null,
        price: 0
    }

    componentWillMount () {
        const query = new URLSearchParams( this.props.location.search );
        const ingredients = {};
        let price = 0;
        for ( let param of query.entries() ) {
            // ['salad', '1']
            if (param[0] === 'price') {
                price = param[1];
            } else {
                ingredients[param[0]] = +param[1];
            }
        }
        this.setState( { ingredients: ingredients, totalPrice: price } );
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace( '/checkout/contact-data' );
    }

    render () {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler} />
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props} />)} />
            </div>
        );
    }
}

export default Checkout;