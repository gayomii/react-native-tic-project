import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Keyboard,
  Dimensions,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { default as Octicon } from 'react-native-vector-icons/Octicons';
import { dummy_recent_search } from '../apis/dummyData';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/types';

const { width } = Dimensions.get('window');

const SearchPage = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [keyword, setKeyword] = useState('');
  const [recentHistory, setRecentHistory] = useState(dummy_recent_search);

  const handleCancelButton = () => {
    setKeyword('');
    Keyboard.dismiss();
  };

  const submitKeyword = (keyword: string) => {
    setRecentHistory(Array.from(new Set([...recentHistory, keyword])));
    setKeyword('');
    navigation.navigate('SearchResult', {
      keyword,
    });
  };

  const RecentSearchHistory = ({
    item,
    deleteItem,
  }: {
    item: string;
    deleteItem: () => void;
  }) => {
    return (
      <View style={styles.searchHistoryContainer}>
        <TouchableOpacity
          onPress={() => {
            submitKeyword(item);
          }}>
          <Text style={styles.searchHistoryText}>{item}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={deleteItem}>
          <Icon name="clear" size={16} color="#c3c3c3" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      {/* 검색 창 */}
      <View style={styles.searchWrapper}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={28} color="#000" />
        </TouchableOpacity>
        <View style={styles.searchSection}>
          <Octicon name="hash" size={20} color="#7b7b7b" />
          <TextInput
            style={styles.inputStyle}
            returnKeyType="search"
            spellCheck={false}
            autoCorrect={false}
            autoCapitalize="none"
            value={keyword}
            onChangeText={text => setKeyword(text)}
            allowFontScaling={false}
            autoFocus
            onSubmitEditing={() => submitKeyword(keyword)}
          />
          <TouchableOpacity onPress={() => handleCancelButton()}>
            <Icon name="clear" size={24} color="#c3c3c3" />
          </TouchableOpacity>
        </View>
      </View>

      {/* 최근 검색 기록 */}
      <View style={styles.recentWrapper}>
        <View style={styles.recentTitle}>
          <Text style={styles.recentText}>최근 검색어</Text>
          <TouchableOpacity>
            <Text style={styles.deleteText} onPress={() => setRecentHistory([])}>
              전체 삭제
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={recentHistory}
          renderItem={({ item, index }) => {
            return (
              <RecentSearchHistory
                item={item}
                deleteItem={() => {
                  setRecentHistory(
                    recentHistory.filter(
                      (_item, recentHistoryIndex) => recentHistoryIndex !== index,
                    ),
                  );
                }}
              />
            );
          }}
        />
      </View>
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
  recentWrapper: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
  },
  recentTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 24,
  },
  recentText: { fontWeight: '600', fontSize: 16, color: '#3A3A3A' },
  deleteText: { fontWeight: '400', fontSize: 14, color: '#C3C3C3' },
  searchHistoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 12,
  },
  searchHistoryText: { fontSize: 16, color: '#3a3a3a' },
});

export default SearchPage;
