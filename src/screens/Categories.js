/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Container, Content, List, ListItem, Text } from 'native-base';
import {connect} from 'react-redux';

const Categories = (props) => {


  return (
    <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic">
                <Container>
                  <Content>
                        { props.categories.map(category => (
                            <List key={category.id}>
                            <ListItem itemHeader>
                              <Text onPress={() =>
                                  props.navigation.navigate('Category', { id_category: category.id })}>
                                    {category.name}</Text>
                              </ListItem> 
                              {category.children.map(subcategory => (
                                  <ListItem key={subcategory.id}>
                                    <Text
                                      onPress={() => props.navigation.navigate('Category', { id_category: subcategory.id })}
                                      >{subcategory.name}</Text>
                                  </ListItem>
                              ))} 
                             </List>
                             ))
                          }
                </Content>
              </Container>
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
