/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {Text, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import AjaxProviderLogged from '../providers/AjaxProviderLogged';
import {
  Container,
  Content,
  FormControl,
  Item,
  Select,
  Input,
  Label,
  Button,
  Box,
} from 'native-base';
import {getCart} from '../actions/cartManagement';

const Order = props => {
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [address, setAddress] = useState(0);
  const [phone, setPhone] = useState('');
  const [zipcode, setZipcode] = useState('');

  const onPressMakeOrder = async () => {
    let response = await AjaxProviderLogged(
      '/pwexpressorder?city=' +
        city +
        '&address=' +
        address +
        '&phone=' +
        phone +
        '&zipcode=' +
        zipcode +
        '&country=' +
        country,
    );
    if (response.success) {
      alert('made an order!');
    }
    props.getCart();
  };

  return (
    <Box>
      <Box>
        <SafeAreaView>
          <ScrollView contentInsetAdjustmentBehavior="automatic">
            <Box>
              <FormControl isRequired>
                <FormControl.Label>City*</FormControl.Label>
                <Input onChangeText={text => setCity(text)} />
              </FormControl>

              <Select
                placeholder="Country"
                selectedValue={country}
                onValueChange={el => setCountry(el)}>
                {props.availableCountries
                  ? Object.values(props.availableCountries).map(country => (
                      <Select.Item
                        key={country['id_country']}
                        label={country['country']}
                        value={country['id_country']}
                      />
                    ))
                  : null}
              </Select>

              <FormControl>
                <FormControl.Label>Zip code*</FormControl.Label>
                <Input onChangeText={text => setZipcode(text)} />
              </FormControl>
              <FormControl>
                <FormControl.Label>Address*</FormControl.Label>
                <Input onChangeText={text => setAddress(text)} />
              </FormControl>
              <FormControl>
                <FormControl.Label>Phone number*</FormControl.Label>
                <Input onChangeText={text => setPhone(text)} />
              </FormControl>

              <Button
                onPress={() => onPressMakeOrder()}>
                <Text>Place an order</Text>
              </Button>
            </Box>
          </ScrollView>
        </SafeAreaView>
      </Box>
    </Box>
  );
};
const mapStateToProps = state => {
  return {
    cart: state.cart.cart,
    availableCountries: state.order.availableCountries,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getCart: () => dispatch(getCart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Order);
