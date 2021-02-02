/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Button
} from 'react-native';
import {connect} from 'react-redux';
import Login from '../components/Login';
import Register from '../components/Register';
import {logoutUser} from '../actions/userManagement';
import { Container, Content } from 'native-base';

const Auth = (props) => {
  const [showRegister, setShowRegister] = useState(0);
  const swapScreen = () => {
      if (!showRegister) setShowRegister(1);
      if (showRegister) setShowRegister(0);
  }
  const styles = StyleSheet.create({
    container: {
      flex: 10,
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      height:100,
      flexGrow:2,
    },
    button: {
      paddingTop: 15
    },
    userscreen: {
      fontSize: 18,
      textAlign: 'center',
      paddingBottom: 50
    },
  });

  onPressLogout = async () => {
    props.logout();
  }

  return (
            <Container style={{paddingTop:20}}>
              <Content>
              {props.isLoggedIn ? 
              <View style={styles.container}>
                <Text style={styles.userscreen}>Welcome back, {props.customer.firstname} {props.customer.lastname}!</Text>
                <Button
                  onPress={el => onPressLogout()}
                  title="Logout"
                  color="#555"
                  style={styles.logoutBtn}
                  accessibilityLabel="Quit your account"
                />
              </View>
              : 
              <SafeAreaView>
              <ScrollView contentInsetAdjustmentBehavior="automatic">
              <View>
                  {showRegister ? null :
                  <View>
                      <TouchableOpacity onPress={el => swapScreen()}> 
                          <Text>Don't have an account yet? Register now!</Text> 
                      </TouchableOpacity>

                        <Login/>

                  </View>
                }
                {showRegister ? 
                  <View>
                      <TouchableOpacity onPress={el => swapScreen()}> 
                          <Text>Have an account already? Login instead!</Text> 
                      </TouchableOpacity>
                      
                      <Register/>
                      
                  </View>
                : null}
              </View>
             </ScrollView>
             </SafeAreaView>
              }
            </Content>
        </Container>
  );
};
const mapStateToProps = (state) => {
  return {
    customer: state.customer.customer,
    isLoggedIn: state.customer.isLoggedIn,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logoutUser())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Auth);
