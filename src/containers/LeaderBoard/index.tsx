import React from 'react';
import {FlatList, Text, View} from 'react-native';
import {useRecoilValue} from 'recoil';
import {leaderBoardState} from '../../atoms/leaderBoard';
import {styles} from './style';

export const LeaderBoardContainer = () => {
  const leaderBoard = useRecoilValue(leaderBoardState);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Leader Board</Text>
      </View>
      <FlatList
        style={styles.listContainer}
        data={leaderBoard}
        keyExtractor={(item, index) => item.name + index}
        renderItem={({item, index}) => (
          <View style={styles.list}>
            <View>
              <Text style={styles.word}>
                🏆 {index + 1}. {item.name}
              </Text>
            </View>
            <View>
              <Text style={styles.score}>{item.score} score</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};
