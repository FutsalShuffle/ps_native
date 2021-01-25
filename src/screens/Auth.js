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

import Login from '../components/Login';
import Register from '../components/Register';


const Auth = ({navigation}) => {
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
    }
  });

  return (
    <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
            <View style={styles.container}>
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
    </ScrollView>
    </SafeAreaView>
  );
};

export default Auth;
