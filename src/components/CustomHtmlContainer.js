/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import HTML from "react-native-render-html";
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