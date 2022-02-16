/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {View, StyleSheet, SafeAreaView, ScrollView, Button} from 'react-native';
import {connect} from 'react-redux';
import Config from '../../Config';
import {
  Center,
  VStack,
  Image,
  AspectRatio,
  Box,
  Text,
  Stack,
  Heading,
  HStack,
  Pressable,
  Avatar,
  Spacer,
  IconButton,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import updateQty from '../actions/cartManagement';

const Cart = props => {
  var records = {};
  useEffect(() => {
    records = Object.assign({}, props.cart);
  }, []);

  const calculateTotal = () => {
    if (!props.cart) return null;
    let summ = 0;
    props.cart.forEach(product => {
      summ += product.price_with_reduction * product.cart_quantity;
    });
    return summ.toFixed(2);
  };
  //аттрибут : attribute_small, название категории: category, название: product.name, кол-во в корзине: product.cart_quantity
  return (
    <ScrollView>
      {props.cart && props.cart.length ? (
        <>
          <VStack space={4} alignItems="center">
            {props.cart.map(product => (
              <Box key={product.id}>
                <Pressable
                  onPress={() => console.log('You touched me')}
                  _dark={{
                    bg: 'coolGray.800',
                  }}
                  _light={{
                    bg: 'white',
                  }}>
                  <Box pl="4" pr="5" py="2">
                    <HStack alignItems="center" space={3}>
                      <Avatar
                        size="48px"
                        source={{
                          uri:
                            Config.baseURI +
                            product.id_product +
                            '-cart_default/' +
                            product.link_rewrite +
                            '.jpg',
                        }}
                      />
                      <VStack>
                        <Text
                          color="coolGray.800"
                          _dark={{
                            color: 'warmGray.50',
                          }}
                          bold>
                          {product.name}
                        </Text>
                        <Text
                          color="coolGray.600"
                          _dark={{
                            color: 'warmGray.200',
                          }}>
                          {product.attributes_small
                            ? product.attributes_small
                            : null}
                        </Text>
                      </VStack>
                      <Spacer />
                      <Text
                        fontSize="xs"
                        color="coolGray.800"
                        _dark={{
                          color: 'warmGray.50',
                        }}
                        alignSelf="flex-start">
                        {Config.currency + '. ' + product.price_real}
                      </Text>
                      <Box alignItems="center">
                        <IconButton
                          onPress={() => props.updateQty('up', product)}
                          icon={<Icon name="plus" size={30} color="purple" />}
                          borderRadius="full"
                        />
                        <Text style={{fontSize: 23}}>
                          {product.cart_quantity}
                        </Text>
                        <IconButton
                          onPress={() => props.updateQty('down', product)}
                          icon={<Icon name="remove" size={30} color="purple" />}
                          borderRadius="full"
                        />
                      </Box>
                    </HStack>
                  </Box>
                </Pressable>
              </Box>
            ))}
          </VStack>
          <Stack>
            <Text>
              Total: {calculateTotal()} {Config.currency}
            </Text>
            <Button
              onPress={() => props.navigation.navigate('Order')}
              title="Procceed with order"
              accessibilityLabel="place an order"
            />
          </Stack>
        </>
      ) : (
        <View>
          <Text>Your cart is empty</Text>
        </View>
      )}
    </ScrollView>
  );
};
const mapStateToProps = state => {
  return {
    cart: state.cart.cart.cart,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    updateQty: (direction, payload) => dispatch(updateQty(direction, payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
