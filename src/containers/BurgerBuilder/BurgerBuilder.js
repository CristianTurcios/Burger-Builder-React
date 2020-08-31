import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-orders';
import { useHistory } from 'react-router-dom';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import * as burgerBuilderActions from '../../store/actions/index';

const BurgerBuilder = (props) => {
    const [loading, setLoading] = useState(false);
    const [purchasing, setPurchasing] = useState(false);
    const history = useHistory();

    useEffect(() => {
        // code to run on component mount
        props.onInitIngredients()
    }, [])

    const updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients).map((element) => {
            return ingredients[element];
        }).reduce((prev, current) => {
            return prev + current;
        }, 0);

        return sum > 0;
    }

    const purchaseHandler = () => setPurchasing(true);
    const purchaseCancelHandler = () => setPurchasing(false);
    const purchaseContinueHandler = () => {
        props.onInitPurchase();
        history.push('/Checkout')
    } 

    const disableInfo = {
        ...props.ings
    }

    for (const key in disableInfo) {
        disableInfo[key] = disableInfo[key] <= 0;
    }

    return (
        <Aux>
            <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                {
                    !loading && (
                        <OrderSummary
                            ingredients={props.ings}
                            modalClosed={purchaseCancelHandler}
                            purchaseContinue={purchaseContinueHandler}
                            price={props.price}
                        ></OrderSummary>
                    )
                }
                {
                    loading && (
                        <Spinner />
                    )
                }
            </Modal>
            <Burger ingredients={props.ings} />
            <BuildControls
                ingredientAdded={props.onIngredientAdded}
                ingredientRemoved={props.onIngredientRemove}
                disabled={disableInfo}
                price={props.price}
                purchasable={
                    updatePurchaseState(props.ings)
                }
                ordered={purchaseHandler} />
        </Aux>
    )
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemove: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
        onInitPurchase: () => dispatch(burgerBuilderActions.purchaseInit()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
