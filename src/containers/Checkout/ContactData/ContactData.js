import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/input/input';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name',
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name',
                },
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code',
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country',
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your e-mail',
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [{
                        value: 'fastest', 
                        displayValue: 'Fastest'
                    },
                    {
                        value: 'cheapest',
                        displayValue: 'Cheapest'
                    }]
                },
                value: ''
            },
        },
        loading: false,
    }

    orderHandler = (event) => {
        event.preventDefault();

        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: this.state.orderForm,
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order).then((resp) => {
            this.setState({loading: false});
            this.props.history.push('/');

        }).catch((err) => {
            this.setState({loading: false});
        });
    }

    inputChangedHandler = (event, inputIdentifier) => {
        console.log('event', event.target.value);
        const updatedForm = {...this.state.orderForm};
    }

    render() {
        const formElementArray = [];
        for(let key in this.state.orderForm) {
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = (
            <form>
                {
                    formElementArray.map((element) => {
                        return <Input
                                    key={element.id} 
                                    elementType={element.config.elementType} 
                                    elementConfig={element.config.elementConfig}
                                    value={element.config.elementValue}
                                    changed={(event) => this.inputChangedHandler(event, element.id)}
                                />
                    })
                }
                <Button buttonType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        );
        if(this.state.loading) {
            form = <Spinner/> 
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {
                    form
                }
            </div>
        )
    }
}

export default ContactData;