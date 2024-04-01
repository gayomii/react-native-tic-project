import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/types';

const SearchResult = () => {
  const params: any = useRoute().params;
  const keyword = params?.keyword || '';
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="chevron-left" size={28} color="#000" />
      </TouchableOpacity>
      <Text>Search Result</Text>
      <Text>{keyword}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default SearchResult;
