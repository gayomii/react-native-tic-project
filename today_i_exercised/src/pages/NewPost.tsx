import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import PageHeader from '../components/PageHeader';

const NewPost = () => {
  return (
    <SafeAreaView style={styles.newPostWrapper}>
      <PageHeader
        title="새 게시물"
        rightChild={
          <View>
            <TouchableOpacity>
              <Text style={styles.nextButton}>다음</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  newPostWrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  nextButton: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4AABFF',
  },
});

export default NewPost;
