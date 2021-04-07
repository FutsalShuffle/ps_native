import { ADD_TO_CART, GET_CART, UPDATE_CART_QTY } from './types';
import AjaxProviderLogged from '../providers/AjaxProviderLogged';

export const addToCart = (payload) => {
    return async dispatch => {
        let addToCart = await AjaxProviderLogged('/racart?id_product=' + payload.id_product + '&quantity=1&id_product_attribute=' + payload.id_product_attribute + '&method=addToCart');
        dispatch(dispatchAddToCart(addToCart));
    }
}
export const dispatchAddToCart = (payload) => (
    {
        type: ADD_TO_CART,
        payload: payload
    }
);
export const getCart = () => {
    return async dispatch => {
        let addToCart = await AjaxProviderLogged('/racart?method=getMyCart');
        dispatch(dispatchGetCart(addToCart));
    }
};
export const dispatchGetCart = (payload) => (
    {
        type: GET_CART,
        payload: payload
    }
);
export const updateQty = (direction, payload) => {
    return async dispatch => {
        let updateQty = await AjaxProviderLogged('/racart?id_product=' + payload.id_product + '&quantity=1&id_product_attribute=' + payload.id_product_attribute + '&method=updateQty&op=' + direction);
        dispatch(dispatchUpdateQty(updateQty));
    }
}
export const dispatchUpdateQty = (payload) => (
    {
        type: UPDATE_CART_QTY,
        payload: payload
    }
);
