import React, { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import { BottomNavigation } from '../navigation';

type ScreenProps = {
  children: ReactNode;
  // Add any other props your component might need
};

export const Screen: React.FC<ScreenProps> = ({ children }) => {
  return (
    <View style={styles.body}>
      {children}
      <BottomNavigation onNavigate={() => {}} />
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    height: '100%',
    width: '100%',
  },
});
