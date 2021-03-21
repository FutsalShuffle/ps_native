import AjaxProviderLogged from '../providers/AjaxProviderLogged';
import {ADD_TO_FAVOURITE, GET_FAVOURITE} from './types';

export const AddToFavourite = (payload) => {
    return async dispatch  => {
        let favproducts = await AjaxProviderLogged('/favproducts?method=addToFavourite&id_product='+payload.id_product+'&id_product_attribute='+payload.id_product_attribute);
        dispatch(dispatchAddToFavourite(favproducts));
    }
}
export const dispatchAddToFavourite = (payload) => (
    {
        type: ADD_TO_FAVOURITE,
        payload: payload
    }
);

