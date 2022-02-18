import 'react-native-gesture-handler';
import 'react-native-reanimated';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {
  NativeBaseProvider,
  Button,
  Box,
  HamburgerIcon,
  Pressable,
  Heading,
  VStack,
  Text,
  Center,
  HStack,
  Divider,
  Icon,
  QuestionOutlineIcon,
} from 'native-base';
import Auth from '../screens/Auth';
import {connect} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';

import Category from '../screens/Category';
import Categories from '../screens/Categories';
import Product from '../screens/Product';
const CategoryStack = createStackNavigator();

const CategoryStackScreen = props => {
  return (
    <CategoryStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white',
        },
      }}>
      <CategoryStack.Screen
        name="Categories"
        component={Categories}
        options={{title: 'Categories'}}
      />
      <CategoryStack.Screen
        name="Category"
        component={Category}
        options={{title: 'Category'}}
      />
      <CategoryStack.Screen
        name="Product"
        component={Product}
        options={{title: 'Product'}}
      />
    </CategoryStack.Navigator>
  );
};

const Drawer = createDrawerNavigator();
function Component(props) {
  return (
    <Center>
      <Text mt="12" fontSize="18">
        This is {props.route.name} page.
      </Text>
    </Center>
  );
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props} safeArea>
      <VStack space="6" my="2" mx="1">
        <Box px="4">
          <Text bold color="gray.700">
            My profile
          </Text>
          <Text fontSize="14" mt="1" color="gray.500" fontWeight="500">
            Welcome
          </Text>
        </Box>
        <VStack divider={<Divider />} space="4">
          <VStack space="3">
            {props.state.routeNames.map((name, index) => (
              <Pressable
              key={index}
                px="5"
                py="3"
                rounded="md"
                bg={
                  index === props.state.index
                    ? 'rgba(6, 182, 212, 0.1)'
                    : 'transparent'
                }
                onPress={event => {
                  props.navigation.navigate(name);
                }}>
                <HStack space="7" alignItems="center">
                  <QuestionOutlineIcon size="4" baseStyle={{marginRight: 15}} />
                  <Text
                    fontWeight="500"
                    color={
                      index === props.state.index ? 'primary.500' : 'gray.700'
                    }>
                    {name}
                  </Text>
                </HStack>
              </Pressable>
            ))}
          </VStack>
        </VStack>
      </VStack>
    </DrawerContentScrollView>
  );
}
export const DrawerMenuCategories = props => {
  console.log('drawer props: ', props);
  return (
    <Box safeArea flex={1}>
      <Drawer.Navigator
        drawerContent={props => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="AllCategories" component={CategoryStackScreen} />
      </Drawer.Navigator>
    </Box>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DrawerMenuCategories);
