import React, { useState, useEffect } from 'react';
import {
  StatusBar, View
} from 'react-native';

import AppNavigator from './src/navigation/AppNavigator';
import {connect} from 'react-redux';
import {verifyUser} from './src/actions/userManagement';
import {getCategories} from './src/actions/categoryManagement';
import { Root, Spinner } from "native-base";


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
  }
}

const App = (props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    async function initLoadApp() {
      await props.verify();
      await props.getCategories();
      setIsLoaded(true);
    }
    initLoadApp()
  }, []);

  return (
    <Root>
      {
        isLoaded ?
          <AppNavigator />
        :
        <View style={{flex:100, alignItems:'center',justifyContent: 'center',flexGrow:2, height:100}}>
          <Spinner color='green' />
         </View>
      }
    </Root>
  );
};


export default connect(mapStateToProps, mapDispatchToProps)(App);

