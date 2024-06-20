import React, {useEffect, useState} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './style';

type CardProps = {
  data: {
    question: string;
    answers: string[];
    correctAnswerIndex: number;
  };
  no: number;
  onUpdateScore: (index: number) => void;
};

export const Card = ({data, no, onUpdateScore}: CardProps) => {
  const {correctAnswerIndex, answers, question} = data;
  const [choice, setChoice] = useState<string[]>();
  const [answer, setAnswer] = useState<number>();

  useEffect(() => {
    setChoice(answers.sort(() => 0.5 - Math.random()));
  }, [answers]);

  const isAnswerCorrect = (index: number) => {
    if (answer === correctAnswerIndex && answer === index) {
      return styles.correct;
    }
    if (answer !== correctAnswerIndex && answer === index) {
      return styles.incorrect;
    }

    return styles.normal;
  };

  const displayColorWord = (index: number) => {
    return (
      answer === correctAnswerIndex && answer === index && styles.wordCorrect
    );
  };

  const onPress = (index: number) => {
    setAnswer(index);
    onUpdateScore(index === correctAnswerIndex ? 1 : 0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {no}.{question}
      </Text>
      <View style={styles.answer}>
        <FlatList
          data={choice}
          keyExtractor={(item, index) => item + index}
          renderItem={({item, index}) => (
            <TouchableOpacity
              key={item}
              style={[styles.box, isAnswerCorrect(index)]}
              onPress={() => onPress(index)}
              disabled={answer !== undefined}>
              <Text style={[styles.word, displayColorWord(index)]} key={index}>
                {index + 1}. {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};
