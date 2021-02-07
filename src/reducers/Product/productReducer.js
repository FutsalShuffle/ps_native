import {addToCart} from '../../actions/cartManagement';


const ADD_TO_CART = 'ps_native/productReducer/ADD-TO-CART';
const SET_PROCESS_ADD = 'ps_native/productReducer/SET-PROCESS-ADD';

const initialState = {
    proccesAdd: false,
}

export const productReducer = (state = initialState, action) => {

    let stateCopy = {}

    switch (action.type) {

        case SET_PROCESS_ADD: {
            stateCopy = {...state, proccesAdd: action.inProcess}
            break;
        }
        default: {
            stateCopy = {...state}
            break;
        }

    }

    return stateCopy;
}

const setProcessAddActionCreator = (inProcess) => {
    let action = {
        type: SET_PROCESS_ADD,
        inProcess: inProcess,
    }
}

export const addToCartThunkCreator = (id_product, id_product_attribute) => async (dispatch) => {
    dispatch(setProcessAddActionCreator(true));

    
}