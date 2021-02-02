/**
 * @format
 */
import * as React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import configureStore from './src/store';
import 'react-native-gesture-handler';

const store = configureStore();

const reduxStore = () => 
    <Provider store={store}>
        <App/>
    </Provider>


AppRegistry.registerComponent(appName, () => reduxStore);
