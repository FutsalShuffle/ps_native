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
  TextInput
} from 'react-native';
import {connect} from 'react-redux';
import AjaxProviderLogged from '../providers/AjaxProviderLogged';
import { Container, Content, Form, Item, Picker, Input, Label, Button, Left } from 'native-base';
import { getCart } from '../actions/cartManagement';



const Order = (props) => {
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [address, setAddress] = useState(0);
  const [phone, setPhone] = useState('');
  const [zipcode, setZipcode] = useState('');

  const styles = StyleSheet.create({
    container: {
      paddingTop: 80,
      flex: 10,
    },
  });

  const onPressMakeOrder = async () => {
    let response = await AjaxProviderLogged('/pwexpressorder?city='+city+'&address='+address+'&phone='+phone+'&zipcode='+zipcode+'&country='+country);
    if (response.success) {
      alert('made an order!');
    }
    props.getCart();
  }

  return (
    <Container>
      <Content>
        <SafeAreaView>
            <ScrollView
              contentInsetAdjustmentBehavior="automatic">
                <Form style={styles.container}>
                <Item fixedLabel>
                  <Label>City*</Label>
                    <Input 
                    onChangeText={text => setCity(text)} />
                </Item>

                  <Item picker>
                    <Left>
                        <Text style={{paddingLeft:15, color:'lightgray',fontSize:16}}>Country*</Text>
                    </Left>
                 
                    <Picker
                      placeholder="Country"
                      selectedValue={country}
                      onValueChange={(el) => setCountry(el)}
                    >
                      {
                        props.availableCountries ?
                        Object.values(props.availableCountries).map(country => (
                          <Picker.Item key={country['id_country']} label={country['country']} value={country['id_country']} />
                        ))
                        : null
                      }
                    </Picker>
                  </Item>
                 
                  <Item fixedLabel>
                    <Label>Zip code*</Label>
                      <Input 
                      onChangeText={text => setZipcode(text)} />
                  </Item>
                  <Item fixedLabel>
                    <Label>Address*</Label>
                      <Input 
                      onChangeText={text => setAddress(text)} />
                  </Item>
                  <Item fixedLabel>
                    <Label>Phone number*</Label>
                      <Input 
                      onChangeText={text => setPhone(text)} />
                  </Item>
                  
                    <Button style={{marginTop:15}} full rounded success
                      onPress={() => onPressMakeOrder()}><Text>Place an order</Text></Button>
                  
                  </Form>
            </ScrollView>
        </SafeAreaView>
        </Content>
    </Container>            
  );
};
const mapStateToProps = (state) => {
  return {
    cart: state.cart.cart,
    availableCountries: state.order.availableCountries,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getCart: () => dispatch(getCart())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Order);