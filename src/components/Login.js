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
  Text,
} from 'react-native';
import {  Button, Form, Item, Input, Label } from 'native-base';

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
 
          <Form style={{paddingTop:10}}>
            <Item fixedLabel>
              <Label>Email*</Label>
              <Input 
              onChangeText={text => setEmail(text)} />
            </Item>
            <Item fixedLabel>
              <Label>Password*</Label>
              <Input 
              secureTextEntry={true}
              onChangeText={text => setPassword(text)} />
            </Item>

            <Button style={{marginTop:25}} onPress={onPressLogin} block info>
                <Text>Login</Text>
            </Button>

            <Text>{props.errors ? props.errors : null}</Text>

          </Form>
     
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

 