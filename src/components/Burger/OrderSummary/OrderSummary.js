import React from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {
    const ingredientsSummary = Object.keys(props.ingredients).map((element) => {
        return (
            <li key={element}>
                <span style={{textTransform: "capitalize"}}>
                {element}</span>: {props.ingredients[element]} 
            </li>
        )  
    });
    return (
        <Aux>
            <h3>Your order:</h3>
            <p>A delicious Burger with the following ingredients:</p>
            <ul>
               {
                   ingredientsSummary
               }
            </ul>
            <p>Total price: <strong>{props.price.toFixed(2)}</strong></p>
            <p>Continue to checkout</p>
            <Button clicked={props.modalClosed} buttonType='Danger'>Cancel</Button>
            <Button clicked={props.purchaseContinue} buttonType='Success'>Continue</Button>

        </Aux>
    )
}

export default OrderSummary;