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


const Index = (props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [customHtml, setHtml]   = useState(false);

  useEffect(() => {
    props.navigation.setOptions({ title: 'Index custom page' });
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
    <>
    {isLoaded ? 
      <CustomHtmlContainer html={customHtml}/>
    : null}
    </>
  );
};

export default Index;
