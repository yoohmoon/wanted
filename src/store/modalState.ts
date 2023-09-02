import { atom } from 'recoil';

export const modalState = atom<boolean>({
  key: 'modalState',
  default: true,
  //   default: false,
});
