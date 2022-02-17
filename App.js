import React, {useState, useEffect} from 'react';
import {StatusBar, View, StyleSheet} from 'react-native';

import AppNavigator from './src/navigation/AppNavigator';
import {connect} from 'react-redux';
import {verifyUser} from './src/actions/userManagement';
import {getCart} from './src/actions/cartManagement';
import {getCategories} from './src/actions/categoryManagement';
import {getFavList} from './src/actions/favProductsManagement';
import {getAvailableCountries} from './src/actions/orderManagement';
import AppIntroSlider from 'react-native-app-intro-slider';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  StorageManager,
  ColorMode,
  Text,
  Image,
  NativeBaseProvider,
} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the colorModeManager,
// here we are using react-native-async-storage (https://react-native-async-storage.github.io/async-storage/)
const colorModeManager = {
  get: async () => {
    try {
      let val = await AsyncStorage.getItem('@color-mode');
      return val === 'dark' ? 'dark' : 'light';
    } catch (e) {
      return 'light';
    }
  },
  set: async value => {
    try {
      await AsyncStorage.setItem('@color-mode', value);
    } catch (e) {
      console.log(e);
    }
  },
};

const App = props => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isDisplayIntro, setIsDisplayIntro] = useState(true);

  useEffect(() => {
    async function initLoadApp() {
      await props.verify();
      await props.getCategories();
      await props.getFavList();
      colorModeManager.set('dark');
      setIsLoaded(true);
    }
    initLoadApp();
  }, []);

  useEffect(() => {
    props.getCart();
    props.getAvailableCountries();
  }, [props.isLoggedIn]);

  ///////////////SLIDER INTRO/////////////////
  const data = [
    {
      title: 'Title 1',
      text: 'Description.\nSay something cool',
      //image: require('https://cdn-icons-png.flaticon.com/512/825/825533.png'),
      bg: '#59b2ab',
    },
    {
      title: 'Title 2',
      text: 'Other cool stuff',
      //image: require('https://cdn-icons-png.flaticon.com/512/825/825533.png'),
      bg: '#febe29',
    },
    {
      title: 'Rocket guy',
      text: "I'm already out of descriptions\n\nLorem ipsum bla bla bla",
      //image: require('https://cdn-icons-png.flaticon.com/512/825/825533.png'),
      bg: '#22bcb5',
    },
  ];

  const stylesIntroSlider = StyleSheet.create({
    slide: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
      width: 320,
      height: 320,
      marginVertical: 32,
    },
    text: {
      color: 'rgba(255, 255, 255, 0.8)',
      textAlign: 'center',
    },
    title: {
      fontSize: 22,
      color: 'white',
      textAlign: 'center',
    },
    buttonCircle: {
      width: 44,
      height: 44,
      backgroundColor: 'rgba(0, 0, 0, .2)',
      borderRadius: 22,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  const _renderItem = ({item}) => {
    return (
      <View
        style={[
          stylesIntroSlider.slide,
          {
            backgroundColor: item.bg,
          },
        ]}>
        <Text style={stylesIntroSlider.title}>{item.title}</Text>
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/512/825/825533.png',
          }}
          style={stylesIntroSlider.image}
          alt="intro image"
        />
        <Text style={stylesIntroSlider.text}>{item.text}</Text>
      </View>
    );
  };

  const _keyExtractor = item => item.title;

  const _renderNextButton = () => {
    return (
      <View style={stylesIntroSlider.buttonCircle}>
        <Icon name="arrow-circle-right" size={30} color="purple" />
      </View>
    );
  };

  const _renderDoneButton = () => {
    return (
      <View style={stylesIntroSlider.buttonCircle}>
        <Icon name="check-circle" color="rgba(255, 255, 255, .9)" size={24} />
      </View>
    );
  };

  const _onDone = () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    setIsDisplayIntro(false);
  };

  const IntroSlider = () => {
    return (
      <View style={{flex: 1}}>
        <StatusBar translucent backgroundColor="transparent" />
        <AppIntroSlider
          keyExtractor={_keyExtractor}
          renderDoneButton={_renderDoneButton}
          renderNextButton={_renderNextButton}
          renderItem={_renderItem}
          data={data}
          onDone={_onDone}
        />
      </View>
    );
  };
  /////////////SLIDER INTRO///////////////////

  if (isDisplayIntro) {
    return <IntroSlider />;
  } else {
    return (
      // pass it to NativeBaseProvider
      <NativeBaseProvider colorModeManager={colorModeManager}>
        <AppNavigator />
      </NativeBaseProvider>
    );
  }
};

const mapStateToProps = state => {
  return {
    customer: state.customer,
    isLoggedIn: state.isLoggedIn,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    verify: payload => dispatch(verifyUser(payload)),
    getCategories: () => dispatch(getCategories()),
    getCart: () => dispatch(getCart()),
    getFavList: () => dispatch(getFavList()),
    getAvailableCountries: () => dispatch(getAvailableCountries()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
