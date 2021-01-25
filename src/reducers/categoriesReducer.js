import {GET_CATEGORIES, GET_CATEGORY} from '../actions/types';

const initialState = {
    categories: [],
    errors: [],
    category: []
}

const categoriesReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_CATEGORIES:
            if (action.payload) {
                return  {
                    ...state,
                    categories: action.payload,
                }
          } else {
              return {
                  ...state,
                  errors: action.payload[0]
              }
          }
        case GET_CATEGORY:
            if (action.payload) {
                return  {
                    ...state,
                    category: action.payload,
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
export default categoriesReducer;