import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Category from '../screens/Category';
import Categories from '../screens/Categories';
import Auth from '../screens/Auth';
import Cart from '../screens/Cart';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const CategoryStack = createStackNavigator();

const CategoryStackScreen = props => {
    return (
      <CategoryStack.Navigator>
        <CategoryStack.Screen
          name="Categories"
          component={Categories}
          options={{ tabBarLabel: 'Categories' }}
        />
        <CategoryStack.Screen
          name="Category"
          component={Category}
          options={{ tabBarLabel: 'Category' }}
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
    </CategoryStack.Navigator>
  );
}
const tabBar = props => (
      <Tab.Navigator>
        <Tab.Screen name="Profile" component={UserStackScreen} />
        <Tab.Screen name="Categories" component={CategoryStackScreen} />
        <Tab.Screen name="Cart" component={CartStackScreen} />
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