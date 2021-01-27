/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Button,
  TextInput
} from 'react-native';
import {connect} from 'react-redux';
import Config from '../../Config';
import AjaxProviderLogged from '../providers/AjaxProviderLogged';

const Order = (props) => {
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [zipcode, setZipcode] = useState('');

  const styles = StyleSheet.create({
    container: {
      paddingTop: 80,
      flex: 10,
    },
  });

  const onPressMakeOrder = async () => {
    let response = await AjaxProviderLogged('/pwexpressorder?city='+city+'&address='+address+'&phone='+phone+'&zipcode='+zipcode);
    if (response.success) {
      alert('made an order!');
    }
  }

  return (
    <View>
    <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic">
            <View style={styles.container}>
            <View>
              <Text> City* </Text>
                <TextInput
                    placeholder="City"
                    onChangeText={text => setCity(text)}
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                />
            </View>
            <View>
              <Text> Country* </Text>
                <TextInput
                    placeholder="Country"
                    onChangeText={text => setCountry(text)}
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                />
            </View>
            <View>
              <Text> Zip code* </Text>
                <TextInput
                    placeholder="Zip code"
                    onChangeText={text => setZipcode(text)}
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                />
            </View>
            <View>
              <Text> Address* </Text>
                <TextInput
                    placeholder="Address"
                    onChangeText={text => setAddress(text)}
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                />
            </View>
            <View>
              <Text> Phone number* </Text>
                <TextInput
                    placeholder="Phone number"
                    onChangeText={text => setPhone(text)}
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                />
            </View>
            <View style={{flex: 4, paddintTop:15}}>
              <Button
                onPress={el => onPressMakeOrder()}
                title="Place your order"
                color="#841584"
                accessibilityLabel="Press to place an order"
              />
            </View>
          </View>
        </ScrollView>
    </SafeAreaView>
    </View>            
  );
};
const mapStateToProps = (state) => {
  return {
    cart: state.cart.cart,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logoutUser())
  }
}

export default connect(mapStateToProps)(Order);