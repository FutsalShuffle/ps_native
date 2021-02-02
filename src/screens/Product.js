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
  StyleSheet,
  useWindowDimensions
} from 'react-native';
import {getProduct} from '../actions/categoryManagement';
import {addToCart} from '../actions/cartManagement';
import {connect} from 'react-redux';
import { useIsFocused } from "@react-navigation/native";
import { Container, Content, Text, Spinner, Button, Icon } from 'native-base';
import AjaxProvider from '../providers/AjaxProvider';
import { SliderBox } from "react-native-image-slider-box";
import Config from '../../Config';
import HTML from "react-native-render-html";


const Product = (props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const isFocused = useIsFocused();
  const [product, setProduct] = useState([]);
  const [images, setImages] = useState([]);
  const [isInFav, setInFav] = useState(false);
  const styles = StyleSheet.create({
    productInfo: {
      flex:1,
      flexDirection:'row',
      justifyContent:'space-between',
      padding:10,
      flexGrow:2
    },
    productPrice: {
      fontSize:24,
      padding: 5,
      flex:1
    },
    loadSpinner: {
     flex:100, 
     alignItems:'center',
     justifyContent: 'center',
     flexGrow:2, 
     height:100
    }
  });

  const contentWidth = useWindowDimensions().width;

  useEffect(() => {
    let cleanupFunction = false;
    async function initLoadProduct() {
        let product = await AjaxProvider('/product?id_product='+props.route.params.id_product);
        if (product && product.product) {
          if(!cleanupFunction) {
            props.navigation.setOptions({ title: product.product.name });
            setProduct(product.product);
            setImages(product.images);
            setIsLoaded(true);
            getImages();
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

  const getImages = () => {
    if (!images && images === undefined) return [];
    let imgarr = [];
    images.forEach((image => {
      imgarr.push('http://lelerestapi.na4u.ru/'+image['id_image']+'-large_default/'+product.link_rewrite+'.jpg');
    }));
    return imgarr;
  }

  return (
    <Container>
      <Content>
      {
        isLoaded ?
          <View>
            <SliderBox sliderBoxHeight={400} images={getImages()} />
            <View style={styles.productInfo}>
              <Text style={styles.productPrice}>{parseFloat(product.price).toFixed(2)} {Config.currency}</Text>
              <Button
                style={{flex:1, flexGrow:1}}
                onPress={el => addToCart(product.id_product, product.id_product_attribute)}
                accessibilityLabel="Add to cart"
                ><Text style={{width:'100%',textAlign:'center'}}>Add to cart</Text></Button>
            </View>
              <Icon name="heart" style={{ color: isInFav ? 'red': 'gray', textAlign:'right', fontSize:32, paddingRight:15 }} />
            <View>
              <HTML containerStyle={{padding: 15}} source={{html: product.description}} contentWidth={contentWidth} />
            </View>
          </View>
          : 
          <View style={styles.loadSpinner}>
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
