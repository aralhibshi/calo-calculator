import React from 'react';
import { StatusBar, SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { theme } from './theme';
import { Row } from './components/Row';
import { Button } from './components/Button';
import { calculateResult } from './utilities/calculate';

export const App: React.FC = () => {
  const [expression, setExpression] = React.useState<string | number>('');
  const [result, setResult] = React.useState<string | number>('');

  React.useEffect(() => {
    setResult(0);
  }, []);

  const handlePress = (text: any) => {
    console.log(text);
    if (text === 'C') {
      setExpression('');
      setResult(0);
    } else if (text === '=') {
      try {
        setResult(calculateResult(expression));
        setExpression(calculateResult(expression));
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
    [
      ['C', styles.buttonSecondary],
      ['+/-', styles.buttonSecondary],
      ['%', styles.buttonSecondary],
      ['/', styles.buttonAccent]
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
            {row.map(([text, buttonStyle], index) => (
              <Button
                key={index}
                text={text}
                buttonTheme={
                  typeof text === 'string' && ['X', '-', '+'].includes(text)
                    ? [styles.buttonAccent]
                    : text === '='
                    ? styles.buttonEqual
                    : buttonStyle
                }
                onPress={() => handlePress(text)}
              />
            ))}
          </Row>
        ))}
      </SafeAreaView>
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
  buttonAccent: {
    backgroundColor: theme.buttonBackgroundColorAccent
  },
  buttonSecondary: {
    backgroundColor: theme.buttonBackgroundColorSecondary
  },
  buttonEqual: {
    borderWidth: 3,
    borderColor: theme.borderColor
  },
  textBlack: {
    color: theme.colorBlack
  }
});
