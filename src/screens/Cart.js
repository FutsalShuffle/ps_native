/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {View, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import Config from '../../Config';
import {
  Center,
  VStack,
  Button,
  AspectRatio,
  Box,
  Text,
  Stack,
  Badge,
  HStack,
  Pressable,
  Avatar,
  Spacer,
  IconButton,
  useColorModeValue,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import updateQty from '../actions/cartManagement';
import FooterNav from '../navigation/FooterNav';
import HeaderNav from '../navigation/HeaderNav';

const Cart = props => {
  const colorScheme = useColorModeValue('yellow.500', 'green.300');
  const darkModeScheme = useColorModeValue('info.50', 'info.800');
  const variant = useColorModeValue('solid', 'outline');

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
    <Box
      flex={1}
      safeAreaTop
      width="100%"
      alignSelf="center"
      bg={darkModeScheme}>
      <View>
        <HeaderNav navigation={props.navigation} />
        <ScrollView>
          {props.cart && props.cart.length ? (
            <>
              <VStack space={4} alignItems="center" pt={2}>
                {props.cart.map(product => (
                  <Box key={product.id} w={'100%'}>
                    <Pressable onPress={() => console.log('You touched me')}>
                      <Box pl="4" pr="5" py="2">
                        <HStack alignItems="center" space={2}>
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
                            <Text bold>{product.name}</Text>

                            <HStack space={2}>
                              <Text>
                                {product.attributes_small
                                  ? product.attributes_small
                                  : null}
                              </Text>
                              <Badge colorScheme="light" alignSelf="center">
                                {Config.currency + '. ' + product.price_real}
                              </Badge>
                            </HStack>
                          </VStack>
                          <Spacer />
                          <HStack alignItems="center" space={1}>
                            <IconButton
                              borderWidth={1}
                              variant={'ghost'}
                              colorScheme={'orange'}
                              onPress={() => props.updateQty('down', product)}
                              icon={
                                <Icon name="minus" size={15} color="black" />
                              }
                              borderRadius="full"></IconButton>
                            <Text style={{fontSize: 23}}>
                              {product.cart_quantity}
                            </Text>
                            <IconButton
                              variant={'solid'}
                              colorScheme={'muted'}
                              onPress={() => props.updateQty('up', product)}
                              icon={
                                <Icon name="plus" size={15} color="black" />
                              }
                              borderRadius="full"
                            />
                          </HStack>
                        </HStack>
                      </Box>
                    </Pressable>
                  </Box>
                ))}
              </VStack>
              <Center >
                <HStack w={'95%'} space={3} mt={10} h={20} rounded="xl"  borderWidth={1}>
                  <Center w={'25%'}>
                    <Text>Total:</Text>
                  </Center>
                  <Center w={'40%'}>
                    <Text>...................................</Text>
                  </Center>
                  <Center w={'25%'}>
                    <Text>
                      {' '}
                      {calculateTotal()} {Config.currency}
                    </Text>
                  </Center>
                </HStack>
              </Center>
              <Box alignItems="center" mt={3} mb={3}>
                <Button
                  w={'90%'}
                  rounded={'xl'}
                  shadow={5}
                  onPress={() => props.navigation.navigate('Order')}
                  colorScheme={'warning'}
                  size={'lg'}>
                  <Text color="white" fontSize={20} p={2}>
                    Procceed to checkout
                  </Text>
                </Button>
              </Box>
            </>
          ) : (
            <View>
              <Text>Your cart is empty</Text>
            </View>
          )}
        </ScrollView>
      </View>
      <FooterNav navigation={props.navigation} selected={2} />
    </Box>
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
