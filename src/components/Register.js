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
import {registerUser} from '../actions/userManagement';

const Register = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [customer, setCustomer] = useState([]);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState([]);
  const [errors, setErrors] = useState('');

  const onPressRegister = async () => {
    props.register({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password
    })
  }
  return (
    <>
        <View>
            <Text> Firstname* </Text>
            <TextInput
              placeholder=""
              onChangeText={text => setFirstname(text)}
              style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            />
        </View>
        <View>
            <Text> Lastname* </Text>
            <TextInput
              placeholder=""
              onChangeText={text => setLastname(text)}
              style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            />
        </View>
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
              onPress={el => onPressRegister()}
              title="Login"
              color="#841584"
              accessibilityLabel="Press to login"
            />
          </View>
          <View>
            <Text>{props.errors ? props.errors : null}</Text>
          </View>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    customer: state.customer.customer,
    isLoggedIn: state.customer.isLoggedIn,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    register: (payload) => dispatch(registerUser(payload))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Register);
