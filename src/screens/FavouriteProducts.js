/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StyleSheet, View
} from 'react-native';
import { connect } from 'react-redux';
import { Center } from 'native-base';
import { getCart } from '../actions/cartManagement';
import ProductMiniature from '../components/Miniatures/Product';

const FavouriteProducts = (props) => {
  return (
    <View>
      <Center>
        {props.favProducts && props.favProducts.length ?
          <View>
            {
              props.favProducts.map(product => (
                <ProductMiniature product={product} key={product.id_product} onClick={() => props.navigation.navigate('Product', { id_product: product.id_product })} />
              ))
            }
          </View>
          : null}
      </Center>
    </View>
  );
};
const mapStateToProps = (state) => {
  return {
    favProducts: state.favProducts.products,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getCart: () => dispatch(getCart())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FavouriteProducts);