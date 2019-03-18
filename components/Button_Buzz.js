import {View,onPressLearnMore,Button} from 'react-native'; 
import React, {Component} from 'react';

export default class Button_chk extends Component {
    render(){
        return (
            <View >
                     <Button
                        onPress={onPressLearnMore}
                        title="เปิดลำโพง"
                        color="#0000ff"
                        accessibilityLabel="้เปิดเสียงสำโพง"
                  />
            </View>
        ) ; 
    }
}
