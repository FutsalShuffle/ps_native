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
  TextInput,
} from 'react-native';
import { Container, Button, Content, Form, Item, Input, Label } from 'native-base';

import { connect } from 'react-redux';
import { registerUser } from '../actions/userManagement';

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
      <Form style={{ paddingTop: 10 }}>

        <Item fixedLabel>
          <Label>Firstname *</Label>
          <Input
            onChangeText={text => setFirstname(text)} />
        </Item>
        <Item fixedLabel>
          <Label>Lastname *</Label>
          <Input
            onChangeText={text => setLastname(text)} />
        </Item>
        <Item fixedLabel>
          <Label>Email *</Label>
          <Input
            onChangeText={text => setEmail(text)} />
        </Item>
        <Item fixedLabel>
          <Label>Password *</Label>
          <Input secureTextEntry={true}
            onChangeText={text => setPassword(text)} />
        </Item>

        <Button style={{ marginTop: 25 }} onPress={el => onPressRegister()} block info>
          <Text>Register</Text>
        </Button>

        <Text>{props.errors ? props.errors : null}</Text>

      </Form>
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
