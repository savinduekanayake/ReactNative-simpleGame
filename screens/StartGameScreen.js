import React, { useState } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    Button, 
    TouchableWithoutFeedback,
    Keyboard, // for close the keyboard by click around
    Alert,
} from 'react-native';

import Colors from '../constants/colors';
import Card from '../components/Card';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';

const StartGameScreen = props => {

    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber,setSelectedNumber] = useState();

    const numberInputHandler = inputText => {
        // validate by only add numbers. otherwise empty 
        setEnteredValue(inputText.replace(/[^0-9]/,''));
    }

    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
        // console.log('Entered value: '+enteredValue);
    }

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue);
        if(isNaN(chosenNumber) || chosenNumber <=0 || chosenNumber > 99){
            Alert.alert('Invalid Number!', 'Number has to be between 1 and 99',[{text:'Okey', style: 'destructive', onPress: resetInputHandler}])
            return;
        }
        setConfirmed(true);
        setSelectedNumber(parseInt(enteredValue)); //convert text to the int
        setEnteredValue('');
        Keyboard.dismiss()
    }

    let confirmedOutput;

    if(confirmed){
        confirmedOutput = (
            <Card style={styles.summaryContainer}>
                <Text>You selected</Text>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <Button title='Start Game' />
            </Card>
        );
    }

    return (
        <TouchableWithoutFeedback onPress={() => {
            // for close the keyboard by click around
            Keyboard.dismiss();
        }}>
            <View style={styles.screen}>
                <Text style={styles.title}>Start a New Game</Text>

                <Card style={styles.inputContainer}>
                    <Text>Select a Number</Text>

                    <Input
                        style={styles.input}
                        blurOnSubmit autoCapitalize='none'
                        autoCorrect={false}
                        keyboardType='number-pad'
                        maxLength={2}
                        onChangeText={numberInputHandler}
                        value={enteredValue}
                    />

                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <Button title='Reset' onPress={resetInputHandler } color={Colors.accent} />
                        </View>
                        <View style={styles.button}>
                            <Button title='Confirm' onPress={confirmInputHandler} color={Colors.primary} />
                        </View>
                    </View>
                </Card>

                {confirmedOutput}

            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    button: {
        width: 100,
    },
    input: {
        width: 50,
        textAlign: 'center'
    },
    summaryContainer: {
        marginTop:20,
        alignItems: 'center',
    }
});

export default StartGameScreen;

