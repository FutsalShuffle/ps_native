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


const Index = (props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [customHtml, setHtml]   = useState(false);

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
            setIsLoaded(true);
          }
        }
      
    }
    initLoadIndexPage();
    return () => cleanupFunction = true;
  }, []);


  return (
    <Container>
      <Content>
        {isLoaded ? 
          <CustomHtmlContainer html={customHtml} classesStyles={classStyles}/>
        : 
          <Spinner color='green' />
        }
       </Content> 
    </Container>
  );
};

export default Index;
