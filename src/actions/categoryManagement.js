import {GET_CATEGORIES, GET_CATEGORY, GET_PRODUCT} from './types';
import AjaxProvider from '../providers/AjaxProvider';


export const getCategories = () => {
    return async dispatch  => {
        let categories = await AjaxProvider('/categories');
        dispatch(dispatchGetCategories(categories.categories.children));
    }
}
export const getCategory = (payload) => {
    return async dispatch  => {
        let category = await AjaxProvider('/category?id_category='+payload);
        dispatch(dispatchGetCategory(category.products));
    }
}
export const getProduct = (payload) => {
    return async dispatch  => {
        let product = await AjaxProvider('/product?id_product='+payload);
        dispatch(dispatchGetCategory(product));
    }
}
export const dispatchGetCategory = (payload) => (
    {
        type: GET_CATEGORY,
        payload: payload
    }
);
export const dispatchGetCategories = (payload) => (
    {
        type: GET_CATEGORIES,
        payload: payload
    }
);
export const dispatchGetProduct = (payload) => (
    {
        type: GET_PRODUCT,
        payload: payload
    }
);
