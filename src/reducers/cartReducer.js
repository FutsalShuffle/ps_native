import {ADD_TO_CART, GET_CART} from '../actions/types';

const initialState = {
    cart: [],
    errors: [],
}

const cartReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_TO_CART:
            if (action.payload) {
                alert('added to cart!');
                return  {
                    cart: action.payload,
                }
          } else {
              if (!action.payload) return state;
              return {
                  ...state,
                  errors: action.payload[0]
              }
          }
        case GET_CART:
            if (action.payload && action.payload.cart) {
                return  {
                    cart: action.payload,
                }
            }
            return state;
        default:
            return state;
    }
}
export default cartReducer;