import React, {useState, useRef, useEffect} from 'react';
// useRef is also like useState but if useRef value change it does not re-render
import {View, Text, StyleSheet, TextInput, Button, Alert} from 'react-native';

// import Colors from '../constants/colors';
// import NumberComponent from '../components/NumberContainer';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import DefaultStyles from '../constants/default-styles';




const genarateRandomBetween = (min,max,exclude) => {
    min = Math.ceil(min);
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

    const [rounds, setRounds] = useState(0);

    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    // this funtion useEffect execute after every cycle GameScreen executed
    // GAME IS OVER
    // pull the properties of props
    // [] is to when execute use effect
    const {userChoice, onGameOver} = props;

    useEffect(() => {
        if(currentGuess === props.userChoice){
            onGameOver(rounds);
        }
    },[currentGuess, userChoice, onGameOver])

    const nextGuessHandler = direction => {
        if((direction === 'lower' && currentGuess < props.userChoice) || (direction === 'greater' && currentGuess > props.userChoice)  ){
            Alert.alert('Don\'t lie!', 'You know that is wrong...',[{text:'Sorry', style: 'cancel'}]);
            return;
        }
        if (direction ==='lower'){
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess;
        }
        const nextNumber = genarateRandomBetween(currentLow.current,currentHigh.current,currentGuess);
        setCurrentGuess(nextNumber);
        setRounds(currentRounds => currentRounds+1);
    }

    return (
        <View style={styles.screen}> 
        {/* another way to add styles by defaulr-styles */}
            <Text style={DefaultStyles.title}>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <Button title='LOWER' onPress={nextGuessHandler.bind(this,'lower')} />
                <Button title='GRETER' onPress={nextGuessHandler.bind(this,'greater')} />
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

