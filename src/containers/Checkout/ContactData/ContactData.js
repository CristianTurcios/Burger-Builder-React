import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/input/input';
import { connect } from 'react-redux'; 

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name',
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name',
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5,
                },
                valid: false,
                touched: false,
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country',
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your e-mail',
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
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
                value: 'fastest',
                valid: true,
            },
        },
        formIsValid: false,
        loading: false,
    }

    orderHandler = (event) => {
        event.preventDefault();

        this.setState({loading: true});
        const formData = {};
        for(let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }

        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData,
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order).then((resp) => {
            this.setState({loading: false});
            this.props.history.push('/');

        }).catch((err) => {
            this.setState({loading: false});
        });
    }

    checkValidity = (value, rules) => {
        let isValid = true;
        if (rules && 'required' in rules && rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules && 'minLength' in rules && rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules && 'maxLength' in rules && rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {...this.state.orderForm};
        const updatedFormElement = {...updatedOrderForm[inputIdentifier]};
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for(let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({
            orderForm: updatedOrderForm,
            formIsValid
        });

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
            <form onSubmit={this.orderHandler}>
                {
                    formElementArray.map((element) => {
                        return <Input
                                    key={element.id} 
                                    elementType={element.config.elementType} 
                                    elementConfig={element.config.elementConfig}
                                    value={element.config.elementValue}
                                    invalid={!element.config.valid}
                                    shouldValidated={element.config.validation}
                                    touched={element.config.touched}
                                    changed={(event) => this.inputChangedHandler(event, element.id)}
                                />
                    })
                }
                <Button buttonType="Success" clicked={this.orderHandler} disabled={!this.state.formIsValid}>ORDER</Button>
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

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

export default connect(mapStateToProps)(ContactData);
