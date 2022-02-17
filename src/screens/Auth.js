/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {TouchableOpacity, SafeAreaView, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import Login from '../components/Login';
import Register from '../components/Register';
import FooterNav from '../navigation/FooterNav';
import {logoutUser} from '../actions/userManagement';
import {useIsFocused} from '@react-navigation/native';
import AjaxProviderLogged from '../providers/AjaxProviderLogged';
import Config from '../../Config';
import {
  Box,
  AspectRatio,
  useColorMode,
  useColorModeValue,
  Text,
  Image,
  IconButton,
  View,
  Center,
  Spinner,
  Stack,
  HStack,
  VStack,
  Heading,
  Circle,
  Pressable,
  Avatar,
  Spacer,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

const Auth = props => {
  const colorScheme = useColorModeValue('yellow.500', 'green.300');
  const darkModeScheme = useColorModeValue('info.50', 'info.800');
  const variant = useColorModeValue('solid', 'outline');
  const {colorMode, toggleColorMode} = useColorMode();
  const isFocused = useIsFocused();
  const [showRegister, setShowRegister] = useState(0);
  const [isHistoryLoaded, setHistoryLoaded] = useState(0);
  const swapScreen = () => {
    if (!showRegister) setShowRegister(1);
    if (showRegister) setShowRegister(0);
  };
  const [orderHistory, setOrderHistory] = useState([]);

  onPressLogout = async () => {
    props.logout();
  };

  const initLoadHistory = async () => {
    let history = await AjaxProviderLogged('/orderhistory');
    console.log('history', history);
    if (history && history.history) {
      setOrderHistory(history.history);
      setHistoryLoaded(1);
    }
  };

  useEffect(() => {
    initLoadHistory();
  }, []);

  console.log('customer', props.customer);
  if (props.isLoggedIn) {
    return (
      <Box
        bg={darkModeScheme}
        flex={1}
        safeAreaTop
        width="100%"
        alignSelf="center">
        <ScrollView>
          <Center mt={3}>
            <Center
              justifyContent="center"
              mx={{
                base: 'auto',
                md: '0',
              }}
              space={2}>
              <Avatar
                bg={colorScheme}
                mr="1"
                size="2xl"
                source={{
                  uri: 'https://bit.ly/broken-link',
                }}>
                <Text fontSize="48">
                  {props.customer.firstname.charAt(0) +
                    props.customer.lastname.charAt(0)}
                </Text>
              </Avatar>
              <Text mt="3" fontSize="28">
                {props.customer.firstname + ' ' + props.customer.lastname}
              </Text>
            </Center>
          </Center>
          <Center>
            <Center
              h="125px"
              w="90%"
              rounded="xl"
              shadow={5}
              bg={darkModeScheme}
              mt={3}
              mb={3}>
              <Pressable
                mx="1"
                onPress={() => props.navigation.navigate('Favourites')}>
                <VStack alignItems="center">
                  <Circle size="60px" bg={colorScheme} mt="5">
                    <Icon name="heart" size={30} />
                  </Circle>
                  <Text
                    alignItems="center"
                    fontSize="xs"
                    fontWeight="500"
                    mt={1}
                    pb={0}>
                    Favorites
                  </Text>
                  <Spacer />
                </VStack>
              </Pressable>
            </Center>
            <Center
              h="125px"
              w="90%"
              rounded="xl"
              shadow={5}
              bg={darkModeScheme}
              mt={3}
              mb={3}>
              <Pressable mx="1" onPress={toggleColorMode}>
                <VStack alignItems="center">
                  <Circle size="60px" bg={colorScheme} mt="5">
                    <Icon
                      name={colorMode == 'light' ? 'moon-o' : 'sun-o'}
                      size={30}
                    />
                  </Circle>
                  <Text
                    alignItems="center"
                    fontSize="xs"
                    fontWeight="500"
                    mt={1}
                    pb={0}>
                    Theme
                  </Text>
                  <Spacer />
                </VStack>
              </Pressable>
            </Center>
            <Center
              h="125px"
              w="90%"
              rounded="xl"
              shadow={5}
              bg={darkModeScheme}
              mt={3}
              mb={3}>
              <Pressable mx="1" onPress={el => onPressLogout()}>
                <VStack alignItems="center">
                  <Circle size="60px" bg={colorScheme} mt="5">
                    <Icon name="sign-out" size={30} />
                  </Circle>
                  <Text
                    alignItems="center"
                    fontSize="xs"
                    fontWeight="500"
                    mt={1}
                    pb={0}>
                    Logout
                  </Text>
                  <Spacer />
                </VStack>
              </Pressable>
            </Center>
            {isHistoryLoaded ? (
              <Center
                w="90%"
                rounded="xl"
                shadow={5}
                bg={darkModeScheme}
                mt={2}
                mb={3}>
                <Text
                  style={{
                    textAlign: 'center',
                    marginBottom: 20,
                    fontSize: 24,
                  }}
                  mt={2}
                  pt={4}>
                  Order History
                </Text>
                {orderHistory && orderHistory.length ? (
                  <>
                    {orderHistory.map(order => (
                      <HStack key={order.id}>
                        <Center>
                          <Text>Ref: </Text>
                        </Center>
                        <Center>
                          <Text>{order.reference} </Text>
                        </Center>
                        <Center>
                          <Text>
                            {Config.currency}
                            {'. '}
                            {parseFloat(order.total_paid_tax_incl).toFixed(2)}
                          </Text>
                        </Center>
                      </HStack>
                    ))}
                  </>
                ) : (
                  <Text
                    style={{
                      textAlign: 'center',
                      marginBottom: 20,
                      fontSize: 24,
                    }}>
                    You've yet to make your first order!
                  </Text>
                )}
              </Center>
            ) : (
              <Box
                style={{
                  flex: 100,
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexGrow: 2,
                  height: 100,
                }}>
                <Spinner color="green" />
              </Box>
            )}
          </Center>
        </ScrollView>
        <FooterNav navigation={props.navigation} selected={3} />
      </Box>
    );
  } else {
    return (
      <SafeAreaView h={'100%'}>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <Box bg={darkModeScheme} pt={140} pb={140}>
            {showRegister ? null : (
              <Box>
                <TouchableOpacity onPress={el => swapScreen()}>
                  <Text>Don't have an account yet? Register now!</Text>
                </TouchableOpacity>

                <Login />
              </Box>
            )}
            {showRegister ? (
              <Box bg={darkModeScheme}>
                <TouchableOpacity onPress={el => swapScreen()}>
                  <Text>Have an account already? Login instead!</Text>
                </TouchableOpacity>

                <Register />
              </Box>
            ) : null}
          </Box>
        </ScrollView>
      </SafeAreaView>
    );
  }
};
const mapStateToProps = state => {
  return {
    customer: state.customer.customer,
    isLoggedIn: state.customer.isLoggedIn,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logoutUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
