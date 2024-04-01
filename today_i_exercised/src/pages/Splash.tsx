import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const logo = require('../assets/logo.png');

const Splash = ({ navigation }: any) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('MainTab');
    }, 2000);
  });

  return (
    <View style={styles.splashWrapper}>
      <Image source={logo} style={styles.logoImg} />
      <Text style={styles.subTitle}>Today I Climbed...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  splashWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  logoImg: {
    width: 76,
    height: 30,
  },
  subTitle: {
    fontSize: 24,
  },
});

export default Splash;
