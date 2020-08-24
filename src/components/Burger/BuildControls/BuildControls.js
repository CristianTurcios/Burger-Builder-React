import React from 'react';
import Classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Salad', type: 'salad' },
    {label: 'Meat', type: 'meat' },
    {label: 'Bacon', type: 'bacon' },
    {label: 'Cheese', type: 'cheese' },
];

const BuildControls = (props) => {
    return (
        <div className={Classes.BuildControls}>
            <p>Current Price: <strong>{props.price.toFixed(2) }</strong></p>
            {
                controls.map((element) => {
                    return <BuildControl 
                        key={element.label} 
                        label={element.label} 
                        type={element.type}
                        added={() => props.ingredientAdded(element.type)}
                        removed={() => props.ingredientRemoved(element.type)}
                        disabled={props.disabled[element.type]} />
                })
            }
            <button 
                className={Classes.OrderButton} 
                disabled={!props.purchasable}
                onClick={props.ordered}
            >ORDER NOW</button>

        </div>
    )
}

export default BuildControls;