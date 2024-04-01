import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  createBottomTabNavigator,
  BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import Splash from './pages/Splash';
import Home from './pages/Home';
import SearchPage from './pages/SearchPage';
import ChatPage from './pages/ChatPage';
import NewPostPage from './pages/NewPostPage';
import MyPage from './pages/MyPage';
import CustomBottomTab from './components/CustomBottomTab';
import SearchResult from './pages/SearchResult';
import CalendarPage from './pages/CalendarPage';
import NewPostDetailPage from './pages/NewPostDetailPage';

import { RootStackParamList, RootBottomTabParamList } from './types/types';

const Stack = createStackNavigator<RootStackParamList>();
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
      <Tab.Screen name="검색" component={SearchPage} />
      <Tab.Screen name="기록하기" component={NewPostPage} />
      <Tab.Screen name="캘린더" component={CalendarPage} />
      <Tab.Screen name="마이페이지" component={MyPage} />
    </Tab.Navigator>
  );
};

const Router = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="MainTab" component={MainTab} />
      <Stack.Screen name="SearchResult" component={SearchResult} />
      <Stack.Screen name="Chat" component={ChatPage} />
      <Stack.Screen name="NewPostDetailPage" component={NewPostDetailPage} />
    </Stack.Navigator>
  );
};

export default Router;
