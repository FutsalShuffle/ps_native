import AjaxProviderLogged from '../providers/AjaxProviderLogged';
import { ADD_TO_FAVOURITE, GET_FAVOURITE } from './types';

export const AddToFavourite = (payload) => {
    return async dispatch => {
        let favproducts = await AjaxProviderLogged('/favproducts?method=add&id_product=' + payload.id_product + '&id_product_attribute=' + payload.id_product_attribute);
        if (favproducts)
            dispatch(dispatchAddToFavourite(favproducts));
    }
}
export const dispatchAddToFavourite = (payload) => (
    {
        type: ADD_TO_FAVOURITE,
        payload: payload
    }
);

export const removeFromFavourite = (payload) => {
    return async dispatch => {
        let favproducts = await AjaxProviderLogged('/favproducts?method=remove&id_product=' + payload.id_product + '&id_product_attribute=' + payload.id_product_attribute);
        if (favproducts)
            dispatch(dispatchRemoveFromFavourite(favproducts));
    }
}
export const dispatchRemoveFromFavourite = (payload) => (
    {
        type: REMOVE_FAVOURITE,
        payload: payload
    }
);

export const getFavList = () => {
    return async dispatch => {
        let favproducts = await AjaxProviderLogged('/favproducts?method=list');
        if (favproducts)
            dispatch(dispatchgetFavList(favproducts));
    }
}
export const dispatchgetFavList = (payload) => (
    {
        type: GET_FAVOURITE,
        payload: payload
    }
);

