import React, { Component } from 'react';

import Button from '../../../Components/UI/Button/Button'
import classes from './ContactData.module.css'
import axios from '../../../axios-order';
import Spinner from '../../../Components/UI/Spinner/Spinner'

class ContactData extends Component{

    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading:false
    }


    orderHandler = ( event ) => {
        event.preventDefault();
        // this.setState({loading:true});
        //     const order ={
        //         ingredients:this.props.ingredients, 
        //         totalPrice:this.props.totalPrice,
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
        //     .then( response => {
        //                 this.setState( { loading: false } );
        //                this.props.history.push('/');
        //              } )
        //               .catch(error=>this.setState({loading:false})
        //     );
        // this.props.history.push('/checkout')



        this.setState( { loading: true } );
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Max Schwarzmüller',
                address: {
                    street: 'Teststreet 1',
                    zipCode: '41351',
                    country: 'Germany'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post( '/orders.json', order )
            .then( response => {
                this.setState( { loading: false } );
                this.props.history.push('/');
            } )
            .catch( error => {
                this.setState( { loading: false } );
            } );
    }
    render(){
        // console.log(this.props);
        let form = (
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
                <input className={classes.Input} type="email" name="email" placeholder="Your Mail" />
                <input className={classes.Input} type="text" name="street" placeholder="Street" />
                <input className={classes.Input} type="text" name="postal" placeholder="Postal Code" />
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        );
        if ( this.state.loading ) {
            form = <Spinner />;
        }
        return(
<div className={classes.ContactData}>
            <h1> Enter your contactData </h1>
            {form}
      </div>  
        );
    }
} 


export default ContactData;