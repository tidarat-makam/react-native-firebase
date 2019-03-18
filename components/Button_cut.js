import {View,onPressLearnMore,Button} from 'react-native'; 
import React, {Component} from 'react';

export default class Button_cut extends Component {
    render(){
        return (
            <View >
                     <Button
                        onPress={onPressLearnMore}
                        title="ดับเครื่องรถ"
                        color="#0000ff"
                        accessibilityLabel="้เปิดเสียงสำโพง"
                  />
            </View>
        ) ; 
    }
}