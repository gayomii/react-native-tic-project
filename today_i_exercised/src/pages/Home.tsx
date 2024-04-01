import React from 'react';
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

const logo = require('../assets/logo.png');

const Home = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.homeWrapper}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <View style={styles.logo}>
          <Image source={logo} style={styles.logoImg} />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Chat' as never)}>
          <Icon name="envelope" size={20} color="#333" />
        </TouchableOpacity>
      </View>
      {/* Main */}
      <View style={styles.mainContainer}>
        <FlatList
          data={dummy_feed}
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
