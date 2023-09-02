/* interface ITodoState {
    // [key: string] : 객체의 키가 문자열
    [key: string]: string[];
  }
  
  export const todoState = atom<ITodoState>({
    key: 'toDo',
    default: {
      Breakfast: ['돈까스', '단무지', '소스'],
      Lunch: ['물회', '라떼'],
      Dinner: ['닭가슴살 샐러드'],
    },
  }); */

import { atom } from 'recoil';

export const emailState = atom<string>({
  key: 'emailState',
  default: '',
});
