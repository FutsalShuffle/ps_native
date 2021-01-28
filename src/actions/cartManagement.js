import {ADD_TO_CART, GET_CART} from './types';
import AjaxProviderLogged from '../providers/AjaxProviderLogged';


export const addToCart = (payload) => {
    return async dispatch  => {
        let addToCart = await AjaxProviderLogged('/racart?id_product='+payload.id_product+'&quantity=1&id_product_attribute='+payload.id_product_attribute+'&method=addToCart');
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
    return async dispatch  => {
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
