import React, { useState } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-orders';
import { useHistory } from 'react-router-dom';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import * as actionTypes from '../../store/actions';
import Burger from '../../components/Burger/Burger';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const BurgerBuilder = (props) => {
  const [loading, setLoading] = useState(false);
  const [purchasing, setPurchasing] = useState(false);
  const history = useHistory();

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
  const purchaseContinueHandler = () => history.push('/Checkout')

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
            <Burger ingredients={props.ings}/>
            <BuildControls 
                ingredientAdded={props.onIngredientAdded}
                ingredientRemoved={props.onIngredientRemove}
                disabled={disableInfo} 
                price={props.price}
                purchasable = {
                    updatePurchaseState(props.ings)
                }
                ordered={purchaseHandler}/>
        </Aux>
    )
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({
            type: actionTypes.ADD_INGREDIENT,
            ingredientName: ingName
        }),
        onIngredientRemove: (ingName) => dispatch({
            type: actionTypes.REMOVE_INGREDIENT,
            ingredientName: ingName
        })
    }
} 
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
