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
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import Config from '../../Config';

const Cart = (props) => {
  console.log(props.cart);
  const styles = StyleSheet.create({
    container: {
      paddingTop: 80,
      alignItems:'center',
      flex: 1,
    },
    productName: {
      fontSize: 18,
    }
  });

  const calculateTotal = () => {
    if (!props.cart) return null;
    let summ = 0;
    props.cart.forEach((product) => {
      summ+= product.price_with_reduction * product.cart_quantity;
    })
    return summ.toFixed(2);
  }

  //аттрибут : attribute_small, название категории: category, название: product.name, кол-во в корзине: product.cart_quantity
  return (
    <View>
    {props.cart.length ?
    <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic">
            <View style={styles.container}>
                { 
                  props.cart.map(product => (
                    <View key={product.name}>
                      <Text style={styles.productName}>{product.name} {product.price_with_reduction}{Config.currency}x{product.cart_quantity}</Text>
                      <View
                        style={{
                        borderBottomColor: 'black',
                        borderBottomWidth: 1,
                      }}/>
                    </View>
                  ))
                }
                <Text style={{paddingTop:50}}>Total: {calculateTotal()} {Config.currency}</Text>
            </View>
        </ScrollView>
    </SafeAreaView>
    : 
    <View style={styles.container}>
      <Text>Your cart is empty</Text> 
    </View>
    }
    </View>            
  );
};
const mapStateToProps = (state) => {
  return {
    cart: state.cart.cart,
  }
}

export default connect(mapStateToProps)(Cart);
