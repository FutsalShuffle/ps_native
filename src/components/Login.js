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
import { Button, Form, Item, Input, Label } from 'native-base';

import { connect } from 'react-redux';
import { loginUser } from '../actions/userManagement';

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
    <Form style={{ paddingTop: 10 }}>
      {props.errors && props.errors.email ?
        <Text style={{color:'red'}}>{props.errors.email}</Text>
      :null}
      <Item fixedLabel>
        <Label>Email*</Label>
        <Input
          onChangeText={text => setEmail(text)} />
      </Item>
      {props.errors && props.errors.password ?
        <Text style={{color:'red'}}>{props.errors.password}</Text>
      :null}
      <Item fixedLabel>
        <Label>Password*</Label>
        <Input
          secureTextEntry={true}
          onChangeText={text => setPassword(text)} />
      </Item>

      <Button style={{ marginTop: 25 }} onPress={onPressLogin} block info>
        <Text>Login</Text>
      </Button>

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

