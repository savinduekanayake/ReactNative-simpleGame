import React from 'react';
import {View, Text, StyleSheet, Button, Image} from 'react-native';

import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import MainBtton from '../components/MainButton';

const GameOverScreen = props => {
    return(
        <View style={styles.screen}>
            <BodyText style={styles.resultText}>The Game is over!</BodyText>
            <View style={styles.imageContainer}>
                <Image 
                    fadeDuration= {300}
                    source={require('../assets/success.png')} 
                    // source={uri: }
                    style={styles.image}
                    resizeMode="cover"
                />
            </View>
            <View>
                <BodyText style={styles.resultContainer}>
                    Your phone needed 
                    <Text style={styles.highlight}>{props.roundsNumber}</Text>  
                    rounds to guess the number 
                    <Text style={styles.highlight}>{props.userNumber}</Text>
                </BodyText>   
            </View>

            {/* <BodyText>Number was:{props.userNumber} </BodyText> */}
            
            <MainBtton onPress= {props.onRestart}>NEW GAME </MainBtton>
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: "100%",
    },
    imageContainer: {
        width: 300,
        height: 300,
        borderRadius: 150,
        borderWidth: 3,
        borderColor: 'black',
        // to get round. children will get crops
        overflow: 'hidden',
        margin: 30
    },
    highlight: {
        color: Colors.primary,
        fontFamily: 'open-sans-bold',
    },
    resultContainer :{
        marginHorizontal: 30, 
        marginVertical: 15
    },
    resultText: {
        textAlign: 'center',
        fontSize: 20
    }
});

export default GameOverScreen;