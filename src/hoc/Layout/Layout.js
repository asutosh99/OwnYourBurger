import React, { Component } from 'react';
import Aux from '../AuxHoc/Hoc';
import {connect} from 'react-redux'
import classes from './Layout.module.css';
import Toolbar from '../../Components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../Components/Navigation/SideDrawer/SideDrawer'

class Layout extends Component {
    state={
        showDrawer:false
    }

    SideDrawerOpenHandler=()=>{
        this.setState({showDrawer:true});
    }

    SideDrawerCloseHandler=()=>{
        this.setState({showDrawer:false});
    }
    SideDrawerToggleHandler=()=>{
        this.setState((prevState)=>{
                return {showDrawer:!prevState.showDrawer}
        });
    }
    
    sideDrawerToggleHandler = () => {
        this.setState( ( prevState ) => {
            return { showDrawer: !prevState.showDrawer };
        } );
    }
    render(){
        return(
            <Aux>
                <Toolbar 
                 isAuth={this.props.isAuthenticated}
                drawerToggleClicked={this.sideDrawerToggleHandler}/>
                <SideDrawer
                 isAuth={this.props.isAuthenticated}
                open={this.state.showDrawer}
                closed={this.SideDrawerCloseHandler}/>
                <main className={classes.Contain}>
                    {this.props.children}
                    
                </main>
            </Aux>
        );
    }
}
const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

export default connect( mapStateToProps )( Layout );