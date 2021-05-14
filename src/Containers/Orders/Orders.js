import {React,Component} from 'react'
import {connect} from 'react-redux'
import Order from '../../Components/Order/Order';
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler'
import * as actions from '../../Store/action/index'
import Spinner from '../../Components/UI/Spinner/Spinner'
class Orders extends Component{
    componentDidMount () {

        this.props.onFetchOrders();
    }

    // componentDidMount() {
    //     axios.get('/orders.json')
    //         .then(res => {
    //             const fetchedOrders = [];
    //             for (let key in res.data) {
    //                 fetchedOrders.push({
    //                     ...res.data[key],
    //                     id: key
    //                 });
    //             }
    //             this.setState({loading: false, orders: fetchedOrders});
    //         })
    //         .catch(err => {
    //             this.setState({loading: false});
    //         });
    // }
    render(){
        let orders = <Spinner />;
        if ( !this.props.loading ) {
            console.log(orders);
            orders = this.props.orders.map( order => (
                <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price} />
            ) )
        }
        return(
            <div>
               {orders}
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch( actions.fetchOrders() )
    };
};
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios)) ;