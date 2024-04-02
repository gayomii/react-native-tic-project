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
        renderItem={({ item, index }) => (
          <View style={styles.selectedImageContainer}>
            <Image source={{ uri: item.uri }} style={styles.selectedImage} />
            <TouchableOpacity
              style={styles.deleteBtn}
              onPress={() => {
                setSelectedImages(
                  selectedImages.filter(image => image.filename !== item.filename),
                );
              }}>
              <Text style={styles.deleteBtnText}>X</Text>
            </TouchableOpacity>
            <Text style={styles.imgCount}>
              {index + 1} / {selectedImages.length}
            </Text>
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
  selectedImageContainer: {
    width,
    height: width,
  },
  selectedImage: {
    width: '100%',
    height: '100%',
  },
  nextButton: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4AABFF',
  },
  deleteBtn: {
    position: 'absolute',
    right: 5,
    top: 0,
    fontSize: 16,
    backgroundColor: '#000',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteBtnText: {
    color: '#fff',
  },
  imgCount: {
    position: 'absolute',
    right: 5,
    bottom: 5,
    fontSize: 14,
    color: '#fff',
    backgroundColor: '#333',
    opacity: 0.4,
    padding: 5,
  },
});

export default NewPost;
