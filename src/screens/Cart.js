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
  Thumbnail,
  Body,
  Badge,
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
  console.log('cartScreen', props.cart.length);
  //аттрибут : attribute_small, название категории: category, название: product.name, кол-во в корзине: product.cart_quantity
  return (
    <ScrollView>
      {props.cart && props.cart.length ? (
        <>
          <VStack space={4} alignItems="center">
            {props.cart.map(product => (
              <Box alignItems="center">
                <Box
                  maxW="80"
                  rounded="lg"
                  overflow="hidden"
                  borderColor="coolGray.200"
                  borderWidth="1"
                  _dark={{
                    borderColor: 'coolGray.600',
                    backgroundColor: 'gray.700',
                  }}
                  _web={{
                    shadow: 2,
                    borderWidth: 0,
                  }}
                  _light={{
                    backgroundColor: 'gray.50',
                  }}>
                  <Box>
                    <AspectRatio w="100%" ratio={16 / 9}>
                      <Image
                        source={{
                          uri:
                            Config.baseURI +
                            product.id_product +
                            '-cart_default/' +
                            product.link_rewrite +
                            '.jpg',
                        }}
                        alt="Alternate Text"
                      />
                    </AspectRatio>
                    <Center
                      bg="violet.500"
                      _dark={{
                        bg: 'violet.400',
                      }}
                      _text={{
                        color: 'warmGray.50',
                        fontWeight: '700',
                        fontSize: 'xs',
                      }}
                      position="absolute"
                      bottom="0"
                      px="3"
                      py="1.5">
                      {Config.currency + '. ' + product.price_real}
                    </Center>
                  </Box>
                  <Stack p="4" space={3}>
                    <Stack space={2}>
                      <Heading size="md" ml="-1">
                        {product.name}
                      </Heading>
                      <Text
                        fontSize="xs"
                        _light={{
                          color: 'violet.500',
                        }}
                        _dark={{
                          color: 'violet.400',
                        }}
                        fontWeight="500"
                        ml="-0.5"
                        mt="-1">
                        {product.attributes_small
                          ? product.attributes_small
                          : null}
                      </Text>
                    </Stack>
                    <Stack>
                      <Icon
                        name="plus"
                        size={30}
                        color="purple"
                        onPress={() => props.updateQty('up', product)}
                      />
                      <Text style={{fontSize: 23}}>
                        {product.cart_quantity}
                      </Text>
                      <Icon
                        name="remove"
                        size={30}
                        color="purple"
                        onPress={() => props.updateQty('down', product)}
                      />
                    </Stack>
                    <HStack
                      alignItems="center"
                      space={4}
                      justifyContent="space-between">
                      <HStack alignItems="center">
                        <Text
                          color="coolGray.600"
                          _dark={{
                            color: 'warmGray.200',
                          }}
                          fontWeight="400">
                          6 mins ago
                        </Text>
                      </HStack>
                    </HStack>
                  </Stack>
                </Box>
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
              color="#ffffff"
              accessibilityLabel="place an order"
            />
          </Stack>
        </>
      ) : (
        <View style={styles.container}>
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
