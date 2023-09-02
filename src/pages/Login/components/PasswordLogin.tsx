import React, { useEffect } from 'react';
import Header from './Header';
import InputForm from './InputForm';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import SubmitBtn from './SubmitBtn';
import { useRecoilValue } from 'recoil';
import { emailState } from '../../../store/emailState';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../../config/config';

const PasswordLogin = () => {
  const emailRoot = useRecoilValue(emailState);
  // console.log('password login 이메일? !! ', emailRoot);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();
  console.log('비밀번호 에러', errors);

  const [buttonDisabled, setButtonDisabled] = React.useState(true); // 버튼 비활성화 상태
  const password = watch('password');

  const handleLoginPwValidation = (value: string) => {}; //필요하다면 로직구현 (통신 후 맞지 않는 비번이면 오류 출력)
  const buttonDisabledCondition = !password || buttonDisabled; // 문자 하나만 입력돼도 활성화됨,,(통신 후 맞지 않는 비번이면 버튼 비활성화)

  //통신 전 코드 (통신 성공 후 삭제할 것) - 버튼 비활성화되는 걸 임시로 막아둠
  useEffect(() => {
    if (password) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [password]);

  /* 
  const onLoginSubmit: SubmitHandler<FieldValues> = (data) => {
    // 내가 작성해본 통신 코드~
    console.log('login submitted data? ', data);
    console.log('email recoil data?', emailRoot);

    fetch('api/v1/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: emailRoot, password: data.password }),
    })
      .then((response) => {
        console.log('response? ', response);
      })
      .catch((error) => {
        console.log(error);
      })
      .then((data) => {
        if (data.resultCode === 'SUCCESS') {
          localStorage.setItem('token', data.token);
          alert('로그인 성공!');
        } else if (data.resultCode === 'ERROR') {
          alert('로그인 실패!');
        }
      });
  }; 
  */

  const onLoginSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const response = await axios.post(`${API_BASE_URL}api/v1/users/login`, {
        email: emailRoot,
        password: data.password,
      });

      if (response.data.isSuccess) {
        // if (response.data.resultCode === 'SUCCESS') { // 데이터 구조 변경 전 코드 보존
        localStorage.setItem('token', response.data.result);
        console.log(
          '로그인 성공 및 토큰 저장!',
          response.data.message,
          response.data.result
        );
        clearErrors('password'); // 로그인 성공 시 에러 메시지 삭제
        setButtonDisabled(false); // 로그인 성공 시 버튼을 활성화
        alert('로그인 성공!');
        navigate('/'); // 로그인 성공 시 메인 페이지로 이동
      } else {
        console.log('로그인 실패!', response.data.message);
        setError('password', {
          type: 'manual',
          message: '비밀번호가 일치하지 않습니다.',
        });
        setButtonDisabled(true);
      }
    } catch (error) {
      console.log('[서버에러] 로그인 통신 에러 발생: ', error);
      // setError("password", {
      //   type: "manual",
      //   message: "서버 에러가 발생했습니다."
      // });
      // setButtonDisabled(true); //추후 불필요하다면 삭제
    }
  };

  return (
    <>
      <Header>이메일로 로그인</Header>
      <form onSubmit={handleSubmit(onLoginSubmit)}>
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
