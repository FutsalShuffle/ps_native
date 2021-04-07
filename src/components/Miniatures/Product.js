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
  Image, StyleSheet,
  Button,
  TouchableOpacity
} from 'react-native';
import Config from '../../../Config';
import { Text } from 'native-base';
import { addToCart } from '../../actions/cartManagement';
import { connect } from 'react-redux';


const ProductMiniature = (props) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
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
  const addToCart = async (id_product, id_product_attribute) => {
    props.addToCart({
      id_product: id_product,
      id_product_attribute: id_product_attribute,
    })

  }

  return (
    <View style={styles.product} key={props.product.id_product}>
      <TouchableOpacity
        onPress={props.onClick}
        style={styles.button}
      >
        <Image
          style={styles.tinyLogo}
          source={{
            uri: Config.baseURI + props.product.cover_image_id + '-home_default/' + props.product.link_rewrite + '.jpg'
          }}
        />
        <Text>{props.product.name}</Text>
        <Text>{props.product.price} {Config.currency}</Text>
      </TouchableOpacity>
      <View>
        <Button
          onPress={el => addToCart(props.product.id_product, props.product.id_product_attribute)}
          title="Add to cart"
          color="green"
          accessibilityLabel="Add to cart"
        />
      </View>
    </View>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (payload) => dispatch(addToCart(payload)),
  }
}
export default connect(null, mapDispatchToProps)(ProductMiniature);