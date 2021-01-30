import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Category from '../screens/Category';
import Categories from '../screens/Categories';
import Auth from '../screens/Auth';
import Cart from '../screens/Cart';
import Order from '../screens/Order';
import Product from '../screens/Product';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon, Badge } from 'native-base';
import {
  View,
  Text
} from 'react-native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const CategoryStack = createStackNavigator();

const CategoryStackScreen = props => {
    return (
      <CategoryStack.Navigator>
        <CategoryStack.Screen
          name="Categories"
          component={Categories}
          options={{ title: 'Categories' }}
        />
        <CategoryStack.Screen
          name="Category"
          component={Category}
          options={{ title: 'Category' }}
        />
        <CategoryStack.Screen
          name="Product"
          component={Product}
          options={{ title: 'Product' }}
        />
      </CategoryStack.Navigator>
    );
}

const UserStackScreen = props => {
    return (
      <CategoryStack.Navigator>
        <CategoryStack.Screen
          name="Profile"
          component={Auth}
        />
      </CategoryStack.Navigator>
    );
}
const CartStackScreen = props => {
  return (
    <CategoryStack.Navigator>
      <CategoryStack.Screen
        name="Cart"
        component={Cart}
      />
    <CategoryStack.Screen
        name="Order"
        component={Order}
      />
    </CategoryStack.Navigator>
  );
}
const tabBar = props => (
      <Tab.Navigator>
        <Tab.Screen name="Profile" component={UserStackScreen} options={{
          tabBarIcon: ({color}) => (
            <Icon name='person'/>
          ),
        }} />
        <Tab.Screen name="Categories" component={CategoryStackScreen} options={{
          tabBarIcon: ({color}) => (
            <Icon name='book'/>
          ),
        }}/>
        <Tab.Screen name="Cart"  component={CartStackScreen} options={{
          tabBarIcon: ({color}) => (
            <Icon name='cart'/>
          ),
        }} />
      </Tab.Navigator>
);

  export default function AppNavigator() {
    return (
        <NavigationContainer>
                <Stack.Navigator headerMode="false" initialRouteName={Tab}>
                    <Stack.Screen name="Tab" component={tabBar} />
                </Stack.Navigator>
        </NavigationContainer>
    );
  }