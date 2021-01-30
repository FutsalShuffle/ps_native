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
import Config from '../../Config';
import {getCategory} from '../actions/categoryManagement';
import {addToCart} from '../actions/cartManagement';
import {connect} from 'react-redux';
import { useIsFocused } from "@react-navigation/native";
import { Container, Content, Text, Spinner } from 'native-base';


const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'white',
  },
});
const Category = (props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const isFocused = useIsFocused();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      flexWrap:'wrap',
    },
    tinyLogo: {
      width: '100%',
      height: '65%',
      resizeMode: 'cover'
      
    },
    logo: {
      width: 66,
      height: 58,
    },
    product: {
      width: '50%',
      height: 300,
      padding: 15,
      textAlign: 'center',
    }
  });

  useEffect(() => {
    let cleanupFunction = false;
    async function initLoadCategory() {
      if(!cleanupFunction) {
        setIsLoaded(false);
        await props.getCategory(props.route.params.id_category);
        setIsLoaded(true);
      }
    }
    initLoadCategory();
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
            <View style={styles.container}>
            { props.categoryProducts && props.categoryProducts !== undefined && props.categoryProducts.length ?
                  props.categoryProducts.map(product => (
                    <View style={styles.product} key={product.id_product}>
                        <Image 
                        style={styles.tinyLogo}
                        source={{
                            uri: 'http://lelerestapi.na4u.ru/'+product.cover_image_id+'-home_default/'+product.link_rewrite+'.jpg'
                        }}
                      />
                        <Text onPress={() => props.navigation.navigate('Product', { id_product: product.id_product })}>{product.name}</Text>
                        <Text>{product.price} {Config.currency}</Text>
                        <View>
                          <Button
                            onPress={el => addToCart(product.id_product, product.id_product_attribute)}
                            title="Add to cart"
                            color="green"
                            accessibilityLabel="Add to cart"
                            />
                          </View>
                    </View>
                  ))
                : null}
              </View>
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
