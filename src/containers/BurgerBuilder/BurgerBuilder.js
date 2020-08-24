import React, { useState } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
//  import { withRouter } from 'react-router-dom';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
} 

const BurgerBuilder = ({ history }) => {

  const [burgerIngredients, setBurgerIngredients] = useState({
      ingredients: {
          salad: 0,
          bacon: 0,
          cheese: 0,
          meat: 0,
      },
      totalPrice: 4,
  });
  const [loading, setLoading] = useState(false);
  const [purchasable, setPurchasable] = useState(false);
  const [purchasing, setPurchasing] = useState(false);


  const addIngredientHandler = (type) => {
    const oldCount = burgerIngredients.ingredients[type];
    
    const updateCount = oldCount + 1;

    const updatedIngredients = {
        ...burgerIngredients.ingredients
    }

    updatedIngredients[type] = updateCount; 
    

    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = burgerIngredients.totalPrice;
    const newPrice = oldPrice + priceAddition;

    setBurgerIngredients({
        ingredients: updatedIngredients,
        totalPrice: newPrice,
    });
    updatePurchaseState(updatedIngredients);
  }

  const removeIngredientHandler = (type) => {
    const oldCount = burgerIngredients.ingredients[type];
    if (oldCount <= 0) {
        return;
    }
    const updateCount = oldCount - 1;

    const updatedIngredients = {
        ...burgerIngredients.ingredients
    }

    updatedIngredients[type] = updateCount;


    const priceDeduction= INGREDIENT_PRICES[type];
    const oldPrice = burgerIngredients.totalPrice;
    const newPrice = oldPrice - priceDeduction;

    setBurgerIngredients({
        ingredients: updatedIngredients,
        totalPrice: newPrice,
    });
    updatePurchaseState(updatedIngredients);
  }

  const updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients).map((element) => {
        return ingredients[element];
    }).reduce((prev, current) => {
        return prev + current;
    }, 0);

    setPurchasable( sum > 0);
  }

  const purchaseHandler = () => {
      setPurchasing(true);
  }

  const disableInfo = {
      ...burgerIngredients.ingredients
  }

  const purchaseCancelHandler = () => {
      setPurchasing(false);
  }

  const purchaseContinueHandler = () => {
    const queryParams = [];
    for(let i in burgerIngredients.ingredients) {
        queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(burgerIngredients.ingredients[i]))
    }
    queryParams.push('price=' + burgerIngredients.totalPrice)
    const queryString = queryParams.join('&');
    history.push({
        pathname: '/Checkout',
        search: '?' + queryString
    })
    // setLoading(true);
    // const order = {
    //     ingredients: burgerIngredients.ingredients,
    //     price: burgerIngredients.totalPrice,
    //     customer: {
    //         name: 'Cristian',
    //         address: {
    //             street: 'street',
    //             zipCode: '504',
    //             country: 'Canada'
    //         },
    //         email: 'test@test.com',
    //     },
    //     deliveryMethod: 'fastest'
    // }
    // axios.post('/orders.json', order).then((resp) => {
    //     setLoading(false);
    //     purchaseCancelHandler();

    // }).catch((err) => {
    //     setLoading(false);
    //     purchaseCancelHandler();
    // });
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
                            ingredients={burgerIngredients.ingredients}
                            modalClosed={purchaseCancelHandler}
                            purchaseContinue={purchaseContinueHandler}
                            price={burgerIngredients.totalPrice}
                        ></OrderSummary>
                    )
                }
                {
                    loading && (
                        <Spinner />
                    )
                }
            </Modal>
            <Burger ingredients={burgerIngredients.ingredients}/>
            <BuildControls 
                ingredientAdded={addIngredientHandler}
                ingredientRemoved={removeIngredientHandler}
                disabled={disableInfo} 
                price={burgerIngredients.totalPrice}
                purchasable={purchasable} 
                ordered={purchaseHandler}/>
        </Aux>
    )
}

export default withErrorHandler(BurgerBuilder, axios);
