/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {View, Text, TextInput} from 'react-native';
import {
  Center,
  Button,
  Heading,
  Box,
  VStack,
  Input,
  FormControl,
  useColorModeValue,
} from 'native-base';

import {connect} from 'react-redux';
import {registerUser} from '../actions/userManagement';

const Register = props => {
  const colorScheme = useColorModeValue('yellow.500', 'green.300');
  const darkModeScheme = useColorModeValue('info.50', 'info.800');
  const variant = useColorModeValue('solid', 'outline');
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
    <Box
      safeAreaTop
      width="90%"
      alignSelf="center"
      bg={darkModeScheme}>
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
        <Button mt="2" colorScheme="orange" onPress={el => onPressRegister()}>
          Sign up
        </Button>
        <Text>{props.errors ? props.errors : null}</Text>
      </VStack>
    </Box>
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
