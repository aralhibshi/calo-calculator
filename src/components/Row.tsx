import React, { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';

type RowProps = {
  children: ReactNode;
};

export const Row: React.FC<RowProps> = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  }
});
