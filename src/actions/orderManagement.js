import {GET_COUNTRIES} from './types';
import AjaxProviderLogged from '../providers/AjaxProviderLogged';


export const getAvailableCountries = (payload) => {
    return async dispatch  => {
        let countries = await AjaxProviderLogged('/racart?method=getAvailableCountries');
        dispatch(dispatchGetAvailableCountries(countries));
    }
}
export const dispatchGetAvailableCountries = (payload) => (
    {
        type: GET_COUNTRIES,
        payload: payload
    }
);

