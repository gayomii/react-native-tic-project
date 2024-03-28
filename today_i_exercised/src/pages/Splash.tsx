import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Splash = ({ navigation }: any) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('MainTab');
    }, 2000);
  });

  return (
    <View style={styles.splashWrapper}>
      <Icon name="directions-run" size={50} color="#000" />
    </View>
  );
};

const styles = StyleSheet.create({
  splashWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Splash;
