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
  View
} from 'react-native';
import { Container, Content, List, ListItem, Text, Icon, Left, Right } from 'native-base';
import { connect } from 'react-redux';

const Categories = (props) => {
  return (
    <Container>
      <Content>
        <List>
          {props.categories.map(category => (
            <View key={category.id}>
              <ListItem itemDivider button onPress={() => props.navigation.navigate('Category', { id_category: category.id })}>
                <Text style={{ fontSize: 23 }}>{category.name}</Text>
              </ListItem>
              {category.children.map(subcategory => (
                <ListItem button key={subcategory.id} onPress={() => props.navigation.navigate('Category', { id_category: subcategory.id })}>
                  <Text>{subcategory.name}</Text>
                </ListItem>
              ))}
            </View>
          ))
          }
        </List>
      </Content>
    </Container>
  );
};
const mapStateToProps = (state) => {
  return {
    categories: state.categories.categories,
  }
}

export default connect(mapStateToProps)(Categories);
