/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Button
} from 'react-native';
import { connect } from 'react-redux';
import Config from '../../Config';
import { Container, Content, List, Footer, ListItem, Text, Icon, Left, Right, Thumbnail, Body, Badge } from 'native-base';
import { updateQty } from '../actions/cartManagement';

const Cart = (props) => {
  const styles = StyleSheet.create({
    container: {
      paddingTop: 80,
      alignItems: 'center',
      flex: 1,
    },
    productName: {
      fontSize: 16,
    },
  });

  const calculateTotal = () => {
    if (!props.cart) return null;
    let summ = 0;
    props.cart.forEach((product) => {
      summ += product.price_with_reduction * product.cart_quantity;
    })
    return summ.toFixed(2);
  }

  //аттрибут : attribute_small, название категории: category, название: product.name, кол-во в корзине: product.cart_quantity
  return (
    <Container>
      <Content>
        {props.cart && props.cart.length ?
          <View>
            <SafeAreaView>
              <ScrollView
                contentInsetAdjustmentBehavior="automatic">
                <List>
                  {
                    props.cart.map(product => (
                      <ListItem avatar key={product.id_product + '_' + product.id_product_attribute}>
                        <Left>
                          <Thumbnail source={{ uri: Config.baseURI + product.id_product + '-cart_default/' + product.link_rewrite + '.jpg' }} />
                        </Left>
                        <Body>
                          <Text>{product.name}</Text>
                          {product.attributes_small ? <Text style={{ color: 'gray' }}>{product.attributes_small}</Text> : null}
                          <Badge success><Text>{product.price_real} {Config.currency}</Text></Badge>
                        </Body>
                        <Right>
                          <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Icon style={{ fontSize: 32 }} name="add-circle" onPress={() => props.updateQty('up', product)} />
                            <Text style={{ fontSize: 23 }}>{product.cart_quantity}</Text>
                            <Icon style={{ fontSize: 32 }} name="remove-circle" onPress={() => props.updateQty('down', product)} />
                          </View>
                        </Right>
                      </ListItem>
                    ))
                  }
                </List>
              </ScrollView>
            </SafeAreaView>
            <View style={{ flex: 1, alignContent: 'center', backgroundColor: '#1ff', justifyContent: 'center', alignItems: 'center', marginTop: 15, height: 80 }}>
              <Text>Total: {calculateTotal()} {Config.currency}</Text>
              <Button
                onPress={() => props.navigation.navigate('Order')}
                title="Procceed with order"
                color="#ffffff"
                accessibilityLabel="place an order" />
            </View>
          </View>
          :
          <View style={styles.container}>
            <Text>Your cart is empty</Text>
          </View>
        }
      </Content>
    </Container>
  );
};
const mapStateToProps = (state) => {
  return {
    cart: state.cart.cart.cart,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    updateQty: (direction, payload) => dispatch(updateQty(direction, payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
