import React, {useState, useCallback} from 'react';
import {SafeAreaView, FlatList} from 'react-native';
import {Card} from '../../components';
import {questions} from '../../constant/question';
import {styles} from './style';
import {useRecoilState} from 'recoil';
import {scoreState} from '../../atoms/score';

export const QuestionContainer = () => {
  const [questList] = useState(questions);
  const [refreshing, setRefreshing] = useState(false);
  const [_, setScore] = useRecoilState<number>(scoreState);

  const randomData = useCallback(() => {
    questList.sort(() => 0.5 - Math.random());
  }, [questList]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    const delay = setTimeout(() => {
      setRefreshing(false);
      randomData();
      clearTimeout(delay);
    }, 500);
  }, [randomData]);

  const onUpdateScore = (scoreValue: number) => {
    setScore(prevState => prevState + scoreValue);
  };

  return (
    <SafeAreaView>
      <FlatList
        style={styles.container}
        data={questList}
        keyExtractor={(item, index) => item.question + index}
        renderItem={({item, index}) => (
          <Card onUpdateScore={onUpdateScore} data={item} no={index + 1} />
        )}
        onRefresh={() => onRefresh()}
        refreshing={refreshing}
      />
    </SafeAreaView>
  );
};
