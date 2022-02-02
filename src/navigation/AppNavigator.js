import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Category from '../screens/Category';
import Categories from '../screens/Categories';
import Index from '../screens/Index';
import Auth from '../screens/Auth';
import Cart from '../screens/Cart';
import Order from '../screens/Order';
import FavouriteProducts from '../screens/FavouriteProducts';
import Product from '../screens/Product';
import DrawerMenu from './DrawerMenu';
import {createStackNavigator} from '@react-navigation/stack';
import {Icon, Badge} from 'native-base';
import {connect} from 'react-redux';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
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

const UserStackScreen = props => {
  return (
    <CategoryStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white',
        },
      }}>
      <CategoryStack.Screen name="Profile" component={Auth} />
    </CategoryStack.Navigator>
  );
};
const CartStackScreen = props => {
  return (
    <CategoryStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white',
        },
      }}>
      <CategoryStack.Screen name="Cart" component={Cart} />
      <CategoryStack.Screen name="Order" component={Order} />
    </CategoryStack.Navigator>
  );
};
const tabBar = props => (
  <Tab.Navigator>
    <Tab.Screen
      name="Profile"
      component={UserStackScreen}
      options={{
        tabBarIcon: ({color}) => <Icon name="person" />,
      }}
    />
    <Tab.Screen
      name="Favourites"
      component={FavouriteProducts}
      options={{
        tabBarIcon: ({color}) => <Icon name="star" />,
      }}
    />
    <Tab.Screen
      name="Home"
      component={Index}
      options={{
        tabBarIcon: ({color}) => <Icon name="home" />,
      }}
    />
    <Tab.Screen
      name="Categories"
      component={CategoryStackScreen}
      options={{
        tabBarIcon: ({color}) => <Icon name="book" />,
      }}
    />
    <Tab.Screen
      name="Cart"
      component={CartStackScreen}
      options={{
        tabBarIcon: ({color}) => <Icon name="cart" />,
      }}
    />
  </Tab.Navigator>
);

export const AppNavigator = props => {
  console.log('navigator: ', props);
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={Tab}
        screenOptions={{
          headerShown: false,
          cardStyle: {
            backgroundColor: 'white',
          },
        }}>
        {props.isLoggedIn ? (
          <>
            <Stack.Screen
              name="Tab"
              component={tabBar}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ProtectedScreen"
              component={DrawerMenu}
              options={{headerShown: false}}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="LoginScreen" component={Auth} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
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

export default connect(mapStateToProps, mapDispatchToProps)(AppNavigator);
