/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Button,
} from 'react-native';
import {connect} from 'react-redux';
import Login from '../components/Login';
import Register from '../components/Register';
import {logoutUser} from '../actions/userManagement';
import {useIsFocused} from '@react-navigation/native';
import AjaxProviderLogged from '../providers/AjaxProviderLogged';
import Config from '../../Config';
import {
  Box,
  AspectRatio,
  List,
  ListItem,
  Text,
  Image,
  Left,
  Right,
  Center,
  Spinner,
  Stack,
  HStack,
  VStack,
  Heading,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

const Auth = props => {
  const isFocused = useIsFocused();
  const [showRegister, setShowRegister] = useState(0);
  const [isHistoryLoaded, setHistoryLoaded] = useState(0);
  const swapScreen = () => {
    if (!showRegister) setShowRegister(1);
    if (showRegister) setShowRegister(0);
  };
  const [orderHistory, setOrderHistory] = useState([]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    button: {
      paddingTop: 15,
    },
    userscreen: {
      fontSize: 18,
      textAlign: 'center',
      paddingBottom: 50,
    },
  });

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
  return (
    <ScrollView style={{paddingTop: 20}}>
      <View>
        {props.isLoggedIn ? (
          <>
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
                        uri: 'https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg',
                      }}
                      alt="image"
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
                    PHOTOS
                  </Center>
                </Box>
                <Stack p="4" space={3}>
                  <Stack space={2}>
                    <Heading size="md" ml="-1">
                      {props.customer.firstname} {props.customer.lastname}!
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
                      The Silicon Valley of India.
                    </Text>
                  </Stack>
                  <Text fontWeight="400">
                    Bengaluru (also called Bangalore) is the center of India's
                    high-tech industry. The city is also known for its parks and
                    nightlife.
                  </Text>
                  <>
                    <Icon name="rocket" size={30} color="#900" />
                    <Text>icons</Text>
                  </>
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
                  <Button onPress={el => onPressLogout()} title="Logout">
                    <Text>Logout</Text>
                  </Button>
                </Stack>
              </Box>
            </Box>

            <View>
              {isHistoryLoaded ? (
                <View style={{paddingTop: 35}}>
                  <Text
                    style={{
                      textAlign: 'center',
                      marginBottom: 20,
                      fontSize: 24,
                    }}>
                    Order History
                  </Text>
                  {orderHistory && orderHistory.length ? (
                    <Stack>
                      {orderHistory.map(order => (
                        <Stack key={order.reference}>
                          <Stack>
                            <Text>Ref.: </Text>
                            <Text>{order.reference}</Text>
                          </Stack>
                          <Stack>
                            <Text>
                              {parseFloat(order.total_paid_tax_incl).toFixed(2)}{' '}
                              {Config.currency}
                            </Text>
                          </Stack>
                        </Stack>
                      ))}
                    </Stack>
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
                </View>
              ) : (
                <View
                  style={{
                    flex: 100,
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexGrow: 2,
                    height: 100,
                  }}>
                  <Spinner color="green" />
                </View>
              )}
            </View>
          </>
        ) : (
          <SafeAreaView>
            <ScrollView contentInsetAdjustmentBehavior="automatic">
              <View>
                {showRegister ? null : (
                  <View>
                    <TouchableOpacity onPress={el => swapScreen()}>
                      <Text>Don't have an account yet? Register now!</Text>
                    </TouchableOpacity>

                    <Login />
                  </View>
                )}
                {showRegister ? (
                  <View>
                    <TouchableOpacity onPress={el => swapScreen()}>
                      <Text>Have an account already? Login instead!</Text>
                    </TouchableOpacity>

                    <Register />
                  </View>
                ) : null}
              </View>
            </ScrollView>
          </SafeAreaView>
        )}
      </View>
    </ScrollView>
  );
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
