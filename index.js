
import React, {Component} from 'react';
import {AppRegistry, Text, View, StyleSheet, Dimensions, Button, onPressLearnMore } from 'react-native'; 

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

class Appplication extends Component {

  fuction 
    onBuzzer() {
      firebase.database().ref('/').update({
        Buzzer: 1
      }).then(() => {
        console.log('INSERTED !');
      }).catch((error) => {
        console.log("error is null");
        console.log(error);
      });
  }
    
  fuction 
    switchEngine() {
      firebase.database().ref('/').update({
        Engine: 0
      }).then(() => {
        console.log('INSERTED !');
      }).catch((error) => {
        console.log("error is null");
        console.log(error);
      });
  }

  fuction 
    chackLococation() {
       firebase.database().ref('Location/').once('value', function (snapshot) {
        console.log(snapshot.val())
        this.latLocation = snapshot.val().lat 
        this.longLocation = snapshot.val().long
        console.log("now latLocation",this.latLocation)
        console.log("now longLocation",this.longLocation)
    }); 
  }

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      latLocation: '',
      longLocation: ''
    };
  }

  // connect fierbase
  componentWillMount() {
    console.log("Hello in componentWillMount");

    const firebaseConfig = {
      apiKey: "AIzaSyDLp4gc90CsSrGeLauVk0H3tVlzdi_465E",
      authDomain: "webtechtct.firebaseapp.com",
      databaseURL: "https://webtechtct.firebaseio.com",
      projectId: "webtechtct",
      storageBucket: "webtechtct.appspot.com",
      messagingSenderId: "61852358148"
    };

    firebase.initializeApp(firebaseConfig);
  
    firebase.database().ref('Location/').once('value', function (snapshot) {
      console.log(snapshot.val())
      this.latLocation = snapshot.val().lat 
      this.longLocation = snapshot.val().long
      console.log("now latLocation",this.latLocation)
      console.log("now longLocation",this.longLocation)
  }); 
  
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
                  <View style={{ width: (Dimensions.get('window').width)/2, height: 25,flexGrow: 0.2  }}>
                          <Button onPress={() => this.chackLococation()}  title="chack location " accessibilityLabel="ตรวจสอบตำแหน่ง"/></View>  
                    <View style={{ flexDirection: 'row', flexGrow: 0.08 }}>
                      <View style={{ width: (Dimensions.get('window').width)/3, marginRight :30 }}>
                          <Button onPress={() => this.onBuzzer()}  title="Turn no Buzzer " accessibilityLabel="้เปิดเสียงสำโพง"/></View>   
                      <View style={{ width: (Dimensions.get('window').width)/3, }}>
                          <Button onPress={() => this.switchEngine()}  title="switch off an engine" accessibilityLabel="ดับเครื่องยนต์"/></View>
                    </View>
                    <View style={{ flexDirection: 'row', }}>
                      <View style={{ width: (Dimensions.get('window').width)/3, marginRight :30 }}>
                          <Button onPress={onPressLearnMore}  title="call 1192" accessibilityLabel="โทรแจ้ง 1192"/></View>   
                      <View style={{ width: (Dimensions.get('window').width)/3, }}>
                          <Button onPress={onPressLearnMore}  title="Off Alert" accessibilityLabel="ไม่สนใจ"/></View>
                    </View>
                </View>
                <Text>{this.setState.latLocation }</Text>

              </View> 
              // End Main View

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