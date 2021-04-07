/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Button
} from 'react-native';
import { connect } from 'react-redux';
import Login from '../components/Login';
import Register from '../components/Register';
import { logoutUser } from '../actions/userManagement';
import { useIsFocused } from "@react-navigation/native";
import AjaxProviderLogged from '../providers/AjaxProviderLogged';
import Config from '../../Config';
import { Container, Content, List, ListItem, Text, Icon, Left, Right, Body, Spinner } from 'native-base';


const Auth = (props) => {
  const isFocused = useIsFocused();
  const [showRegister, setShowRegister] = useState(0);
  const [isHistoryLoaded, setHistoryLoaded] = useState(false);
  const swapScreen = () => {
    if (!showRegister) setShowRegister(1);
    if (showRegister) setShowRegister(0);
  }
  const [orderHistory, setOrderHistory] = useState([]);

  const styles = StyleSheet.create({
    container: {
      flex: 1
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

  useEffect(() => {
    let cleanupFunction = false;
    async function initLoadHistory() {
      let history = await AjaxProviderLogged('/orderhistory');
      if (history && history.history) {
        if (!cleanupFunction) {
          setOrderHistory(history.history);
          setHistoryLoaded(true);
        }
      }

    }
    initLoadHistory();
    return () => cleanupFunction = true;
  }, [isFocused]);

  return (
    <Container style={{ paddingTop: 20 }}>
      <Content>
        {props.isLoggedIn ?
          <View style={styles.container}>
            <Text style={styles.userscreen}>Welcome back, {props.customer.firstname} {props.customer.lastname}!</Text>
            <Button
              onPress={el => onPressLogout()}
              title="Logout"
              color="#555"
              accessibilityLabel="Quit your account"
            />

            {isHistoryLoaded ?
              <View style={{ paddingTop: 35 }}>
                <Text style={{ textAlign: 'center', marginBottom: 20, fontSize: 24 }}>Order History</Text>
                {orderHistory && orderHistory.length ?

                  <List>
                    {orderHistory.map(order => (
                      <ListItem key={order.reference}>
                        <Left>
                          <Text>Ref.: </Text>
                          <Text>{order.reference}</Text>
                        </Left>
                        <Right>
                          <Text>{parseFloat(order.total_paid_tax_incl).toFixed(2)} {Config.currency}</Text>
                        </Right>
                      </ListItem>
                    ))}
                  </List>
                  : <Text style={{ textAlign: 'center', marginBottom: 20, fontSize: 24 }}>You've yet to make your first order!</Text>}
              </View>
              :
              <View style={{ flex: 100, alignItems: 'center', justifyContent: 'center', flexGrow: 2, height: 100 }}>
                <Spinner color='green' />
              </View>
            }
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

                    <Login />

                  </View>
                }
                {showRegister ?
                  <View>

                    <TouchableOpacity onPress={el => swapScreen()}>
                      <Text>Have an account already? Login instead!</Text>
                    </TouchableOpacity>

                    <Register />

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
