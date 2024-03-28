import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

type IconProps = {
  name: string;
  type?: string;
};

const buttomIcon = ({ name, type = 'inactive' }: IconProps) => {
  const color = type === 'inactive' ? '#000' : '#0076FF';
  return <Icon name={name} color={color} size={24} />;
};

const iconNames: { [key: string]: string } = {
  홈: 'home',
  검색: 'manage-search',
  추가: 'mode-edit',
  채팅: 'message',
  마이페이지: 'person',
};

const CustomBottomTab = ({ state, navigation, insets }: BottomTabBarProps) => {
  const { routes, index: focusedIndex } = state;

  const onPress = (route: any, index: any) => {
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });
    const isFocused = focusedIndex === index;
    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name);
    }
  };

  return (
    <View style={[styles.bottomTabBarWrapper, { paddingBottom: insets.bottom }]}>
      {routes.map((route, index) => {
        const isFocused = focusedIndex === index;
        return (
          <TouchableOpacity
            style={styles.bottomTabBar}
            onPress={() => onPress(route, index)}
            key={route.key}
            activeOpacity={0.7}>
            <Animated.View style={styles.bottomTabBarItem}>
              {buttomIcon({
                name: iconNames[route.name],
                type: isFocused ? 'active' : 'inactive',
              })}
              <Text style={styles.bottomTabBarText}>{route.name}</Text>
            </Animated.View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  bottomTabBarWrapper: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    justifyContent: 'space-between',
    borderStyle: 'solid',
    borderTopWidth: 0.5,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderColor: '#eee',
    backgroundColor: '#fff',
    paddingTop: 12,
    zIndex: 10,
  },
  bottomTabBar: {
    flex: 1,
    alignItems: 'center',
  },
  bottomTabBarItem: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  bottomTabBarText: {
    fontSize: 12,
  },
});

export default CustomBottomTab;
