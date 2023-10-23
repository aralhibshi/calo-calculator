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

  const calculatorButtonRows = [
    ['C', ['+/-'], '%', '/'],
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
            {row.map(([text], index) => (
              <Button
                key={index}
                text={text}
                buttonTheme={
                  text === 'C'
                    ? 'C'
                    : typeof text === 'string' && ['+/-', '%'].includes(text)
                    ? 'secondary'
                    : typeof text === 'string' && ['X', '-', '+', '/'].includes(text)
                    ? 'accent'
                    : text === '='
                    ? 'equal'
                    : 'default'
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
  }
});
