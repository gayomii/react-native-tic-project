import React, { useState } from 'react';
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  TextInput,
  FlatList,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Octicons';
import PageHeader from '../components/PageHeader';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootBottomTabParamList, ImageType } from '../types/types';
import { dummy_feed } from '../apis/dummyData';

const NewPostDetailPage = () => {
  const params: any = useRoute().params;
  const images = params?.images || [];
  const navigation = useNavigation<StackNavigationProp<RootBottomTabParamList>>();
  const [textValue, setTextValue] = useState('');
  const [keyword, setKeyword] = useState('');
  const [keywords, setKeywords] = useState([]);

  const addKeyword = (targetKeyword: string) => {
    const newKeywordList = Array.from(new Set([...keywords, targetKeyword]));
    if (newKeywordList.length > 3) {
      return alert('키워드는 3개까지 입력할 수 있습니다.');
    } else {
      setKeywords(newKeywordList);
    }
  };

  const deleteKeyword = (targetKeyword: string) => {
    const newKeywordList = keywords.filter(keyword => keyword !== targetKeyword);
    setKeywords(newKeywordList);
  };

  const addFeed = () => {
    try {
      const id = dummy_feed.length + 1;
      const imageUris = images?.map((image: ImageType) => image.uri) || [];

      dummy_feed.push({
        id,
        name: 'Gayeon_Climb',
        profileImg: 'https://avatar.iran.liara.run/public',
        feedImg: [...imageUris],
        createdAt: new Date().getTime(),
        like: 0,
        likeUsers: [],
        comments: [],
        hashTag: keywords,
        contents: textValue,
      });

      alert('등록되었습니다.');
      navigation.navigate('홈');
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <SafeAreaView style={styles.newPostWrapper}>
      <PageHeader
        title="새 게시물"
        rightChild={
          <View>
            <TouchableOpacity onPress={addFeed}>
              <Text style={styles.completeButton}>등록</Text>
            </TouchableOpacity>
          </View>
        }
      />
      <View style={styles.newPostDetailContainer}>
        <FlatList
          data={images}
          horizontal
          pagingEnabled
          keyExtractor={(item, index) => `image_${index}`}
          renderItem={({ item }) => {
            return (
              <Image
                style={styles.selectedImage}
                source={{ uri: item.uri }}
                width={90}
                height={90}
              />
            );
          }}
        />
        <TextInput
          multiline
          maxLength={500}
          placeholder="문구를 입력해주세요."
          placeholderTextColor="#bbb"
          autoCapitalize="none"
          spellCheck={false}
          autoCorrect={false}
          value={textValue}
          onChangeText={text => setTextValue(text)}
          style={styles.contentsInput}
        />
        <View style={styles.keywordContainer}>
          <View style={styles.keywordHeader}>
            <Text style={styles.keywordLabel}>키워드 추가</Text>
            <Text style={styles.keywordLabelNotice}>*최대 3개까지 입력 가능</Text>
          </View>
          <View style={styles.keywordInputSection}>
            <Icon name="hash" size={16} color="#7b7b7b" />
            <TextInput
              maxLength={20}
              placeholder="키워드를 입력해주세요."
              placeholderTextColor="#bbb"
              autoCapitalize="none"
              spellCheck={false}
              autoCorrect={false}
              onSubmitEditing={() => {
                addKeyword(keyword);
                setKeyword('');
              }}
              value={keyword}
              onChangeText={keyword => setKeyword(keyword)}
              style={styles.keywordInput}
            />
          </View>
          <FlatList
            data={keywords}
            horizontal
            renderItem={({ item }) => {
              return (
                <View style={styles.selectedKeyword}>
                  <Text style={styles.selectedKeywordText}># {item}</Text>
                  <TouchableOpacity onPress={() => deleteKeyword(item)}>
                    <Text style={styles.selectedKeywordText}>X</Text>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  newPostWrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  newPostDetailContainer: {
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    gap: 24,
  },
  selectedImage: {
    marginRight: 8,
    borderRadius: 5,
  },
  completeButton: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4AABFF',
  },
  contentsInput: {
    fontSize: 16,
    color: '#333',
    marginBottom: 24,
    maxHeight: 100,
  },
  keywordContainer: {},
  keywordHeader: {
    flexDirection: 'row',
    gap: 8,
  },
  keywordLabel: {
    fontSize: 16,
    marginBottom: 4,
  },
  keywordLabelNotice: {
    fontSize: 12,
    color: '#FF5252',
    marginBottom: 16,
  },
  keywordInputSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    gap: 6,
    paddingHorizontal: 12,
  },
  keywordInput: {
    color: '#828282',
    backgroundColor: '#f8f8f8',
    paddingVertical: 12,
    paddingRight: 12,
    fontSize: 16,
    fontWeight: '400',
  },
  selectedKeyword: {
    flexDirection: 'row',
    color: '#828282',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginTop: 16,
    marginRight: 12,
    borderRadius: 5,
    gap: 8,
  },
  selectedKeywordText: {
    fontSize: 16,
    color: '#828282',
  },
});

export default NewPostDetailPage;
