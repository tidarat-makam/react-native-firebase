import React, { Component } from 'react';
import { Text, View, Switch } from 'react-native';

const Head = (props) => {

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //       switchValue:false
    //     };
    //   }
    
    //  toggleSwitch = (value) => {
    //     this.setState({switchValue: value})
    //  }
 
        return (
            <View 
                style={{
                    backgroundColor: '#1ABC9C',
                    height: 60, 
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 20,
                    elevation: 5,
                }}
            >
                <Text 
                    style={{
                        flexGrow: 1, 
                        color: '#FFF', 
                        fontSize: 22, 
                        height: 'auto',
                        zIndex: 100000,
                        textAlign: 'center',
                        textShadowColor: 'rgba(0, 0, 0, 0.75)',
                        textShadowOffset: { width: -1, height: 1 },
                        textShadowRadius: 5 
                    }}
                >My App</Text>
                <Switch
                    style={{marginTop:10}}
                    onValueChange = {props.funcClick}
                    value = {props.swState}
                />
            </View>
        );
    }

export default Head;
