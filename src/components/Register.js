/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {View, Text, TextInput} from 'react-native';
import {Center, Button, Heading, Box, VStack, Input, FormControl} from 'native-base';

import {connect} from 'react-redux';
import {registerUser} from '../actions/userManagement';

const Register = props => {
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
      password: password,
    });
  };
  return (
    <Center w="100%">
      <Box safeArea p="2" w="90%" maxW="290" py="8">
        <Heading
          size="lg"
          color="coolGray.800"
          _dark={{
            color: 'warmGray.50',
          }}
          fontWeight="semibold">
          Welcome
        </Heading>
        <Heading
          mt="1"
          color="coolGray.600"
          _dark={{
            color: 'warmGray.200',
          }}
          fontWeight="medium"
          size="xs">
          Sign up to continue!
        </Heading>
        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Name</FormControl.Label>
            <Input onChangeText={text => setFirstname(text)} />
          </FormControl>
          <FormControl>
            <FormControl.Label>Email</FormControl.Label>
            <Input onChangeText={text => setEmail(text)} />
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input type="password" onChangeText={text => setPassword(text)} />
          </FormControl>
          <FormControl>
            <FormControl.Label>Confirm Password</FormControl.Label>
            <Input type="password" />
          </FormControl>
          <Button mt="2" colorScheme="indigo" onPress={el => onPressRegister()}>
            Sign up
          </Button>
          <Text>{props.errors ? props.errors : null}</Text>
        </VStack>
      </Box>
    </Center>
  );
};

const mapStateToProps = state => {
  return {
    customer: state.customer.customer,
    isLoggedIn: state.customer.isLoggedIn,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    register: payload => dispatch(registerUser(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
