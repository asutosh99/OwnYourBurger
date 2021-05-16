import React, { Component } from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';
import {Route,Switch,withRouter,Redirect} from 'react-router-dom'
import Logout from './Containers/Auth/Logout/Logout'
import { connect } from 'react-redux';
import * as actions from './Store/action/index'
import asyncComponent from './hoc/asyncComponent/asyncComponent';

// geting data asynlly 
// import Orders from './Containers/Orders/Orders'
// import Auth from './Containers/Auth/auth'
// import CheckOut from './Containers/cheackOut/checkOut'

const asyncCheckout = asyncComponent(() => {
  return import('./Containers/cheackOut/checkOut');
});

const asyncOrders = asyncComponent(() => {
  return import('./Containers/Orders/Orders');
});

const asyncAuth = asyncComponent(() => {
  return import('./Containers/Auth/auth');
});

class App extends Component {

  componentDidMount () {
    this.props.onTryAutoSignup();
  }
  render(){

    let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );

    if ( this.props.isAuthenticated ) {
      routes = (
        <Switch>
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return(
<div className="App">
     <Layout> 
       {routes}
     </Layout>

        </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch( actions.authCheckState() )
  };
};
export default  withRouter(connect(mapStateToProps,mapDispatchToProps ) (App))  ;


// <Switch>
//          <Route path='/orders' component={Orders}/>
//          <Route path='/auth' component={Auth}/>
//        <Route path='/checkout' component={CheckOut}/>
//        <Route path='/logout' component={Logout}/>
//        <Route path='/'exact component={BurgerBuilder}/>
//        </Switch>
   
