import {View,onPressLearnMore,Button} from 'react-native'; 
import React, {Component} from 'react';

export default class Button_chk extends Component {
    render(){
        return (
            <View >
                     <Button
                        onPress={onPressLearnMore}
                        title="ตรวจสอบตำแหน่ง"
                        color="#0000ff"
                        accessibilityLabel="Learn more about this purple button"
                  />
            </View>
        ) ; 
    }
}
