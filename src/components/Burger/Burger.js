import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import Classes from './Burger.module.css'
import { withRouter } from 'react-router-dom';

const Burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients).map(element => {
        return [...Array(props.ingredients[element])].map((_, i) => {
            return <BurgerIngredient key={element + i}  type={element}/>
        })
    }).reduce((prev, current) => {
        return prev.concat(current);
    }, []);

    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients</p>
    }
    return (
        <div className={Classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {
                transformedIngredients
            }
            <BurgerIngredient type="bread-bottom"/>
        </div>
    )
}


export default withRouter(Burger);
