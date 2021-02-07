import React from 'react';
import { connect } from "react-redux";
import ProductMiniature from './ProductMiniature';
import {addToCart} from '../../../actions/cartManagement';


/**
 * 
 * @return ProductMiniature component 
 */
const ProductMiniatureAPIContainer = (props) => {

    const pressAddToCart = (id_product, id_product_attribute) => {
        props.addToCart({
            id_product: id_product,
            id_product_attribute: id_product_attribute,
        });
    };

    return (
        <ProductMiniature navigation={props.navigation} product={props.product} addToCart={pressAddToCart}/>
    );
}

const mapStateToProps = (state, ownProps) => {
    return {
        navigation: ownProps.navigation,
        product: ownProps.product,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // @pw-vn переделать на ThunkCreator
        addToCart: (payload) => dispatch(addToCart(payload)),
    }
}


const ProductMiniatureContainer = connect(mapStateToProps, mapDispatchToProps)(ProductMiniatureAPIContainer);
export default ProductMiniatureContainer;