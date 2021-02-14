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

const CustomHtmlContainer = (props) => {
  return (
    <Container>
        <Content>
        <HTML containerStyle={{padding: 15}} source={{html: props.html}} contentWidth={contentWidth} />
        </Content>
    </Container>    
  );
};


export default CustomHtmlContainer;