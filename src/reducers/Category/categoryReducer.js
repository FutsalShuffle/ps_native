import AjaxProvider from '../../providers/AjaxProvider';

const SET_PRODUCT = 'ps_native/categoryReducer/SET-PRODUCT';
const TOGGLE_LOADED = 'ps_native/categoryReducer/TOGGLE-IS-LOADED';

const initialState = {
    products: {},
    isLoaded: false,
}

export const categoryReducer = (state = initialState, action) => {

    let stateCopy = {};

    switch (action.type) {
        case SET_PRODUCT: {
            stateCopy = {
                ...state,
                products: {...action.products}
            }
            break;
        }
        case TOGGLE_LOADED: {
            stateCopy = {
                ...state,
                isLoaded: action.isLoaded,
            }
            break;
        }
        default: {
            stateCopy = {...state}
            break
        }
    }

    return stateCopy;
}

/**
 * 
 * @return: action contains products object
 */
const setProductActionCreator = (products) => {
    let action = {
        type: SET_PRODUCT,
        products: products,
    }

    return action;
}
/**
 * 
 * @return: action toggle isLoaded 
 */
const toggleIsLoadedActionCreator = (isLoaded) => {
    let action = {
        type: TOGGLE_LOADED,
        isLoaded: isLoaded,
    }

    return action;
}

/**
 * 
 * Thunk creator sets products to state
 */
export const setProductsThunkCreator = (id_category) => async (dispatch) => {
    let category = await AjaxProvider('/category?id_category='+id_category);
    
    if (category && category.products) {
      if(!cleanupFunction) {
        if (category.category.name[1]) props.navigation.setOptions({ title: category.category.name[1] });

        dispatch(setProductActionCreator(category.products))
        dispatch(toggleIsLoadedActionCreator(true));
      }
    }
}