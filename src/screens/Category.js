/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  Image, StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Config from '../../Config';
import {getCategory} from '../actions/categoryManagement';
import {addToCart} from '../actions/cartManagement';
import {connect} from 'react-redux';


const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'white',
  },
});
const Category = (props) => {


  const styles = StyleSheet.create({
    container: {
      paddingTop: 50,
      flex: 1,
      alignItems : 'center'
    },
    tinyLogo: {
      width: 100,
      height: 100,
    },
    logo: {
      width: 66,
      height: 58,
    },
  });

  useEffect(() => {
    getProducts();
  }, [props.route.params.id_category]);

   const getProducts = () => {
    props.getCategory(props.route.params.id_category);
  }

  const addToCart = async (id_product, id_product_attribute) => {
    props.addToCart({
      id_product: id_product,
      id_product_attribute: id_product_attribute,
    })
  }

  return (
    <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View>
              {
                props.categoryProducts.map(product => (
                  <View key={product.id_product} style={styles.container}>
                    <Image 
                    style={styles.tinyLogo}
                    source={{
                        uri: 'http://lelerestapi.na4u.ru/'+product.cover_image_id+'-home_default/'+product.link_rewrite+'.jpg'
                    }}
                    />
                    <Text>{product.name}</Text>
                    <Button
                      onPress={el => addToCart(product.id_product, product.id_product_attribute)}
                      title="Add to cart"
                      color="#841584"
                      accessibilityLabel="Add to cart"
                    />
                  </View>
                ))
              }
              </View>
          </ScrollView>
      </SafeAreaView>
  );
};
const mapStateToProps = (state) => {
  return {
    categoryProducts: state.categories.category,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (payload) => dispatch(addToCart(payload)),
    getCategory: (payload) => dispatch(getCategory(payload)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Category);
