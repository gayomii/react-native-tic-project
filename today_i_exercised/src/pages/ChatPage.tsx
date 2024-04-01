import React from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import PageHeader from '../components/PageHeader';

const ChatPage = () => {
  return (
    <SafeAreaView style={styles.chatWrapper}>
      <PageHeader title="채팅" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  chatWrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default ChatPage;
