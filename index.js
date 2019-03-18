
import React, {Component} from 'react';
import {AppRegistry, Text, View, StyleSheet, Dimensions } from 'react-native'; 

import { name as AppName } from './app.json';

// import * as firebase from 'firebase/app';
import firebase from '@firebase/app';
import '@firebase/auth';
import "@firebase/database";

/////////////////////////////////////
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';


////////////////////////////////////
import Head from './components/Head';
import Button_chk from './components/Button_chk';
import Button_Buzz from './components/Button_Buzz';
import Button_cut from './components/Button_cut';
import Button_dont from './components/Button_dont';
import Button_call from './components/Button_call';
// import Button from './components/Button';


class Appplication extends Component {
    
  constructor(props) {
        super(props);
        this.state = {
          text: '',
          email: ''
        };
      }
  // connect fierbase
 componentWillMount() {
   const firebaseConfig = {
    apiKey: "AIzaSyDLp4gc90CsSrGeLauVk0H3tVlzdi_465E",
    authDomain: "webtechtct.firebaseapp.com",
    databaseURL: "https://webtechtct.firebaseio.com",
    projectId: "webtechtct",
    storageBucket: "webtechtct.appspot.com",
    messagingSenderId: "61852358148"
  };

  firebase.initializeApp(firebaseConfig);

  console.log(firebase)
  
  }// end connect fierbase

    render(){
        return (       
            <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between'}}>
                <View><Head/></View>
                <View style={{ flexGrow: 0.08 }}>
                  <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 13.8213359,
                        longitude: 100.5137226,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                  }}>
                    <MapView.Marker
                      coordinate={{
                        latitude: 13.8213359,
                        longitude: 100.5137226
                      }}
                      title={'รถของคุณอยู่ที่นี้!!'}
                      // description={'marker.description'}
                    />
                  </MapView>
                </View>

                <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center'}}>
                  <View style={{ width: (Dimensions.get('window').width)/2, height: 25,flexGrow: 0.2  }}><Button_chk/></View>  
                    <View style={{ flexDirection: 'row', flexGrow: 0.08 }}>
                      <View style={{ width: (Dimensions.get('window').width)/3, marginRight :30 }}><Button_Buzz/></View>   
                      <View style={{ width: (Dimensions.get('window').width)/3, }}><Button_cut/></View>
                    </View>
                    <View style={{ flexDirection: 'row', }}>
                      <View style={{ width: (Dimensions.get('window').width)/3, marginRight :30 }}><Button_call/></View>   
                      <View style={{ width: (Dimensions.get('window').width)/3, }}><Button_dont/></View>
                    </View>
                </View>

              </View> // End Main View

        ); 
    } // แสดงผลของ app
}

AppRegistry.registerComponent(AppName, ()=> Appplication);

const styles = StyleSheet.create({ 
  map: {
    //flex : 1,
    height: (Dimensions.get('window').width)*1.2,
    width: Dimensions.get('window').width,
  },
  btn1: {
    height: 15,
    width: 3,
  }
 });