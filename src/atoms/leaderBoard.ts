import {atom} from 'recoil';

export type LeaderBoardType = {
  name: string;
  score: number;
};

export const leaderBoardState = atom({
  key: 'leaderBoardState',
  default: [
    {
      name: '',
      score: 0,
    },
  ],
});
