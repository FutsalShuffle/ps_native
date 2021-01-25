import React, { useState, useEffect } from 'react';
import {
  StatusBar, View
} from 'react-native';

import AppNavigator from './src/navigation/AppNavigator';
import {connect} from 'react-redux';
import {verifyUser} from './src/actions/userManagement';
import {getCategories} from './src/actions/categoryManagement';

const mapStateToProps = (state) => {
  return {
    customer: state.customer,
    isLoggedIn: state.isLoggedIn
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    verify: (payload) => dispatch(verifyUser(payload)),
    getCategories: () => dispatch(getCategories()),
  }
}

const App = (props) => {

  useEffect(() => {
    props.verify();
    props.getCategories();
  }, []);

  return (
    <>
    <StatusBar barStyle="light-content" />
        <AppNavigator />
    </>
  );
};


export default connect(mapStateToProps, mapDispatchToProps)(App);

