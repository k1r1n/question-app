import React from 'react';
import {Text, View} from 'react-native';
import {useRecoilValue} from 'recoil';
import {scoreState} from '../../atoms/score';
import {styles} from './style';

export const LeaderBoardContainer = () => {
  const score = useRecoilValue(scoreState);

  return (
    <View style={styles.container}>
      <Text style={styles.word}>You correct is {score}</Text>
    </View>
  );
};
