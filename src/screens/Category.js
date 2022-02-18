/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {useColorModeValue, Spinner, View, ScrollView, Box} from 'native-base';
import AjaxProvider from '../providers/AjaxProvider';
import ProductMiniature from '../components/Miniatures/Product';
import FooterNav from '../navigation/FooterNav';
import HeaderNav from '../navigation/HeaderNav';
const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'white',
  },
});
const Category = props => {
  const colorScheme = useColorModeValue('yellow.500', 'green.300');
  const darkModeScheme = useColorModeValue('info.50', 'info.800');
  const variant = useColorModeValue('solid', 'outline');

  const [isLoaded, setIsLoaded] = useState(false);
  const isFocused = useIsFocused();
  const [products, setProducts] = useState([]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    tinyLogo: {
      width: '100%',
      height: '65%',
      resizeMode: 'cover',
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
    },
  });

  useEffect(() => {
    let cleanupFunction = false;
    async function initLoadCategory() {
      let category = await AjaxProvider(
        '/category?id_category=' + props.route.params.id_category,
      );
      console.log('category screen:', category);
      if (category && category.products) {
        if (!cleanupFunction) {
          if (category.category.name[1])
            props.navigation.setOptions({title: category.category.name[1]});
          setProducts(category.products);
          setIsLoaded(true);
        }
      }
    }
    initLoadCategory();
    return () => (cleanupFunction = true);
  }, [isFocused]);

  return (
    <Box
      flex={1}
      safeAreaTop
      width="100%"
      alignSelf="center"
      bg={darkModeScheme}>
      <HeaderNav navigation={props.navigation} />
      {isLoaded ? (
        <SafeAreaView>
          <ScrollView contentInsetAdjustmentBehavior="automatic">
            <View style={styles.container}>
              {products && products !== undefined
                ? products.map(product => (
                    <ProductMiniature
                      product={product}
                      key={product.id_product}
                      onClick={() =>
                        props.navigation.navigate('Product', {
                          id_product: product.id_product,
                        })
                      }
                    />
                  ))
                : null}
            </View>
          </ScrollView>
        </SafeAreaView>
      ) : (
        <View
          style={{
            flex: 100,
            alignItems: 'center',
            justifyContent: 'center',
            flexGrow: 2,
            height: 100,
          }}>
          <Spinner color="green" />
        </View>
      )}
      <FooterNav navigation={props.navigation} selected={0} />
    </Box>
  );
};

export default Category;
