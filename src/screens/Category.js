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


const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'white',
  },
});
const Category = ({ route, navigation}) => {
  const [categoryData, setCategoryProducts] = useState([]);
  const [errors, setError] = useState('');
  const [cart, setCart] = useState([]);

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
  }, [route.params.id_category]);

   const getProducts = async () => {
    try {
      let response = await fetch(
        Config.API + '/category?id_category='+route.params.id_category
      );
      let json = await response.json();
      if (!json.success) setError(json[0]);
      else setCategoryProducts(json.products);
    } catch (error) {
      console.error(error);
    }
  }

  const addToCart = async (id_product, id_product_attribute) => {
    try {
      let response = await fetch(
        Config.API + '/racart?id_product='+id_product+'&quantity=1&id_product_attribute='+id_product_attribute+'&method=addToCart',
        {
          headers: {
            'Authorization': 'Bearer '+Config.token
          },
        }
      );
      let json = await response.json();
      if (!json.success) setError(json[0]);
      else setCart(json.cart);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View>
              {
                categoryData.map(product => (
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

export default Category;
