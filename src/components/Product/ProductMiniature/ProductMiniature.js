import React, { useEffect, useState } from 'react';
import {
    View,
    Image, StyleSheet,
    Button
} from 'react-native';
import { Text } from 'native-base';
import Config from '../../../../Config';


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

const ProductMeniature = ({navigation, product, addToCart}) => {
    return (
        <View style={styles.product}>
            <Image 
                style={styles.tinyLogo}
                source={{
                    uri: 'http://lelerestapi.na4u.ru/'+product.cover_image_id+'-home_default/'+product.link_rewrite+'.jpg'
                }}
            />
            <Text onPress={() => navigation.navigate('Product', { id_product: product.id_product })}>{product.name}</Text>
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
    );
}

export default ProductMeniature;
