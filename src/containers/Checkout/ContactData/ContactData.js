import React, { Component } from 'react'
import './ContactData.css'
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-orders';

export default class ContactData extends Component {
    
    state={
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false,
    }

    orderHandler = (event) => {
        event.preventDefault();
        //console.log(this.props);
        this.setState({loading: true})
        const order={
            ingredients : this.props.ingredients,
            price: this.props.price,
            customer: {
                name: "Aniket Negi",
                address: {
                    street: "teststreet",
                    zipCode: "201014",
                    country: "India"
                },
                email: "testemail@test.com"
            } ,
            deliverymethod: "fastest"
        }
        axios.post('/orders.json', order)
            .then(response => {
                console.log(response);
                this.setState({loading: false});
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({loading: false});
            });
    }
    
    render() {
        let form = (<form>
                        <input 
                            className="Input" 
                            type="text" 
                            name="name" 
                            placeholder="Your Name" />
                        <input 
                            className="Input" 
                            type="text" 
                            name="email" 
                            placeholder="Your Mail" />
                        <input 
                            className="Input" 
                            type="text" 
                            name="street" 
                            placeholder="Street" />
                        <input 
                            className="Input" 
                            type="text" 
                            name="postal" 
                            placeholder="Postal Code" />
            
                        <Button 
                            className="Input" 
                            btnType="Success" 
                            clicked={this.orderHandler} > Order</Button>
                    </form>);
                    
        if(this.state.loading){
            form = <Spinner/>;
        }
        return (
            <div className="ContactData">
                <h4>Enter your Contact data</h4>
                {form}
            </div>
        )
    }
}
