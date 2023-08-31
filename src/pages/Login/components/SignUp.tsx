import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { emailState } from '../../../store/emailState';
import Header from './Header';
import InputForm from './InputForm';
import SubmitBtn from './SubmitBtn';
import CountryCodeSelect from './CountryCodeSelect';
import SingleInput from './SingleInput';
import { styled } from 'styled-components';

const SignUp = () => {
  const emailRoot = useRecoilValue(emailState);
  console.log('sign up 이메일? !! ', emailRoot);

  const nameRegEx = /^[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣]*$/;
  // const phoneRegEx = /^\d{3}-\d{3,4}-\d{4}$/;

  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FieldValues>();
  console.log('회원가입 폼 이름 에러', errors);

  const name = watch('name');

  useEffect(() => {
    const isValid = nameRegEx.test(name);
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
    } else if (!nameRegEx.test(value)) {
      return '이름에는 공백과 특수문자가 포함될 수 없습니다.';
    } else {
      return true;
    }
  };

  const phone = watch('phone');

  useEffect(() => {
    handlePhoneValidation(phone);
  }, [phone]);

  const [isPhoneValid, setIsPhoneValid] = useState(false);

  const handlePhoneValidation = (value: string) => {
    const phoneRegEx = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/;

    if (!value) {
      setIsPhoneValid(false);
    } else if (!phoneRegEx.test(value)) {
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
  const passwordRegEx = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
  const handlePasswordValidation = (value: string) => {
    if (!value) {
      return '비밀번호를 입력해주세요.';
    } else if (!passwordRegEx.test(value)) {
      return '올바르지 않은 비밀번호입니다.';
    } else {
      return true;
    }
  };

  const handlePasswordConfirmation = (value: string) => {
    const password = watch('password'); //삭제하기!
    if (value !== password) {
      return '비밀번호가 서로 일치하지 않습니다.';
    } else {
      return true;
    }
  };

  const password = watch('password');
  const passwordConfirmation = watch('passwordConfirmation');

  useEffect(() => {
    const isPasswordValid = passwordRegEx.test(password);
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

  const postSignUpData = async (data: FieldValues) => {
    const response = await fetch('api/v1/users/join', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (result.resultCode === 'SUCCESS') {
      console.log('회원가입 성공');
    } else {
      console.log('회원가입 실패');
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
          name='name'
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
          name='phone'
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
          name='password'
          readOnly={false}
          isPhone={false}
        ></InputForm>
        <SingleInput
          type='password'
          placeholder='비밀번호를 다시 한 번 입력해주세요.'
          register={register}
          validate={handlePasswordConfirmation}
          errors={errors}
          name='passwordConfirmation'
        />
        <PasswordWarning>
          영문 대소문자, 숫자, 특수문자를 3가지 이상으로 조합해 8자 이상 16자
          이하로 입력해주세요.
        </PasswordWarning>
        <ButtonWrap>
          <SubmitBtn title='가입하기' disabledCon={false} />
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
