/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import AjaxProvider from '../providers/AjaxProvider';
import CustomHtmlContainer from '../components/CustomHtmlContainer';
import { Spinner, Container, Content } from "native-base";
import { SliderBox } from "react-native-image-slider-box";
import {
  View
} from 'react-native';

const Index = (props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [customHtml, setHtml]   = useState(false);
  const [homeslider, setHomeslider] = useState(false);

  const classStyles = { 
    "fig-img": { textAlign: 'center'}, 
    "img-fullwidth": { width: '100%' }, 
    "img-border": { borderWidth: 5, },
    "img-bg": { width: '100%',backgroundColor:'gray', height:250 },
    "markup": { fontSize:16, },
  };

  useEffect(() => {
    let cleanupFunction = false;
    async function initLoadIndexPage() {
        let custompage = await AjaxProvider('/custompage');
        if (custompage.success) {
          if(!cleanupFunction) {
            setHtml(custompage.html);
            setHomeslider(custompage.slides);
            setIsLoaded(true);
          }
        }
      
    }
    initLoadIndexPage();
    return () => cleanupFunction = true;
  }, []);

  const getSlides = () => {
    let slides = [];
    if (homeslider) {
      homeslider.forEach(slide => {
        slides.push(slide['image_url']);
      });
    }
    return slides;
  }


  return (
    <Container>
      <Content>
        {isLoaded ? 
        <View>
          <SliderBox sliderBoxHeight={300} images={getSlides()} autoplay />
          <CustomHtmlContainer html={customHtml} classesStyles={classStyles}/>
        </View>
        : 
          <Spinner color='green' />
        }
       </Content> 
    </Container>
  );
};

export default Index;
