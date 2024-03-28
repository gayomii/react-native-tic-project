import React from 'react';
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

const { width } = Dimensions.get('window');

const RenderFeed = ({ item }: { item: FeedType }) => {
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
        <View style={styles.feedIcons}>
          <TouchableOpacity>
            <Icon name="hearto" size={22} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('touch comment icon')}>
            <Icon name="message1" size={22} color="#000" />
          </TouchableOpacity>
        </View>
        <View style={styles.feedContentsContainer}>
          <Text style={styles.feedContents}>{item.contents}</Text>
          <Text style={styles.feedTime}>{createdDate}</Text>
        </View>
      </View>
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
