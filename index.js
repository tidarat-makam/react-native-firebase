
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  AppRegistry
} from 'react-native';
import firebase from 'react-native-firebase';

import { name as AppName } from './app.json';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  componentDidMount() {

    const firebaseConfig = {
        apiKey: "AIzaSyBeOrf_e8MWHGufnwmtcI52Wzo3Ds19H2I",
        authDomain: "testprojecttct2ra.firebaseapp.com",
        databaseURL: "https://testprojecttct2ra.firebaseio.com",
        projectId: "testprojecttct2ra",
        storageBucket: "testprojecttct2ra.appspot.com",
        messagingSenderId: "188951092399",

        clientId: "188951092399-9s62411cujgf0hr0h6bol7fmih4kvn5h.apps.googleusercontent.com",
        appId: "1:188951092399:android:c178a96f49a6d439",
        persistence: true,
    };

    firebase.initializeApp(firebaseConfig);

    this.initNotification();
  }

  initNotification = async () => {
    await this.setPermission();
    const fcmToken = await firebase.messaging().getToken();
    console.log('fcmToken', fcmToken);
  }

  setPermission = async () => {
    try {
      const enabled = await firebase.messaging().hasPermission();
      if (!enabled) {
        await firebase.messaging().requestPermission();
      }
    } catch (error) {
      console.log('error', error);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent(AppName, ()=> App);