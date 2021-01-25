import {GET_CATEGORIES, GET_CATEGORY} from './types';
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
