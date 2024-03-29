import React from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import PageHeader from '../components/PageHeader';

const Calendar = () => {
  return (
    <SafeAreaView style={styles.calendarWrapper}>
      <PageHeader title="캘린더" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  calendarWrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default Calendar;
