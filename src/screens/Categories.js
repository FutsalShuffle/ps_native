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
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ShadowPropTypesIOS,
} from 'react-native';
import {connect} from 'react-redux';

const Categories = (props) => {

  const styles = StyleSheet.create({
    container: {
      paddingTop: 50,
      flex: 1,
      padding: 150
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
        fontSize: 24,
        width: 400
    },
    childcategory: {
        fontSize: 15,
        paddingLeft: 20
    },
  });

  return (
    <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic">
          <View style={styles.container}>
              {
                props.categories.map(category => (
                  <View key={category.id}>
                    <Text style={styles.maincategory} onPress={() =>
                        props.navigation.navigate('Category', { id_category: category.id })}>
                          {category.name}
                    </Text>
                    { category.children ?
                        category.children.map(subcategory => (
                            <Text key={subcategory.id} 
                            style={styles.childcategory}
                            onPress={() => props.navigation.navigate('Category', { id_category: subcategory.id })}
                            >
                              {subcategory.name}
                            </Text>
                        ))
                      : null}
                  </View>
                ))}
              </View>
          </ScrollView>
      </SafeAreaView>
  );
};
const mapStateToProps = (state) => {
  return {
    categories: state.categories.categories,
  }
}

export default connect(mapStateToProps)(Categories);
