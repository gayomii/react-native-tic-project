import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import { FeedType } from '../types/types';
import { setAgoDays } from '../utils/setAgoDays';
import CommentsModal from './CommentsModal';

const { width, height } = Dimensions.get('window');

const RenderFeed = ({ item }: { item: FeedType }) => {
  const [showModal, setShowModal] = useState(false);
  const createdDate = setAgoDays(item.createdAt);

  return (
    <View style={styles.feedContainer}>
      <View style={styles.feedHeader}>
        <TouchableOpacity style={styles.feedUser}>
          <Image source={{ uri: item.profileImg }} style={styles.feedProfileImg} />
          <Text style={styles.feedUserName}>{item.name}</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="ellipsis1" size={20} color="#000" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={item.feedImg}
        horizontal
        renderItem={({ item: img, index }) => (
          <RenderImage item={img} index={index} totalLen={item.feedImg.length} />
        )}
        pagingEnabled
        keyExtractor={(item, index) => `image_${index}`}
      />

      <View style={styles.feedBottom}>
        <View style={styles.feedFeatures}>
          <View style={styles.feedIcons}>
            <TouchableOpacity>
              <Icon name="hearto" size={22} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setShowModal(!showModal);
                console.log('comment icon');
              }}>
              <Icon name="message1" size={22} color="#000" />
            </TouchableOpacity>
          </View>
          <View style={styles.hashTags}>
            {item.hashTag.map(tag => (
              <TouchableOpacity style={styles.hashTagBtn} key={tag}>
                <Text style={styles.hashTag}># {tag}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.feedContentsContainer}>
          <Text style={styles.feedContents}>{item.contents}</Text>
          <Text style={styles.feedTime}>{createdDate}</Text>
        </View>
      </View>

      {/* modal */}
      <CommentsModal
        showModal={showModal}
        setShowModal={setShowModal}
        item={item}
        leaveComment={(comment: string) =>
          item.comments.push({
            comment,
            userName: 'test',
            createdAt: new Date().getTime(),
          })
        }
      />
    </View>
  );
};

const RenderImage = ({
  item,
  index,
  totalLen,
}: {
  item: string;
  index: number;
  totalLen: number;
}) => {
  return (
    <View>
      <Image source={{ uri: item }} style={styles.feedImg} resizeMode="contain" />
      {totalLen > 1 && (
        <Text style={styles.imgCount}>
          {index + 1} / {totalLen}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  feedContainer: { paddingVertical: 24 },
  feedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 4,
    marginHorizontal: 16,
    marginBottom: 8,
  },
  feedUser: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
  feedProfileImg: {
    width: 32,
    height: 32,
  },
  feedUserName: {
    fontSize: 14,
    color: '#333',
  },
  feedImg: {
    width,
    height: width,
  },
  feedBottom: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  feedFeatures: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  hashTags: { flexDirection: 'row', gap: 4 },
  hashTagBtn: {
    borderRadius: 4,
    backgroundColor: '#F3F3F3',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  hashTag: { fontSize: 14, color: '#7B7B7B' },
  feedIcons: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  feedContentsContainer: { gap: 6, marginBottom: 32 },
  feedContents: { color: '#000', fontSize: 16 },
  feedTime: { fontWeight: '400', color: '#4f4f4f', fontSize: 12 },
  imgCount: {
    position: 'absolute',
    right: 5,
    top: 5,
    fontSize: 14,
    color: '#fff',
    backgroundColor: '#333',
    opacity: 0.4,
    padding: 5,
  },
});

export default RenderFeed;
