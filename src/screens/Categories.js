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
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Config from '../../Config';

const Categories = ({route, navigation}) => {
  const [categoriesData, setCategories] = useState([]);

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
    maincategory: {
        fontSize: 14,
    },
    childcategory: {
        fontSize: 12,
        paddingLeft: 15
    },
  });

  useEffect(() => {
    getCategories();
  }, []);

   const getCategories = async () => {
    try {
      let response = await fetch(
        Config.API + '/categories'
      );
      let json = await response.json();
      setCategories(json.categories.children);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic">
          <View>
              {
                categoriesData.map(category => (
                  <View key={category.id} style={styles.container}>
                    <Text onPress={() =>
                        navigation.navigate('Category', { id_category: category.id })
                    }>{category.name}</Text>
                  </View>
                ))
              }
              </View>
          </ScrollView>
      </SafeAreaView>
  );
};

export default Categories;
