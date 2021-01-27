import {VERIFY_USER, LOGIN_USER, REGISTER_USER, LOGOUT_USER} from '../actions/types';
import localStorage from '../localstorage/LocalStorage';

const initialState = {
    customer: {},
    isLoggedIn: false,
    errors: ''
}

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case VERIFY_USER:
            if (action.payload !== null && action.payload.customer) {
                return  {
                    ...state,
                    customer: action.payload.customer,
                    isLoggedIn: true
                }
          } else {
              return state;
          }
        case LOGOUT_USER:
            localStorage.storeJwt('');
            return {
                ...state,
                isLoggedIn: false,
            }
        case LOGIN_USER:
                if (action.payload !== null && action.payload.customer) {
                    localStorage.storeJwt(action.payload.customer.token);
                    return  {
                        ...state,
                        customer: action.payload.customer,
                        isLoggedIn: true
                    }
              } else {
                  return {
                      ...state,
                      errors: action.payload[0]
                  }
              }
        case REGISTER_USER:
            if (action.payload !== null && action.payload.customer) {
                localStorage.storeJwt(action.payload.customer.token);
                return  {
                    ...state,
                    customer: action.payload.customer,
                    isLoggedIn: true
                }
            } else {
                return {
                    ...state,
                    errors: action.payload[0]
                }
                }
        default:
            return state;

    }
}
export default userReducer;