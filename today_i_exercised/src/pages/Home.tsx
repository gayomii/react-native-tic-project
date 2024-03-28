import React from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Home = () => {
  return (
    <SafeAreaView>
      <View style={styles.headerContainer}>
        <Icon name="directions-run" size={30} color="#000" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    padding: 12,
  },
});

export default Home;
