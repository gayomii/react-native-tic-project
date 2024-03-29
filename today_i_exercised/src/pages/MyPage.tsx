import React from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import PageHeader from '../components/PageHeader';

const MyPage = () => {
  return (
    <SafeAreaView style={styles.myPageWrapper}>
      <PageHeader title="마이페이지" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  myPageWrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default MyPage;
