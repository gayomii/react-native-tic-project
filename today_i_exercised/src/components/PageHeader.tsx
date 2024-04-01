import React, { ReactElement } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

type HeaderProps = {
  title: string;
  rightChild?: ReactElement;
};

const { width } = Dimensions.get('window');

const PageHeader = ({ title, rightChild }: HeaderProps) => {
  const navigation = useNavigation();

  return (
    <View style={styles.headerWrapper}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="chevron-left" size={28} color="#000" />
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View>{rightChild}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerWrapper: {
    backgroundColor: '#fff',
    width,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    marginBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  titleContainer: { flex: 1 },
  title: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default PageHeader;
