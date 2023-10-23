import React from 'react';
import { Dimensions, Pressable, Text, StyleSheet, Animated } from 'react-native';
import { theme } from '../theme';

type ButtonProps = {
  onPress?: () => void;
  text: any;
  buttonTheme?: any;
  textTheme?: any;
};

export const Button: React.FC<ButtonProps> = ({ onPress, text, buttonTheme, textTheme }) => {
  const [scaleAnim] = React.useState(new Animated.Value(1));

  const handlePress = () => {
    Animated.timing(scaleAnim, {
      toValue: 0.8,
      duration: 90,
      useNativeDriver: true
    }).start(() => {
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 90,
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
        {
          backgroundColor: theme.buttonBackgroundColorDefault,
          ...(pressed && { backgroundColor: theme.buttonBackgroundColorPressed })
        },
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
        <Text style={[styles.buttonText, textTheme]}>{text}</Text>
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

  buttonText: {
    color: theme.colorWhite,
    fontSize: theme.fontSizeButton
  }
});
