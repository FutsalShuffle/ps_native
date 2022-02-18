/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  useWindowDimensions,
  TouchableHighlight,
} from 'react-native';
import {getProduct} from '../actions/categoryManagement';
import {addToCart} from '../actions/cartManagement';
import {AddToFavourite} from '../actions/favProductsManagement';
import {connect} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {Text, Spinner, Button, Icon} from 'native-base';
import AjaxProvider from '../providers/AjaxProvider';
import {SliderBox} from 'react-native-image-slider-box';
import Config from '../../Config';
import HTML from 'react-native-render-html';
import {Select} from 'native-base';
import CustomHtmlContainer from '../components/CustomHtmlContainer';

const Product = props => {
  const [isLoaded, setIsLoaded] = useState(false);
  const isFocused = useIsFocused();
  const [product, setProduct] = useState([]);
  const [images, setImages] = useState([]);
  const [selectedCombination, setSelectedCombination] = useState(0);
  const [productCombinations, setCombination] = useState([]);
  const [isInFav, setIsInFav] = useState(false);
  const styles = StyleSheet.create({
    productInfo: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 10,
      flexGrow: 2,
    },
    productPrice: {
      fontSize: 24,
      padding: 5,
      flex: 1,
    },
    loadSpinner: {
      flex: 100,
      alignItems: 'center',
      justifyContent: 'center',
      flexGrow: 2,
      height: 100,
    },
  });

  const contentWidth = useWindowDimensions().width;

  useEffect(() => {
    let cleanupFunction = false;
    async function initLoadProduct() {
      let product = await AjaxProvider(
        '/product?id_product=' + props.route.params.id_product,
      );
      if (product && product.product) {
        if (!cleanupFunction) {
          props.navigation.setOptions({title: product.product.name});
          setCombination(product.combinations);
          setProduct(product.product);
          setImages(product.images);
          setIsLoaded(true);
        }
      }
    }
    initLoadProduct();
    return () => (cleanupFunction = true);
  }, [isFocused]);

  useEffect(() => {
    let cleanupFunction = false;
    checkIfInFav();
    return () => (cleanupFunction = true);
  }, [props.favProducts]);

  const addToCart = async (id_product, id_product_attribute) => {
    props.addToCart({
      id_product: id_product,
      id_product_attribute: id_product_attribute ? id_product_attribute : null,
    });
  };

  const addToFav = async (id_product, id_product_attribute) => {
    props.AddToFavourite({
      id_product: id_product,
      id_product_attribute: id_product_attribute ? id_product_attribute : null,
    });
  };

  const checkIfInFav = () => {
    if (props.favProducts && props.favProducts.length) {
      props.favProducts.forEach(prod => {
        if (prod.id_product == product.id_product) {
          setIsInFav(true);
        }
      });
    }
  };

  const getImages = () => {
    if (!images && images === undefined) return [];
    let imgarr = [];
    images.forEach(image => {
      imgarr.push(
        Config.baseURI +
          image['id_image'] +
          '-large_default/' +
          product.link_rewrite +
          '.jpg',
      );
    });
    return imgarr;
  };

  const getProductPrice = price => {
    price = parseFloat(price);
    if (!selectedCombination) {
      setSelectedCombination(product['id_product_attribute']);
    }
    if (productCombinations !== undefined && productCombinations.length) {
      productCombinations.forEach(product2 => {
        if (product2['id_product_attribute'] == selectedCombination) {
          price += parseFloat(product2['price']);
        }
      });
    }
    if (price < 0) price = 0;

    return price.toFixed(2);
  };

  return (
    <>
      {isLoaded ? (
        <View>
          <SliderBox sliderBoxHeight={400} images={getImages()} />
          {productCombinations !== undefined && productCombinations.length ? (
            <View>
              <Select
                selectedValue={selectedCombination}
                onValueChange={el => setSelectedCombination(el)}
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}>
                {Object.values(productCombinations).map(combination => (
                  <Select.Item
                    key={combination['id_product_attribute']}
                    label={combination['attribute_designation']}
                    value={combination['id_product_attribute']}
                  />
                ))}
              </Select>
            </View>
          ) : null}
          <View style={styles.productInfo}>
            <Text style={styles.productPrice}>
              {getProductPrice(product.price)} {Config.currency}
            </Text>
            <Button
              style={{flex: 1, flexGrow: 1}}
              onPress={el => addToCart(product.id_product, selectedCombination)}
              accessibilityLabel="Add to cart">
              <Text style={{width: '100%', textAlign: 'center'}}>
                Add to cart
              </Text>
            </Button>
          </View>
          <Icon
            onPress={el => addToFav(product.id_product, selectedCombination)}
            name="heart"
            style={{
              color: isInFav ? 'red' : 'gray',
              textAlign: 'right',
              fontSize: 32,
              paddingRight: 15,
            }}
          />
          <View>
            <CustomHtmlContainer html={product.description} />
          </View>
        </View>
      ) : (
        <View style={styles.loadSpinner}>
          <Spinner color="green" />
        </View>
      )}
    </>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    addToCart: payload => dispatch(addToCart(payload)),
    AddToFavourite: payload => dispatch(AddToFavourite(payload)),
  };
};
const mapStateToProps = state => {
  return {
    favProducts: state.favProducts.products,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Product);
