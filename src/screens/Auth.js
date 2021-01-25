/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import Login from '../components/Login';
import Register from '../components/Register';


const Auth = (props) => {
  const [showRegister, setShowRegister] = useState(0);

  const swapScreen = () => {
      if (!showRegister) setShowRegister(1);
      if (showRegister) setShowRegister(0);
  }
  const styles = StyleSheet.create({
    container: {
      paddingTop: 50,
      flex: 1,
      alignItems : 'center'
    },
    button: {
      paddingTop: 15
    },
    userscreen: {
      flex:1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: "#61dafb",
      paddingTop: 50,
      fontSize: 18,
    }
  });

  return (
    <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
            <View style={styles.container}>
              {props.isLoggedIn ? 
              <View style={styles.userscreen}>
                <Text>Welcome back, {props.customer.firstname} {props.customer.lastname}!</Text>
              </View>

              : <View>
                  {showRegister ? null :
                  <View>
                      <TouchableOpacity onPress={el => swapScreen()}> 
                          <Text>Don't have an account yet? Register now!</Text> 
                      </TouchableOpacity>
                      <View>
                          <Text>Login</Text>

                          <Login/>

                      </View>
                  </View>
                }
                {showRegister ? 
                  <View>
                      <TouchableOpacity onPress={el => swapScreen()}> 
                          <Text>Have an account already? Login instead!</Text> 
                      </TouchableOpacity>
                      <Text>Register</Text>
                      <Register/>
                  </View>
                : null}
              </View>
              }
            </View>
    </ScrollView>
    </SafeAreaView>
  );
};
const mapStateToProps = (state) => {
  console.log(state);
  return {
    customer: state.customer.customer,
    isLoggedIn: state.customer.isLoggedIn,
  }
}

export default connect(mapStateToProps)(Auth);
