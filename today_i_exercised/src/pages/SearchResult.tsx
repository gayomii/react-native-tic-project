import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Dimensions,
  TextInput,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/types';
import { dummy_feed } from '../apis/dummyData';
import RenderFeed from '../components/RenderFeed';
import { default as Octicon } from 'react-native-vector-icons/Octicons';

const { width } = Dimensions.get('window');

const SearchResult = () => {
  const params: any = useRoute().params;
  const keyword = params?.keyword || '';
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const data = dummy_feed.filter(feed => feed.hashTag.indexOf(keyword) !== -1);

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.searchWrapper}>
        <View style={styles.searchSection}>
          <Octicon name="hash" size={20} color="#7b7b7b" />
          <TextInput
            style={styles.inputStyle}
            returnKeyType="search"
            spellCheck={false}
            autoCorrect={false}
            autoCapitalize="none"
            value={keyword}
            editable={false}
            allowFontScaling={false}
            onPressIn={() => navigation.goBack()}
          />
        </View>
      </View>
      {data.length ? (
        <FlatList
          data={data}
          renderItem={({ item, index }) => {
            return <RenderFeed item={item} />;
          }}
          keyExtractor={(item, index) => index.toString()}
          removeClippedSubviews
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.noResult}>
          <Text>검색 결과가 없습니다.</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchWrapper: {
    height: 68,
    backgroundColor: '#fff',
    width,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    marginBottom: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 12,
    gap: 6,
    flex: 1,
  },
  inputStyle: {
    flex: 1,
    paddingVertical: 12,
    paddingRight: 12,
    fontSize: 16,
    fontWeight: '400',
    color: '#828282',
    backgroundColor: '#f8f8f8',
  },
  noResult: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default SearchResult;
