import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import RenderFeed from '../components/RenderFeed';
import { dummy_feed } from '../apis/dummyData';

const Home = () => {
  return (
    <SafeAreaView style={styles.homeWrapper}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Icon name="hiking" size={30} color="#000" />
        <Text style={styles.iconText}>TIC</Text>
      </View>
      {/* Main */}
      <View style={styles.mainContainer}>
        <FlatList
          data={dummy_feed}
          renderItem={RenderFeed}
          keyExtractor={(item, index) => index.toString()}
          removeClippedSubviews
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  homeWrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderBottomWidth: 0.5,
    borderColor: '#e0e0e0',
  },
  iconText: {
    fontSize: 20,
    letterSpacing: 2,
  },
  mainContainer: {
    paddingBottom: 24,
    backgroundColor: '#fff',
    flex: 1,
  },
});

export default Home;
