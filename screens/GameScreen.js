import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, Button} from 'react-native';

import Colors from '../constants/colors';
import NumberComponent from '../components/NumberContainer';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';

const genarateRandomBetween = (min,max,exclude) => {
    min = Maths.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random()*(max-min)) + min

    if(rndNum === exclude){
        return genarateRandomBetween(min,max,exclude);
    }else {
        return rndNum;
    }
}


const GameScreen = props => {

    const [currentGuess,setCurrentGuess] = useState(
        genarateRandomBetween(1,100,props.userChoice)
        );

    return (
        <View style={styles.screen}> 
            <Text>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <Button title='LOWER' />
                <Button title='GRETER' />
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
   screen: {
       flex: 1,
       padding: 10,
       alignItems: 'center',
   },
   buttonContainer: {
       flexDirection: 'row',
       justifyContent: 'space-around',
       marginTop: 20,
       width:300,
       maxWidth:'80%',
   }
});

export default GameScreen;

