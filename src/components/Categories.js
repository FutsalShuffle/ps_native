/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {ScrollView} from 'react-native';
import {
  Text,
  Center,
  HStack,
  VStack,
  Spacer,
  Pressable,
  Circle,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
const Categories = props => {
  const displayRecords = records => {
    return records.map(item => (
      <>
        <Center h="125px" w="100px" rounded="md">
          <Pressable
            mx="1"
            onPress={() =>
              props.navigation.navigate('Category', {
                id_category: item.id,
              })
            }>
            <VStack alignItems="center">
              <Circle size="60px" bg="light.200" mt="2">
                <Icon name="home" size={35} color="black" />
              </Circle>
              <Text
                alignItems="center"
                fontSize="xs"
                fontWeight="500"
                mt={1}
                pb={0}>
                {item.name}
              </Text>
              <Spacer />
            </VStack>
          </Pressable>
        </Center>
        {item.children.map(subItem => (
          <Center h="125px" w="100px" rounded="md">
            <Pressable
              mx="1"
              onPress={() =>
                props.navigation.navigate('Category', {
                  id_category: item.id,
                })
              }>
              <VStack alignItems="center">
                <Circle size="60px" bg="light.200" mt="2">
                  <Icon name="home" size={35} color="black" />
                </Circle>
                <Text
                  alignItems="center"
                  fontSize="xs"
                  fontWeight="500"
                  mt={1}
                  pb={0}>
                  {subItem.name}
                </Text>
                <Spacer />
              </VStack>
            </Pressable>
          </Center>
        ))}
      </>
    ));
  };

  return (
    <Center>
      <ScrollView horizontal={true}>
        <HStack space={3} justifyContent="center">
          {displayRecords(props.categories)}
        </HStack>
      </ScrollView>
    </Center>
  );
};
const mapStateToProps = state => {
  return {
    categories: state.categories.categories,
  };
};

export default connect(mapStateToProps)(Categories);
