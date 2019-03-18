import {View,onPressLearnMore,Button} from 'react-native'; 
import React, {Component} from 'react';

export default class Button_dont extends Component {
    render(){
        return (
            <View >
                     <Button
                        // onPress={onPressLearnMore}
                        title="ไม่สนใจ"
                        color="#0000ff"
                        accessibilityLabel="1192"
                  />
            </View>
        ) ; 
    }
}