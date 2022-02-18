/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import {getCart} from '../actions/cartManagement';
import ProductMiniature from '../components/Miniatures/Product';
import FooterNav from '../navigation/FooterNav';
import HeaderNav from '../navigation/HeaderNav';
import {Center, Box, Text, useColorModeValue} from 'native-base';
const FavouriteProducts = props => {
  const colorScheme = useColorModeValue('yellow.500', 'green.300');
  const darkModeScheme = useColorModeValue('info.50', 'info.800');
  const variant = useColorModeValue('solid', 'outline');

  return (
    <Box
      flex={1}
      bg="white"
      safeAreaTop
      width="100%"
      alignSelf="center"
      bg={darkModeScheme}>
      <HeaderNav navigation={props.navigation} />
      <Center>
        {props.favProducts && props.favProducts.length ? (
          <View>
            {props.favProducts.map(product => (
              <ProductMiniature
                product={product}
                key={product.id_product}
                onClick={() =>
                  props.navigation.navigate('Product', {
                    id_product: product.id_product,
                  })
                }
              />
            ))}
          </View>
        ) : (
          <Center>
            <Text>Nothing here</Text>
          </Center>
        )}
      </Center>
      <FooterNav navigation={props.navigation} selected={1} />
    </Box>
  );
};
const mapStateToProps = state => {
  return {
    favProducts: state.favProducts.products,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getCart: () => dispatch(getCart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FavouriteProducts);
