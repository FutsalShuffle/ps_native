import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import {
  Box,
  HStack,
  IconButton,
  StatusBar,
  Text,
  useColorModeValue,
} from 'native-base';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const CategoryStack = createStackNavigator();

const HeaderNav = props => {
  const colorScheme = useColorModeValue('yellow.500', 'green.300');
  const darkModeScheme = useColorModeValue('info.50', 'info.800');
  console.log('navigator: ', props);
  return (
    <>
      <StatusBar bg={darkModeScheme} />
      <Box safeAreaTop bg={darkModeScheme} />
      <HStack
        bg={darkModeScheme}
        px="1"
        py="3"
        justifyContent="space-between"
        alignItems="center"
        w="100%"
        maxW="350">
        <HStack alignItems="center">
          <IconButton
            onPress={() => {
              props.navigation.goBack();
            }}
            icon={
              <Icon name="arrow-circle-left" size={25} color="darkorange" />
            }
          />
          <Text fontSize="20" fontWeight="bold">
            Home
          </Text>
        </HStack>
        <HStack>
          <IconButton
            icon={<Icon name="search" size={25} color="darkorange" />}
          />
          <IconButton
            icon={<Icon name="home" size={25} color="darkorange" />}
          />
          <IconButton
            icon={<Icon name="ellipsis-v" size={25} color="darkorange" />}
          />
        </HStack>
      </HStack>
    </>
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

export default connect(mapStateToProps, mapDispatchToProps)(HeaderNav);
