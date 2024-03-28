import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Splash = ({ navigation }: any) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('MainTab');
    }, 2000);
  });

  return (
    <View style={styles.splashWrapper}>
      <Icon name="hiking" size={50} color="#000" />
      <Text style={styles.header}>Today I Climbed</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  splashWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
  },
  header: {
    fontSize: 24,
  },
});

export default Splash;
