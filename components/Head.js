import React, { Component } from 'react';
import { Text, View, Switch } from 'react-native';

const Head = (props) => {
 
        return (
            <View 
                style={{
                    backgroundColor: '#41cac6',
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
                >CycleTrack</Text>
                <Switch
                    style={{ marginTop:10, transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
                    onValueChange = {props.funcClick}
                    value = {props.swState}
                />
            </View>
        );
    }

export default Head;
