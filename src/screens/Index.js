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
import {Spinner, Container, Center} from 'native-base';
import {SliderBox} from 'react-native-image-slider-box';
import {View} from 'react-native';

const Index = props => {
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
            sliderBoxHeight={300}
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
          />
          <CustomHtmlContainer html={customHtml} classesStyles={classStyles} />
        </View>
      ) : (
        <Spinner color="green" />
      )}
    </>
  );
};

export default Index;
