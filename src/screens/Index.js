/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import AjaxProvider from '../providers/AjaxProvider';
import CustomHtmlContainer from '../components/CustomHtmlContainer';
import {SliderBox} from 'react-native-image-slider-box';
import {SafeAreaView, ScrollView} from 'react-native';
import {
  Spinner,
  FlatList,
  Text,
  Center,
  Container,
  Box,
  Image,
  HStack,
  VStack,
  Spacer,
  Avatar,
  Pressable,
  Badge,
  Stack,
  Heading,
  Divider,
  Flex,
  Circle,
  View,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';

const Index = props => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [customHtml, setHtml] = useState(false);
  const [homeslider, setHomeslider] = useState(false);

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

  const classStyles = {
    'fig-img': {textAlign: 'center'},
    'img-fullwidth': {width: '100%'},
    'img-border': {borderWidth: 5},
    'img-bg': {width: '100%', backgroundColor: 'gray', height: 250},
    markup: {fontSize: 16},
  };

  useEffect(() => {
    let cleanupFunction = false;
    async function initLoadIndexPage() {
      let custompage = await AjaxProvider('/custompage');
      if (custompage.success) {
        if (!cleanupFunction) {
          setHtml(custompage.html);
          setHomeslider(custompage.slides);
          setIsLoaded(true);
        }
      }
    }
    initLoadIndexPage();
    return () => (cleanupFunction = true);
  }, []);

  const getSlides = () => {
    let slides = [];
    if (homeslider) {
      homeslider.forEach(slide => {
        slides.push(slide['image_url']);
      });
    }
    return slides;
  };

  return (
    <>
      {isLoaded ? (
        <View
          style={{
            container: {
              flex: 1,
            },
          }}>
          <SliderBox
            images={getSlides()}
            sliderBoxHeight={150}
            onCurrentImagePressed={index =>
              console.warn(`image ${index} pressed`)
            }
            dotColor="#FFEE58"
            inactiveDotColor="#90A4AE"
            dotStyle={{
              width: 15,
              height: 15,
              borderRadius: 15,
              marginHorizontal: 10,
              padding: 0,
              margin: 0,
            }}
            ImageComponentStyle={{borderRadius: 25, width: '97%', marginTop: 5}}
          />
          <CustomHtmlContainer html={customHtml} classesStyles={classStyles} />
          <Center>
            <ScrollView horizontal={true}>
              <HStack space={3} justifyContent="center">
                {displayRecords(props.categories)}
              </HStack>
            </ScrollView>
          </Center>
        </View>
      ) : (
        <Spinner color="green" />
      )}
    </>
  );
};

const mapStateToProps = state => {
  return {
    categories: state.categories.categories,
  };
};

export default connect(mapStateToProps)(Index);
