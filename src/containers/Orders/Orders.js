import React, { Component } from 'react'
import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import withErrorhandler from '../../hoc/withErrorHandler/withErrorhandler';

class Orders extends Component {
    
    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('/orders.json')
            .then(res => {
                const fetchOrders = [];
                for(let key in res.data) {
                    fetchOrders.push({
                        ...res.data[key],
                        id : key
                    });
                }
                this.setState({orders: fetchOrders, loading: false});
            })
            .catch(err => {
                this.setState({loading: false})
            })
    }
    
    render() {
        return (
            <div>
                {this.state.orders.map( order=> 
                    <Order 
                        key={order.id}
                        ingredients={order.ingredients}
                        price = {order.price} /> )}
            </div>
        )
    }
}

export default withErrorhandler(Orders, axios);
