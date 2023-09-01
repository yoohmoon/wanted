import React, { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { emailState } from '../../../store/emailState';
import Header from './Header';
import InputForm from './InputForm';
import SubmitBtn from './SubmitBtn';
import CountryCodeSelect from './CountryCodeSelect';
import SingleInput from './SingleInput';
import { useNavigate } from 'react-router-dom';
import { loginStepState } from '../../../store/loginStepState';

// RegExp 상수화
const NAME_REGEX = /^[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣]*$/;
const PHONE_REGEX = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/;
const PASSWORD_REGEX = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;

// Type Safety 상수화
const FIELD_NAME = 'name';
const FIELD_PHONE = 'phone';
const FIELD_PASSWORD = 'password';
const FIELD_PASSWORD_CONFIRMATION = 'passwordConfirmation';
const FIELD_AUTH = 'auth';
const FIELD_EMAIL = 'email';

const SignUp = () => {
  const emailRoot = useRecoilValue(emailState);
  console.log('sign up 이메일? !! ', emailRoot);

  // api 상태 관리
  const [apiStatus, setApiStatus] = useState<string | null>(null);

  // const [step, setStep] = useRecoilState(loginStepState);
  const setStep = useSetRecoilState(loginStepState);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FieldValues>();
  console.log('회원가입 폼 이름 에러', errors);

  // watch to individual input by name
  const name = watch(FIELD_NAME);
  const phone = watch(FIELD_PHONE);
  const password = watch(FIELD_PASSWORD);
  const passwordConfirmation = watch(FIELD_PASSWORD_CONFIRMATION);

  useEffect(() => {
    const isValid = NAME_REGEX.test(name);
    if (!isValid && name) {
      console.log('error msg!');
      setError('name', {
        type: 'manual',
        message: '이름에는 공백, 숫자, 특수문자가 포함될 수 없습니다.',
      });
    } else {
      clearErrors('name');
    }
  }, [name, setError, clearErrors]);

  const handleNameValidation = (value: string) => {
    if (!value && phone) {
      return '이름을 입력해주세요.';
    } else if (!NAME_REGEX.test(value)) {
      return '이름에는 공백과 특수문자가 포함될 수 없습니다.';
    } else {
      return true;
    }
  };

  useEffect(() => {
    handlePhoneValidation(phone);
  }, [phone]);

  const [isPhoneValid, setIsPhoneValid] = useState(false);

  const handlePhoneValidation = (value: string) => {
    if (!value) {
      setIsPhoneValid(false);
    } else if (!PHONE_REGEX.test(value)) {
      setIsPhoneValid(false);
      setError('phone', {
        type: 'manual',
        message: '올바른 전화번호를 입력해주세요.',
      });
    } else {
      setIsPhoneValid(true);
      clearErrors('phone');
    }
  };

  // Password Validation
  const handlePasswordValidation = (value: string) => {
    if (!value) {
      return '비밀번호를 입력해주세요.';
    } else if (!PASSWORD_REGEX.test(value)) {
      return '올바르지 않은 비밀번호입니다.';
    } else {
      return true;
    }
  };

  const handlePasswordConfirmation = (value: string) => {
    if (value !== password) {
      return '비밀번호가 서로 일치하지 않습니다.';
    } else {
      return true;
    }
  };

  useEffect(() => {
    const isPasswordValid = PASSWORD_REGEX.test(password);
    if (!isPasswordValid && password) {
      setError('password', {
        type: 'manual',
        message: '올바르지 않은 비밀번호입니다.',
      });
    } else {
      clearErrors('password');
    }
  }, [password, setError, clearErrors]);

  useEffect(() => {
    if (passwordConfirmation !== password) {
      setError('passwordConfirmation', {
        type: 'manual',
        message: '비밀번호가 서로 일치하지 않습니다.',
      });
    } else {
      clearErrors('passwordConfirmation');
    }
  }, [passwordConfirmation]);

  // api 통신 로직
  const postSignUpData = async (data: FieldValues) => {
    try {
      const response = await fetch('api/v1/users/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      setApiStatus(result.resultCode);

      if (result.resultCode === 'SUCCESS') {
        console.log('회원가입 성공');
        // ✔️ 로그인 페이지로 이동(?!) 로직 구현 필요
        navigate('/login'); // 필요 없을 듯?
        setStep('emailInput');
      } else {
        console.log('회원가입 실패');
        // 회원가입 실패시 로직 구현 필요 - 에러 메시지 출력 ?! alert?
        alert('회원가입에 실패했습니다.');
      }
    } catch (error) {
      console.log('API 호출 중 에러 발생: ', error);
      setApiStatus('ERROR');
    }
  };

  /*     const { email, name, phone, password } = data;
    const response = await fetch('http://localhost:3000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, name, phone, password }),
    });
    const result = await response.json();
    console.log(result); 
  };*/

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log('회원가입 제출🙋‍♀️🙋‍♀️🙋‍♀️!', data);

    const { email, name, phone, password } = data;

    const signUpData = {
      // userId: Math.random() * 10000000,
      userName: name,
      email: email,
      password: password,
      phoneNumber: phone,
    };

    postSignUpData(signUpData);
  };

  //버튼 비활성화 조건
  const hasEmptyFields = !name || !phone || !password || !passwordConfirmation;
  const hasInputErrors =
    !!errors.name ||
    !!errors.phone ||
    !!errors.password ||
    !!errors.passwordConfirmation;
  const isButtonDisabled = hasEmptyFields || hasInputErrors;

  return (
    <>
      <HeaderWrap>
        <Header>회원가입</Header>
      </HeaderWrap>

      <form onSubmit={handleSubmit(onSubmit)}>
        <InputForm
          title='이메일'
          type='text'
          placeholder={emailRoot}
          // register={register}
          // validate={handleValidation}
          // errors={errors}
          name='email'
          readOnly={true}
          isPhone={false}
        />
        <InputForm
          title='이름'
          type='text'
          placeholder='이름을 입력해주세요.'
          register={register}
          validate={handleNameValidation}
          errors={errors}
          name={FIELD_NAME}
          readOnly={false}
          isPhone={false}
        />
        <InputForm
          title='휴대폰 번호'
          type='text'
          placeholder='(예시) 01012345678'
          register={register}
          validate={handlePhoneValidation}
          errors={errors}
          name={FIELD_PHONE}
          readOnly={false}
          isPhone={true}
          phoneDisableCon={!isPhoneValid}
        >
          <CountryCodeSelect />
        </InputForm>
        {/* <InputForm
          title='휴대폰 번호'
          type='number'
          placeholder='(예시) 01012345678'
          register={register}
          validate={handlePhoneValidation}
          errors={errors}
          name='phone'
          readOnly={false}
        ></InputForm> */}
        <SingleInput
          placeholder='인증번호를 입력해주세요.'
          type='text'
          // register={register} //추후에 인증번호 타이머 구현시 필요함 일단 제거->인증번호 입력없이도 제출 버튼 작동시키기 위한 목적
          // errors={errors}
          name='auth'
        />
        <InputForm
          title='비밀번호'
          type='password'
          placeholder='비밀번호를 입력해주세요.'
          register={register}
          validate={handlePasswordValidation}
          errors={errors}
          name={FIELD_PASSWORD}
          readOnly={false}
          isPhone={false}
        ></InputForm>
        <SingleInput
          type='password'
          placeholder='비밀번호를 다시 한 번 입력해주세요.'
          register={register}
          validate={handlePasswordConfirmation}
          errors={errors}
          name={FIELD_PASSWORD_CONFIRMATION}
        />
        <PasswordWarning>
          영문 대소문자, 숫자, 특수문자를 3가지 이상으로 조합해 8자 이상 16자
          이하로 입력해주세요.
        </PasswordWarning>
        <ButtonWrap>
          <SubmitBtn title='가입하기' disabledCon={isButtonDisabled} />
        </ButtonWrap>
      </form>
    </>
  );
};

const HeaderWrap = styled.div`
  position: sticky;
  top: -20px;
  max-width: 400px;
  width: 100%;
  padding-top: 20px;
  /* height: 60px; */
  background-color: #fff;
`;

const PasswordWarning = styled.p`
  color: ${({ theme }) => theme.loginGray};
  font-size: 13px;
  text-align: left;
  line-height: 18px;
  letter-spacing: 0.4px;
`;

const ButtonWrap = styled.div`
  position: sticky;
  bottom: -20px;
  background-color: #fff;
  /* padding-bottom: 20px; */
`;

export default SignUp;
