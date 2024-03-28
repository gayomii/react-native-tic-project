import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  createBottomTabNavigator,
  BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import Splash from './pages/Splash';
import Home from './pages/Home';
import Search from './pages/Search';
import Chat from './pages/Chat';
import NewPost from './pages/NewPost';
import MyPage from './pages/MyPage';
import CustomBottomTab from './components/CustomBottomTab';

import { RootStackParamList, RootBottomTabParamList } from './types/types';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootBottomTabParamList>();

const renderTabBar = (props: BottomTabBarProps) => <CustomBottomTab {...props} />;

const MainTab = () => {
  return (
    <Tab.Navigator
      tabBar={renderTabBar}
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="홈" component={Home} />
      <Tab.Screen name="검색" component={Search} />
      <Tab.Screen name="추가" component={NewPost} />
      <Tab.Screen name="채팅" component={Chat} />
      <Tab.Screen name="마이페이지" component={MyPage} />
    </Tab.Navigator>
  );
};

const Router = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="MainTab" component={MainTab} />
    </Stack.Navigator>
  );
};

export default Router;
