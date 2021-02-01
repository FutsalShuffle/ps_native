/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  Image, StyleSheet,
  SafeAreaView,
  ScrollView, Button
} from 'react-native';
import {getProduct} from '../actions/categoryManagement';
import {addToCart} from '../actions/cartManagement';
import {connect} from 'react-redux';
import { useIsFocused } from "@react-navigation/native";
import { Container, Content, Text, Spinner } from 'native-base';
import AjaxProvider from '../providers/AjaxProvider';


const Product = (props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const isFocused = useIsFocused();
  const [product, setProduct] = useState([]);
  const styles = StyleSheet.create({

  });

  useEffect(() => {
    let cleanupFunction = false;
    async function initLoadProduct() {
        let product = await AjaxProvider('/product?id_product='+props.route.params.id_product);
        if (product && product.product) {
          console.log(product);
          if(!cleanupFunction) {
            props.navigation.setOptions({ title: product.product.name });
            setProduct(product.product);
            setIsLoaded(true);
          }
        }
    }
    initLoadProduct();
    return () => cleanupFunction = true;
  }, [isFocused]);

  const addToCart = async (id_product, id_product_attribute) => {
    props.addToCart({
      id_product: id_product,
      id_product_attribute: id_product_attribute,
    })
    
  }

  return (
    <Container>
      <Content>
      {
        isLoaded ?
          <SafeAreaView>
            <ScrollView contentInsetAdjustmentBehavior="automatic">
            
            </ScrollView>
          </SafeAreaView>


          : 
          <View style={{flex:100, alignItems:'center',justifyContent: 'center',flexGrow:2, height:100}}>
           <Spinner color='green' />
         </View>
      }
      </Content> 
    </Container>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (payload) => dispatch(addToCart(payload)),
    getProduct: (payload) => dispatch(getProduct(payload)),
  }
}
export default connect(null, mapDispatchToProps)(Product);
