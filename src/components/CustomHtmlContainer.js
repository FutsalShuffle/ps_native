/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import HTML from "react-native-render-html";
import { Container, Content } from 'native-base';
import { useWindowDimensions } from 'react-native';
const CustomHtmlContainer = (props) => {
  const contentWidth = useWindowDimensions().width;
  return (
    <HTML containerStyle={{padding: 15}}
     source={{html: props.html}}
     contentWidth={contentWidth}
     classesStyles={props.classesStyles? props.classesStyles:null}
    />
  );
};


export default CustomHtmlContainer;