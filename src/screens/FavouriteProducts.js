/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  Text,
  StyleSheet,
  View
} from 'react-native';
import {connect} from 'react-redux';
import { Container, Content } from 'native-base';
import { getCart } from '../actions/cartManagement';

const FavouriteProducts = (props) => {
  return (
    <Container>
      <Content>
          { props.favProducts ?
            <View>
              {
                props.favProducts.map(product => (
                  <View key={product.id_product}>
                      <Text>{product.id_product}</Text>
                  </View>
                ))
              }
            </View>
          :null}
      </Content>
    </Container>            
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