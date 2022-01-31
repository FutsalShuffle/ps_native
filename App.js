import React, { useState, useEffect } from 'react';
import {
  StatusBar, View
} from 'react-native';

import AppNavigator from './src/navigation/AppNavigator';
import { connect } from 'react-redux';
import { verifyUser } from './src/actions/userManagement';
import { getCart } from './src/actions/cartManagement';
import { getCategories } from './src/actions/categoryManagement';
import { getFavList } from './src/actions/favProductsManagement';

import { Root, Spinner } from "native-base";
import { getAvailableCountries } from './src/actions/orderManagement';


const mapStateToProps = (state) => {
  return {
    customer: state.customer,
    isLoggedIn: state.isLoggedIn,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    verify: (payload) => dispatch(verifyUser(payload)),
    getCategories: () => dispatch(getCategories()),
    getCart: () => dispatch(getCart()),
    getFavList: () => dispatch(getFavList()),
    getAvailableCountries: () => dispatch(getAvailableCountries()),
  }
}

const App = (props) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function initLoadApp() {
      await props.verify();
      await props.getCategories();
      await props.getFavList();
      setIsLoaded(true);
    }
    initLoadApp()
  }, []);

  useEffect(() => {
    props.getCart();
    props.getAvailableCountries();
  }, [props.isLoggedIn]);

  return (
    <>
      {
        isLoaded ?
          <AppNavigator />
          :
          <View style={{ flex: 100, alignItems: 'center', justifyContent: 'center', flexGrow: 2, height: 100 }}>
            <Spinner color='green' />
          </View>
      }
    </>
  );
};


export default connect(mapStateToProps, mapDispatchToProps)(App);

