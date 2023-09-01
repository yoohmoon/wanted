import React from 'react';
import Header from './Header';
import InputForm from './InputForm';
import { useForm } from 'react-hook-form';
import SubmitBtn from './SubmitBtn';

const PasswordLogin = () => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();
  const handleLoginPwValidation = (value: string) => {}; //필요하다면 로직구현 (통신 후 맞지 않는 비번이면 오류 출력)
  const buttonDisabledCondition = false; // 문자 하나만 입력돼도 활성화됨,,(통신 후 맞지 않는 비번이면 버튼 비활성화)
  return (
    <>
      <Header>이메일로 로그인</Header>
      <form>
        <InputForm
          title='비밀번호'
          type='password'
          placeholder='비밀번호를 입력해주세요.'
          register={register}
          validate={handleLoginPwValidation}
          name='password' //이름 다르게 사용해야하나???
          errors={errors}
          readOnly={false}
          isPhone={false}
        />
        <SubmitBtn title='다음' disabledCon={buttonDisabledCondition} />
      </form>
    </>
  );
};

export default PasswordLogin;
