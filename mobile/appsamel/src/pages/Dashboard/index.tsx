import 'react-native-gesture-handler';

import React from 'react';
import { StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const { Navigator, Screen } = createBottomTabNavigator();

import Icons from 'react-native-vector-icons/Ionicons';
import Doctor from './Doctor';
import Paitent from './Paitent';
import Attendance from './Attendance';

const Dashboard: React.FC = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <Navigator
        tabBarOptions={{
          style: {
            height: 60,
            backgroundColor: '#ffffff',
            borderTopWidth: 0,
          },
          tabStyle: {
            alignItems: 'center',
            justifyContent: 'center',
          },
          iconStyle: {
            flex: 0,
            width: 20,
            height: 20,
          },
          labelStyle: {
            fontFamily: 'Roboto-Medium',
            fontSize: 11,
            marginTop: 5,
          },
          inactiveTintColor: '#bdbdbd',
          activeTintColor: '#53b29d',
        }}
      >
        <Screen
          name="Paitent"
          component={Paitent}
          options={{
            tabBarIcon: ({ size, focused }) => {
              return (
                <Icons
                  name="person-outline"
                  size={size}
                  color={focused ? '#53b29d' : '#bdbdbd'}
                />
              );
            },
          }}
        />
        <Screen
          name="Doctor"
          component={Doctor}
          options={{
            tabBarIcon: ({ size, focused }) => {
              return (
                <Icons
                  name="medkit-outline"
                  size={size}
                  color={focused ? '#53b29d' : '#bdbdbd'}
                />
              );
            },
          }}
        />
        <Screen
          name="Attendance"
          component={Attendance}
          options={{
            tabBarIcon: ({ size, focused }) => {
              return (
                <Icons
                  name="home-outline"
                  size={size}
                  color={focused ? '#53b29d' : '#bdbdbd'}
                />
              );
            },
          }}
        />
      </Navigator>
    </NavigationContainer>
  );
};

export default Dashboard;
