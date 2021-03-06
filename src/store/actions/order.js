import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData,
    }
}

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGET_FAIL,
        error,
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post(`/orders.json?auth=${token}`, orderData).then((response) => {
            dispatch(purchaseBurgerSuccess(response.data.name, orderData))
        }).catch((err) => {
            dispatch(purchaseBurgerFail(err))
        });
    };
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders,
    }
}

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAILED,
        error,
    }
}

export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrdersStart())
        axios.get(`/orders.json?auth=${token}&orderBy="userId"&equalTo="${userId}"`).then((resp) => {
            const fetchedOrders = [];
            for(let key in resp.data) {
                fetchedOrders.push({...resp.data[key], id: key})
            }
            dispatch(fetchOrdersSuccess(fetchedOrders))
        }).catch((error) => {
            dispatch(fetchOrdersFail(error))
        })
    }
    
}