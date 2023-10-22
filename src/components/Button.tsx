import React from 'react';
import { Dimensions, Pressable, Text, StyleSheet } from 'react-native';
import { theme } from '../theme';

type ButtonProps = {
  onPress?: () => void;
  text: any;
  buttonTheme?: any;
  textTheme?: any;
};

export const Button: React.FC<ButtonProps> = ({ onPress, text, buttonTheme, textTheme }) => {
  return (
    <Pressable style={[styles.button, buttonTheme]} onPress={onPress}>
      <Text style={[styles.buttonText, textTheme]}>{text}</Text>
    </Pressable>
  );
};

const screen = Dimensions.get('window');
const buttonWidth = screen.width / 4;

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.buttonBackgroundColorDefault,
    flex: 1,
    height: Math.floor(buttonWidth - 10),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Math.floor(buttonWidth),
    margin: 5
  },

  buttonText: {
    color: theme.colorWhite,
    fontSize: theme.fontSizeButton
  }
});
