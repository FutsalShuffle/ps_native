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
import Categories from '../components/Categories';
import Category from '../screens/Category';
import {Spinner, View, useColorModeValue, Box, ScrollView} from 'native-base';
import {connect} from 'react-redux';
import FooterNav from '../navigation/FooterNav';

const Index = props => {
  const colorScheme = useColorModeValue('yellow.500', 'green.300');
  const darkModeScheme = useColorModeValue('info.50', 'info.800');
  const [isLoaded, setIsLoaded] = useState(false);
  const [customHtml, setHtml] = useState(false);
  const [homeslider, setHomeslider] = useState(false);

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
    <Box
      flex={1}
      safeAreaTop
      width="100%"
      alignSelf="center"
      bg={darkModeScheme}>
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
          <Categories navigation={props.navigation}></Categories>
        </View>
      ) : (
        <Spinner color="green" />
      )}

      <FooterNav navigation={props.navigation} selected={0} />
    </Box>
  );
};

const mapStateToProps = state => {
  return {
    categories: state.categories.categories,
  };
};

export default connect(mapStateToProps)(Index);
