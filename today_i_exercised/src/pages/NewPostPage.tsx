import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import PageHeader from '../components/PageHeader';
import { ImageType, RootStackParamList } from '../types/types';

const { width } = Dimensions.get('window');

const NewPost = () => {
  const route = useRoute();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const imageWidth = width / 4 - 1;

  const fetchImages = () => {
    CameraRoll.getPhotos({
      first: 100,
    }).then(res => {
      setImages(res.edges.map(e => e.node.image));
    });
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const selectImage = (item: ImageType) => {
    const targetIdx = selectedImages.findIndex(
      (img: ImageType) => img.filename === item.filename,
    );
    if (targetIdx === -1) {
      setSelectedImages([...selectedImages, item]);
    } else {
      setSelectedImages([
        ...selectedImages.slice(0, targetIdx),
        ...selectedImages.slice(targetIdx + 1, selectedImages.length),
      ]);
    }
  };

  const renderItem = ({ item }: { item: ImageType }) => {
    return (
      <TouchableOpacity
        onPress={() => selectImage(item)}
        style={{ borderWidth: 0.5, borderColor: '#fff' }}>
        <Image
          source={{ uri: item.uri }}
          style={{ width: imageWidth, height: imageWidth }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.newPostWrapper}>
      <PageHeader
        title="새 게시물"
        rightChild={
          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('NewPostDetailPage', {
                  images: selectedImages,
                });
              }}>
              <Text style={styles.nextButton}>다음</Text>
            </TouchableOpacity>
          </View>
        }
      />
      {/* main */}
      <FlatList
        data={selectedImages}
        horizontal
        keyExtractor={item => item.filename}
        removeClippedSubviews
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View>
            <Image source={{ uri: item.uri }} style={styles.selectedImage} />
          </View>
        )}
      />
      <FlatList
        data={images}
        renderItem={renderItem}
        keyExtractor={item => item.filename}
        numColumns={4}
        removeClippedSubviews
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  newPostWrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  selectedImage: {
    width,
    height: width,
  },
  nextButton: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4AABFF',
  },
});

export default NewPost;
