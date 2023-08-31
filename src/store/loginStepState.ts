import { atom } from 'recoil';

export const loginStepState = atom<'emailInput' | 'passwordInput' | 'signUp'>({
  key: 'loginStepState',
  // default: 'emailInput',
  default: 'signUp',
});
