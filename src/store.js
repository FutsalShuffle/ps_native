import {createStore, combineReducers, applyMiddleware} from 'redux';
import userReducer from './reducers/userReducer';
import categoriesReducer from './reducers/categoriesReducer';
import cartReducer from './reducers/cartReducer';
import orderReducer from './reducers/orderReducer';
import favProductsReducer from './reducers/favProductsReducer';

import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    customer: userReducer,
    categories: categoriesReducer,
    cart: cartReducer,
    order: orderReducer,
    favProducts: favProductsReducer
})

const configureStore = () => createStore(rootReducer, applyMiddleware(thunk));

export default configureStore;