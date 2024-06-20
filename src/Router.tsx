import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {RecoilRoot} from 'recoil';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {QuestionScreen} from './screens/QuestionScreen';
import {NavigationContainer} from '@react-navigation/native';
import {LeaderBoardScreen} from './screens/LeaderBoard';

const Tab = createMaterialBottomTabNavigator();

const renderIcon = (name: string, color: string) => {
  return <Icon name={name} color={color} />;
};

const Tabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Question"
      activeColor="hotpink"
      barStyle={styles.barStyle}>
      <Tab.Screen
        name="Question"
        component={QuestionScreen}
        options={{
          tabBarLabel: 'Question',
          tabBarIcon: ({color}) => renderIcon('question_mark', color),
        }}
      />
      <Tab.Screen
        name="LeaderBoard"
        component={LeaderBoardScreen}
        options={{
          tabBarLabel: 'Leader Board',
          tabBarIcon: ({color}) => renderIcon('leaderboard', color),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = {
  barStyle: {
    backgroundColor: '#000',
  },
};

export const Router = () => {
  return (
    <NavigationContainer>
      <RecoilRoot>
        <Tabs />
      </RecoilRoot>
    </NavigationContainer>
  );
};
