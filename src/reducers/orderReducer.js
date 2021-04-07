import { GET_COUNTRIES } from '../actions/types';

const initialState = {
    availableCountries: [],
    errors: [],
}

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_COUNTRIES:
            if (action.payload) {
                return {
                    availableCountries: action.payload.countries,
                }
            }
            return state;
        default:
            return state;
    }
}
export default orderReducer;