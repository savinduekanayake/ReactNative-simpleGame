import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Header = props => {
    return (
        <View style={styles.header}>
            <Text style={styles.headerTitile}>{props.title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width:'100%',
        height:90,
        paddingTop: 36,
        backgroundColor: '#f7287b',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitile: {
        color:'black',
        fontSize: 18
    }
});

export default Header;

