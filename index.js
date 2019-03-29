
import React, {Component} from 'react';
import {AppRegistry, Text, View, StyleSheet, Dimensions, Button, onPressLearnMore, Linking } from 'react-native'; 

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

    onBuzzer() {
      firebase.database().ref('Device1/').update({
        StatusAlarm: 1
      }).then(() => {
        console.log('Buzzer 1 !');
      }).catch((error) => {
        console.log("error is null");
        console.log(error);
      });
  }
    
    switchEngine() {
      firebase.database().ref('Device1/').update({
        StatusMotor: 0
      }).then(() => {
        console.log('switchEngine 0 !');
      }).catch((error) => {
        console.log("error is null");
        console.log(error);
      });
  }


  constructor(props) {
    super(props);
    this.state = {
      text: '',
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      switchValue:false,
      LocationFirst: {
        latLocation: 37.78825,
        longLocation: -122.4324
      },
      statusSwitch: 0, 
      Distance: 0
      
    };
  }

 toggleSwitch = (value) => {
      this.setState({switchValue: value})
      console.log("Switch");

     this.setState({statusSwitch: 1})
      firebase.database().ref('Device1/Location/').once('value', function (snapshot) {
        console.log("LocationTrack: ",snapshot.val())
        
        // this.setState({
        //   LocationFirst: {
        //     latLocation: snapshot.val().lat,
        //     longLocation: snapshot.val().long
        //   }
        // });
  
      }.bind(this)); 
   }

   call() {
    Linking.openURL(`tel:${1192}`)
   }

   getDistance() {
     const R = 6517219
     const dLat = this.radius(this.state.LocationFirst.latLocation - this.state.region.latitude)
     const dLong = this.radius(this.state.LocationFirst.longLocation - this.state.region.longitude)
     const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(this.radius(this.state.region.latitude)) * Math.cos(this.radius(this.state.LocationFirst.latLocation)) * Math.sin(dLong / 2) * Math.sin(dLong / 2)
     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
     const dis = R*c
    
     this.setState(
       {Distance: dis}
       )
       console.log("Distance", this.state.Distance)
    }
    
  radius(x) {
      return x * 22 / 7 / 180
  }
  
  chang() {
    // console.log("LocationTrack: ",this.state.LocationFirst)
    // console.log("statusSwitch",this.state.statusSwitch)
    console.log("Distance", this.state.Distance)
   }
  
  // connect fierbase
  componentWillMount() {
    console.log("Hello in componentWillMount");

    const firebaseConfig = {
    apiKey: "AIzaSyBeOrf_e8MWHGufnwmtcI52Wzo3Ds19H2I",
    authDomain: "testprojecttct2ra.firebaseapp.com",
    databaseURL: "https://testprojecttct2ra.firebaseio.com",
    projectId: "testprojecttct2ra",
    storageBucket: "testprojecttct2ra.appspot.com",
    messagingSenderId: "188951092399"
    };

    firebase.initializeApp(firebaseConfig);
    
    console.log(firebase)
    console.log("connected firebase!!!")

    firebase.database().ref('Device1/Location/').on('value', function (snapshot) {
      console.log("Location : ",snapshot.val())
      
      this.setState({
        region: {
          latitude: snapshot.val().lat,
          longitude: snapshot.val().long,
          latitudeDelta: 0.0022,
          longitudeDelta: 0.0001
        }
      });

    }.bind(this)); 
  
  }// end connect fierbase
 
  
  render(){
    return (       
      <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between'}}>
        <View>
          <Head funcClick={this.toggleSwitch} swState={this.state.switchValue}/> 
        </View>
        <View style={{ flexGrow: 0.08, marginBottom:10 }}>
                  <MapView
                    style={styles.map}
                    region={this.state.region}
                  >
                    <MapView.Marker
                      coordinate={this.state.region}
                      title={'รถของคุณอยู่ที่นี้!!'}
                      // description={'marker.description'}
                    />
                  </MapView>
                </View>

                <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center'}}>
                  {/* <View style={{ width: (Dimensions.get('window').width)/2, height: 25,flexGrow: 0.2  }}>
                          <Button onPress={() => this.chackLococation()}  title="chack location " accessibilityLabel="ตรวจสอบตำแหน่ง"/></View>   */}
                    <View style={{ flexDirection: 'row', flexGrow: 0.08, }}>
                      <View style={{ width: (Dimensions.get('window').width)/3, marginRight :30, marginBottom: 10 }}>
                          <Button color='#4ca2d0' onPress={() => this.onBuzzer()}  title="Buzzer " accessibilityLabel="้เปิดเสียงสำโพง"/></View>   
                      <View style={{ width: (Dimensions.get('window').width)/3, }}>
                          <Button color='#4ca2d0' onPress={() => this.switchEngine()}  title="Engine" accessibilityLabel="ดับเครื่องยนต์"/></View>
                    </View>
                    <View style={{ flexDirection: 'row', }}>
                      <View style={{ width: (Dimensions.get('window').width)/3, marginRight :30 }}>
                          <Button color='#4ca2d0' onPress={ () => this.call()}  title="call 1192" accessibilityLabel="โทรแจ้ง 1192"/></View>   
                      <View style={{ width: (Dimensions.get('window').width)/3, }}>
                          <Button color='#4ca2d0' onPress={onPressLearnMore}  title="Off Alert" accessibilityLabel="ไม่สนใจ"/></View>
                    </View>
                </View>
                <Button title="test" onPress={() => this.getDistance()}/>

              </View> 
              // End Main View

        ); 
    } // แสดงผลของ app
}

AppRegistry.registerComponent(AppName, ()=> Appplication);

const styles = StyleSheet.create({ 
  map: {
    //flex : 1,
    height: (Dimensions.get('window').height)/1.3,
    width: Dimensions.get('window').width,
  },

 }); 