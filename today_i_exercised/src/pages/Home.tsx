import React, { useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import RenderFeed from '../components/RenderFeed';
import { dummy_feed } from '../apis/dummyData';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/types';

const logo = require('../assets/logo.png');

const Home = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  let feedList = dummy_feed;
  useEffect(() => {
    feedList = dummy_feed.sort((a, b) => b.createdAt - a.createdAt);
  }, [dummy_feed]);

  return (
    <SafeAreaView style={styles.homeWrapper}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <View style={styles.logo}>
          <Image source={logo} style={styles.logoImg} />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
          <Icon name="envelope" size={20} color="#333" />
        </TouchableOpacity>
      </View>
      {/* Main */}
      <View style={styles.mainContainer}>
        <FlatList
          data={feedList}
          renderItem={({ item, index }) => {
            return <RenderFeed item={item} />;
          }}
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
    borderBottomWidth: 0.5,
    borderColor: '#f2f2f2',
    justifyContent: 'space-between',
  },
  logo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  logoImg: {
    height: 24,
    width: 76,
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
