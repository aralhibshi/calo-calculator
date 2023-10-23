import React from 'react';
import { StatusBar, SafeAreaView, View, Text, StyleSheet } from 'react-native';
import DropdownAlert, { DropdownAlertData, DropdownAlertType } from 'react-native-dropdownalert';
import { theme } from './theme';
import { Row } from './components/Row';
import { Button } from './components/Button';
import { calculateResult } from './utilities/calculate';

export const App: React.FC = () => {
  const [expression, setExpression] = React.useState<string | number>('');
  const [result, setResult] = React.useState<string | number>('');
  const [alert, setAlert] = React.useState(false);

  let alertFunc: (data: DropdownAlertData) => Promise<DropdownAlertData>;

  React.useEffect(() => {
    setResult(0);
  }, []);

  const handlePress = (text: any) => {
    if (text === 'C') {
      setExpression('');
      setResult(0);
    } else if (text === '=') {
      try {
        let calculation = calculateResult(expression);
        console.log(expression);

        if (calculation > 10) {
          setResult(':(');
          setExpression('');
          setAlert(true);
          alertFunc({
            type: DropdownAlertType.Error,
            title: 'Error',
            message: 'unga bunga me only count to 10'
          });
        } else {
          setResult(calculation);
          setExpression(calculation);
        }
      } catch (error) {
        setResult('Error');
      }
    } else {
      const newExpression = expression + text;
      setExpression(newExpression);
      setResult(newExpression);
      console.log(newExpression);
    }
  };

  const textBlack = styles.textBlack;
  const btnSecond = styles.buttonSecondary;

  const calculatorButtonRows = [
    [
      ['C', '', styles.buttonRed],
      ['+/-', textBlack, btnSecond],
      ['%', textBlack, btnSecond],
      ['/', '', styles.buttonAccent]
    ],
    ['7', '8', '9', 'X'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '=']
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} />
      <SafeAreaView>
        <Text style={styles.value}>{result}</Text>

        {calculatorButtonRows.map((row, rowIndex) => (
          <Row key={rowIndex}>
            {row.map(([text, textStyle, buttonStyle], index) => (
              <Button
                key={index}
                text={text}
                textTheme={textStyle}
                buttonTheme={
                  typeof text === 'string' && ['X', '-', '+'].includes(text)
                    ? [styles.buttonAccent]
                    : text === '='
                    ? styles.buttonEqual
                    : buttonStyle
                }
                onPress={() => handlePress(text)}
              >
                {}
              </Button>
            ))}
          </Row>
        ))}
      </SafeAreaView>
      {alert ? <DropdownAlert alert={func => (alertFunc = func)} /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.backgroundColor,
    justifyContent: 'flex-end',
    padding: 5
  },
  value: {
    color: theme.colorWhite,
    fontSize: theme.fontSizeValue,
    textAlign: 'right',
    marginRight: 20,
    marginBottom: 10
  },
  buttonRed: {
    backgroundColor: theme.buttonBackgroundColorRed
  },
  buttonAccent: {
    backgroundColor: theme.buttonBackgroundColorAccent
  },
  buttonSecondary: {
    backgroundColor: theme.buttonBackgroundColorSecondary
  },
  buttonClear: {
    backgroundColor: ''
  },
  buttonEqual: {
    borderWidth: 3,
    borderColor: theme.borderColor
  },
  textBlack: {
    color: theme.colorBlack
  }
});
