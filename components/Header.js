import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

import Colors from '../constants/colors';
import TitleText from './TitleText';

const Header = props => {
    return (
        // more linear way to make style for IOS & ANDROID
        <View style={{ 
            ...styles.headerBase, 
            ...Platform.select({ 
                ios: styles.headerIOS, 
                android: headerAndriod 
            }) 
        }}>
            <TitleText style={styles.title}>{props.title}</TitleText>
        </View>
    )
}

const styles = StyleSheet.create({
    headerBase: {
        width: '100%',
        height: 90,
        paddingTop: 36,
        backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: Platform.OS === 'ios' ? '#ccc' : 'transparent',
        borderBottomWidth: Platform.OS === 'ios' ? 1 : 0
    },
    headerIOS: {
        backgroundColor: 'white',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
    headerAndriod: {
        backgroundColor: Colors.primary,

    },
    Titile: {
        color: Platform.OS === 'ios' ? Colors.primary : 'white',
        fontSize: 18
    }
});

export default Header;

