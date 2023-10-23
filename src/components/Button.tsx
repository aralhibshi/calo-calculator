import React from 'react';
import { Dimensions, Pressable, Text, StyleSheet, Animated } from 'react-native';
import { theme } from '../theme';

type ButtonProps = {
  onPress?: () => void;
  text: any;
  buttonTheme?: any;
  textTheme?: any;
};

export const Button: React.FC<ButtonProps> = ({ onPress, text, buttonTheme }) => {
  const [scaleAnim] = React.useState(new Animated.Value(1));

  const handlePress = () => {
    Animated.timing(scaleAnim, {
      toValue: 0.8,
      duration: 50,
      useNativeDriver: true
    }).start(() => {
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 50,
        useNativeDriver: true
      }).start();
    });

    if (onPress) {
      onPress();
    }
  };

  return (
    <Pressable
      style={({ pressed }) => [
        buttonTheme === 'C' && !pressed
          ? styles.buttonRed
          : buttonTheme === 'secondary' && !pressed
          ? styles.buttonSecondary
          : buttonTheme === 'accent' && !pressed
          ? styles.buttonAccent
          : buttonTheme === 'default' && !pressed
          ? styles.buttonDefault
          : buttonTheme === 'equal' && !pressed
          ? styles.buttonEqual
          : '',
        buttonTheme === 'C' && pressed ? styles.buttonPressedRed : pressed ? styles.buttonPressed : '',
        styles.button,
        buttonTheme
      ]}
      onPress={handlePress}
    >
      <Animated.View
        style={{
          transform: [{ scale: scaleAnim }]
        }}
      >
        <Text style={[styles.buttonText, buttonTheme === 'secondary' ? styles.textBlack : styles.buttonText]}>
          {text}
        </Text>
      </Animated.View>
    </Pressable>
  );
};

const screen = Dimensions.get('window');
const buttonWidth = screen.width / 4;

const styles = StyleSheet.create({
  button: {
    flex: 1,
    height: Math.floor(buttonWidth - 10),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Math.floor(buttonWidth),
    margin: 5
  },
  buttonRed: {
    backgroundColor: theme.buttonBackgroundColorRed
  },
  buttonAccent: {
    backgroundColor: theme.buttonBackgroundColorAccent
  },
  buttonSecondary: {
    backgroundColor: theme.buttonBackgroundColorSecondary,
    color: theme.colorBlack
  },
  buttonEqual: {
    backgroundColor: theme.buttonBackgroungColorEqual
  },
  buttonDefault: {
    backgroundColor: theme.buttonBackgroundColorDefault
  },
  buttonPressedRed: {
    backgroundColor: theme.buttonBackgroundColorPressedRed
  },
  buttonPressed: {
    backgroundColor: theme.buttonBackgroundColorPressed
  },
  buttonText: {
    color: theme.colorWhite,
    fontSize: theme.fontSizeButton
  },
  textBlack: {
    color: theme.colorBlack
  }
});
