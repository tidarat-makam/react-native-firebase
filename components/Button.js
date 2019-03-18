

import React, { Component } from 'react';
import { Button, View, StyleSheet } from 'react-native';
import Button_chk from './Button_chk';
import Button_Buzz from './Button_Buzz';
import Button_call from './Button_call';
import Button_dont from './Button_dont';
import Button_cut from './Button_cut';

export default class Button extends Component {
    render(){
        return (
            <View >
                <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center'}}>
                  <View style={{ width: (Dimensions.get('window').width)/2, height: 25,flexGrow: 0.2  }}>
                    <Button_chk />
                  </View>  
                    <View style={{ flexDirection: 'row', flexGrow: 0.08 }}>
                      <View style={{ width: (Dimensions.get('window').width)/3, marginRight :30 }}><Button_Buzz/></View>   
                      <View style={{ width: (Dimensions.get('window').width)/3, }}><Button_cut /></View>
                    </View>
                    <View style={{ flexDirection: 'row', }}>
                      <View style={{ width: (Dimensions.get('window').width)/3, marginRight :30 }}><Button_call/></View>   
                      <View style={{ width: (Dimensions.get('window').width)/3, }}><Button_dont/></View>
                    </View>
                </View>
            </View>
        ) ; 
    }
}
