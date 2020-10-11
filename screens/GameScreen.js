import React, {useState, useRef, useEffect} from 'react';
// useRef is also like useState but if useRef value change it does not re-render
import {Diementions, View, Text, StyleSheet, TextInput, Button, Alert, ScrollView, Dimensions} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

// import Colors from '../constants/colors';
// import NumberComponent from '../components/NumberContainer';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import DefaultStyles from '../constants/default-styles';
import MainBtton from '../components/MainButton';
import BodyText from '../components/BodyText';

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

const renderListItem = (value, numOfRound) => (
    <View key={value} style={styles.listItem}>
        <BodyText>#{numOfRound}</BodyText>
        <BodyText>{value}</BodyText>
    </View>
)


const GameScreen = props => {

    const initialGuess =  genarateRandomBetween(1,100,props.userChoice);

    const [currentGuess,setCurrentGuess] = useState(
        // genarateRandomBetween(1,100,props.userChoice)
        initialGuess
    );

    const [passGuesses, setpassGuesses] = useState([]);

    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    // this funtion useEffect execute after every cycle GameScreen executed
    // GAME IS OVER
    // pull the properties of props
    // [] is to when execute use effect
    const {userChoice, onGameOver} = props;

    useEffect(() => {
        if(currentGuess === props.userChoice){
            onGameOver(passGuesses.length);
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
            currentLow.current = currentGuess+1;
        }
        const nextNumber = genarateRandomBetween(currentLow.current,currentHigh.current,currentGuess);
        setCurrentGuess(nextNumber);
        // setRounds(currentRounds => currentRounds+1);
        setpassGuesses(curPastGuesses => [nextNumber,...curPastGuesses])
    }

    // another way to handle width with differennt size of phone screens
    let listContainerStyle = styles.listContainer;

    if(Dimensions.get('window').width < 350){
        listContainerStyle = styles.listContainerBig;
    }

    return (
        <View style={styles.screen}> 
        {/* another way to add styles by defaulr-styles */}
            <Text style={DefaultStyles.title}>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainBtton  onPress={nextGuessHandler.bind(this,'lower')} >
                    <Ionicons name="md-remove" size={24} color="white" />LOWER 
                </MainBtton>
                <MainBtton  onPress={nextGuessHandler.bind(this,'greater')} >
                    <Ionicons name="md-add" size={24} color="white" />GREATER 
                </MainBtton>
            </Card>

            <View style={styles.listContainerStyle}>
                <ScrollView contentContainerStyle={styles.list}>
                    {passGuesses.map((guess,index) => renderListItem(guess,passGuesses.length-index))}
                </ScrollView>
            </View>
            
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
       marginTop: Dimensions.get('window').height > 600? 20 : 10 ,
       width:400,
       maxWidth:'90%',
   },
   listItem : {
       borderColor: '#ccc',
       borderWidth:1,
       padding: 15,
       marginVertical: 10,
       backgroundColor: 'white',
       flexDirection: 'row',
       justifyContent: 'space-between',
       width: '60%'
   },
   listContainer: {
       width: '60%',
    //    to scroll android
        flex: 1,
   },
   listContainerBig: {
       flex: 1,
       width: '80%',
   },
   list: {
       flexGrow: 1,
       alignItems: 'center',
       justifyContent: "flex-end"
   }
});

export default GameScreen;

