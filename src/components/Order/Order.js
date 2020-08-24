import React from 'react'
import classes from './Order.module.css';

const Order = (props) => {
    const ingredients = [];

    for(let ingredient in props.ingredients) {
        ingredients.push({name: ingredient, amount: props.ingredients[ingredient]})
    }

    const ingredientOutput = ingredients.map((element) => {
        return <span style={{
            textTransform: 'capitalize', 
            display: 'inline-block', 
            margin: '0 8px', 
            border: '1px solid #ccc',
            padding: '5px'
        }} key={element.name}>{element.name} ({element.amount}) </span>;
    })

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientOutput} </p>
            <p>Price: USD <strong>{Number.parseFloat(props.price).toFixed(2)} </strong> </p>
        </div>
    )
}

export default Order;