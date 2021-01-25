/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button
} from 'react-native';

import {connect} from 'react-redux';
import {loginUser} from '../actions/userManagement';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const onPressLogin = async () => {
    props.login({
      email: email,
      password: password
    });
  }


  return (
    <>
     <View>
        <View>
            <Text> Email* </Text>
            <TextInput
              placeholder="your@email.com"
              onChangeText={text => setEmail(text)}
              style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            />
          </View>
          <View>
              <Text> Password* </Text>
              <TextInput
                  placeholder="Password"
                  onChangeText={text => setPassword(text)}
                  secureTextEntry={true}
                  style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
              />
          </View>
          <View>
            <Button
              onPress={onPressLogin}
              title="Login"
              color="#841584"
              accessibilityLabel="Press to login"
            />
          </View>
          <View>
            <Text>{props.errors ? props.errors : null}</Text>
          </View>
        </View>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    customer: state.customer.customer,
    isLoggedIn: state.customer.isLoggedIn,
    errors: state.customer.errors
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    login: (payload) => dispatch(loginUser(payload)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);

 