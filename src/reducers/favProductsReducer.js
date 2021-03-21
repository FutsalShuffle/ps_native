import {ADD_TO_FAVOURITE, GET_FAVOURITE} from '../actions/types';

const initialState = {
    products: {}
}

const favProductsReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_TO_FAVOURITE:
            if (action.payload !== null && action.payload.products) {
                return  {
                    ...state,
                    products: action.payload.products,
                }
          } else {
              return state;
          }
        default:
            return state;

    }
}
export default favProductsReducer;