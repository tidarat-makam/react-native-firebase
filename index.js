
import React, {Component} from 'react';
import {AppRegistry, Text, View, StyleSheet, Dimensions, Button, onPressLearnMore, Linking, TouchableHighlight } from 'react-native'; 

import { name as AppName } from './app.json';

import firebase from 'react-native-firebase';

// import firebase from '@firebase/app';
// import '@firebase/auth';
// import "@firebase/database";
// import "@firebase/messaging";


/////////////////////////////////////
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

////////////////////////////////////
import Head from './components/Head';

import { Provider } from 'react-redux'
import {createStore} from 'redux';

// BackgroundJob
 /*
import BackgroundJob from 'react-native-background-job';

const locaState = {
  LocationFirst: {
    latLocation: 0.0000,
    longLocation: 0.000
  },
}
// Reducer
const swReducer = (state = {statusSwitch: 0}, action) => {
  switch (action.type) {
    case "SET_SWTCH":
      state={
        statusSwitch: state.statusSwitch = action.count,     
      }
      break;
  }
  return state
}
const store = createStore(swReducer)

const locationReducer = (state = locaState, action) => {
  switch (action.type) {
    case "SET_LOCATION":
      state={
        LocationFirst: {
          latLocation: action.payloadLat,
          longLocation: action.payloadLong
        },    
      }
      break; 
  }
  return state
}
const storeLoca = createStore(locationReducer)

const gyroSensor = (state = {gyroStatus: 0}, action) => {
  switch (action.type) {
    case "SET_GYRO":
      state={
        gyroStatus: state.gyroStatus = action.payloadGyro
      }
      break; 
  }
  return state
}
const storeGyro = createStore(gyroSensor)

const backgroundJob = {
  jobKey: "exactJobKey",
  job: () => {
     const sSW = JSON.parse(JSON.stringify(store.getState())).statusSwitch;
     const gyroFrist= JSON.parse(JSON.stringify(storeGyro.getState())).gyroStatus ; 

    if(sSW == 1){
      console.log("Run Background job")
      console.log("------------------- :"+gyroFrist)
      firebase.database().ref('Device1/Location/').on ('value', function (snapshot) {
        // console.log("Location : ",snapshot.val())
        lat2 = snapshot.val().lat
        long2 = snapshot.val().long
      }.bind(this));
      
      firebase.database().ref('Device1/GyroSensor').on('value', function (snapshot) {
        gyro = snapshot.val()
        console.log("gyro" + gyro)
      }.bind(this));

    }else{
      BackgroundJob.cancelAll();
    }

    const lat1 = JSON.parse(JSON.stringify(storeLoca.getState())).LocationFirst.latLocation;
    const long1 = JSON.parse(JSON.stringify(storeLoca.getState())).LocationFirst.longLocation; 
    // Distance Map
    const R = 6517219
    const dLat = radius(lat1 - lat2)
    const dLong = radius(long1 - long2)
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(radius(lat2)) * Math.cos(radius(lat1)) * Math.sin(dLong / 2) * Math.sin(dLong / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const dis = R*c
// Check Distance Notification
    if(dis > 15){
      console.log("sos")
      alert("title", "message")
    }

    // CHeck Gyro
    const ChGyro = (gyroFrist) - (gyro);
    // const ChGyro = -1200
    if( (ChGyro => 1000) || (ChGyro <= -1000)){
      console.log("sos gyro")
      alert("title", "message")
    }
  }
};

BackgroundJob.register(backgroundJob);
// radius distance
function radius(x)  {
  return  x * 22 / 7 / 180
}
*/

const swReducer = (state = {statusSwitch: 0}, action) => {
  switch (action.type) {
    case "SET_SWTCH":
      state={
        statusSwitch: state.statusSwitch = action.count,     
      }
      break;
  }
  return state
}
const store = createStore(swReducer)

class Appplication extends Component {

  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 13.421249,
        longitude: 87.5391713,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      switchValue: false,
      Buzzer: 0   
    };
  }

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

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
      console.log("connected firebase!!!")
    }  
    
    firebase.database().ref('Device1/Location/').on('value', function (snapshot) {
      console.log("Location : ",snapshot.val())
      console.log("Firebase Location successful!!!")
      this.setState({
        region: {
          latitude: snapshot.val().lat,
          longitude: snapshot.val().long,
          latitudeDelta: 0.0022,
          longitudeDelta: 0.0001
        }
      });
    }.bind(this));

    if((JSON.parse(JSON.stringify(store.getState())).statusSwitch) == 1) {
      this.setState({switchValue: true})
      console.log('switchValue', this.state.switchValue);
    }else{
      this.setState({switchValue: false})
      console.log('switchValue', this.state.switchValue);
    }
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
 
    onBuzzer() {
      if(this.state.Buzzer == 0){
        firebase.database().ref('Device1/').update({
          StatusAlarm: 1
        }).then(() => {
          console.log('sent status Buzzer: 1 successful');
          console.log('Status Buzzer: Turn on');
          console.log('-------------------------');
          this.setState({ Buzzer: 1});
        }).catch((error) => {
          console.log("error is null");
          console.log(error);
        });
      }else if(this.state.Buzzer == 1){
        firebase.database().ref('Device1/').update({
          StatusAlarm: 0
        }).then(() => {
          console.log('sent status Buzzer: 0 successful');
          console.log('Status Buzzer: Turn off');
          console.log('-------------------------');
          this.setState({ Buzzer: 0});
        }).catch((error) => {
          console.log("error is null");
          console.log(error);
        });
      }     
    }
    
    switchEngine() {
      firebase.database().ref('Device1/').update({
        StatusMotor: 0
      }).then(() => {
        console.log('sent status StatusMotor 0 successful!');
        console.log('Trun off ');
        console.log('-------------------------------------');
      }).catch((error) => {
        console.log("error is null");
        console.log(error);
      });
    }

 toggleSwitch = (value) => {
  this.setState({switchValue: value})
    if((JSON.parse(JSON.stringify(store.getState())).statusSwitch) == 0){
      store.dispatch({
        type: "SET_SWTCH",
        count: 1
      })
      // firebase.database().ref('Device1/Location/').once('value', function (snapshot) {
      //   console.log("LocationTrack: ",snapshot.val())
      //   storeLoca.dispatch({
      //     type: "SET_LOCATION",
      //     payloadLat: snapshot.val().lat,
      //     payloadLong: snapshot.val().long
      //   })
      // }.bind(this));

      // firebase.database().ref('Device1/GyroSensor').once('value', function (snapshot) {
      //   console.log("GyroSensor: ",snapshot.val())
      //   storeGyro.dispatch({
      //     type: "SET_GYRO",
      //     payloadGyro: snapshot.val()
      //   })
      // }.bind(this));

      firebase.database().ref('Device1/').update({
        StatusAPP: 1
      }).then(() => {
        console.log('sent StatusAPP 1 successful!');
        console.log('The application is running.');
      }).catch((error) => {
        console.log("error is null");
        console.log(error);
      });      
      }else{
        // storeGyro.dispatch({
        //   type: "SET_GYRO",
        //   payloadGyro: 0
        // })
        // store.dispatch({
        //   type: "SET_SWTCH",
        //   count: 0
        // })
        // storeLoca.dispatch({
        //   type: "SET_LOCATION",
        //   payloadLat: 0,
        //   payloadLong: 0
        // })
        firebase.database().ref('Device1/').update({
          StatusAPP: 0
        }).then(() => {
          console.log('sent StatusAPP 0 successful!');
          console.log('close application.');
        }).catch((error) => {
          console.log("error is null");
          console.log(error);
        });  
      }     
      // console.log(store.getState())
      // console.log(storeLoca.getState())
   }

   call() {
    Linking.openURL(`tel:${1192}`)
    console.log('----------');
    console.log('Call 1192!');
    console.log('----------');
   }
 
  chang() {
    // console.log("LocationTrack: ",this.state.LocationFirst)
    // console.log("statusSwitch",this.state.statusSwitch)
    console.log("Distance", this.state.Distance)
   }

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
                          <Button color='#4ca2d0' onPress={() => this.onBuzzer()}  
                          title="Buzzer" 
                          accessibilityLabel="้เปิดเสียงสำโพง"/></View>   
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