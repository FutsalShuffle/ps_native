import {createStore, combineReducers, applyMiddleware} from 'redux';
import userReducer from './reducers/userReducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    customer: userReducer
})

const configureStore = () => createStore(rootReducer, applyMiddleware(thunk));

export default configureStore;