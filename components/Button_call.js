import {View,onPressLearnMore,Button} from 'react-native'; 
import React, {Component} from 'react';

export default class Button_call extends Component {
    render(){
        return (
            <View >
                     <Button
                        onPress={onPressLearnMore}
                        title="โทรแจ้ง 1192"
                        color="#0000ff"
                        accessibilityLabel="1192"
                  />
            </View>
        ) ; 
    }
}