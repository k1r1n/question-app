import React, {useState, useCallback, useEffect} from 'react';
import {SafeAreaView, FlatList} from 'react-native';
import {Card} from '../../components';
import {questions} from '../../constant/question';
import {styles} from './style';
import {useRecoilState} from 'recoil';
import {LeaderBoardType, leaderBoardState} from '../../atoms/leaderBoard';
import {generateId} from '../../utils/generateId';

export const QuestionContainer = () => {
  const [questList] = useState(questions);
  const [refreshing, setRefreshing] = useState(false);
  const [leaderBoard, setLeaderBoard] =
    useRecoilState<LeaderBoardType[]>(leaderBoardState);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    setUserName(getUserName());
  }, []);

  const randomData = useCallback(() => {
    questList.sort(() => 0.5 - Math.random());
  }, [questList]);

  const getUserName = () => {
    return `User-${generateId()}`;
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    const delay = setTimeout(() => {
      setRefreshing(false);
      randomData();
      setUserName(getUserName());
      clearTimeout(delay);
    }, 500);
  }, [randomData]);

  const onUpdateScore = (scoreValue: number) => {
    const isUserExist = leaderBoard.find(item => item.name === userName);
    if (isUserExist) {
      const newLeaderBoard = leaderBoard.map(item => {
        if (item.name === userName) {
          return {
            name: userName,
            score: item.score + scoreValue,
          };
        }
        return item;
      });
      setLeaderBoard(newLeaderBoard);
      return;
    }
    setLeaderBoard(prevState => [
      ...prevState,
      {
        name: userName,
        score: scoreValue,
      },
    ]);
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
