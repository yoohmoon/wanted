import React, { FC, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import styled from 'styled-components';
import Logo from '../../components/Nav/components/Logo';

type FormValues = {
  email: string;
};

/* 
<input
                type='email'
                placeholder='이메일을 입력해주세요.'
                // name='email'
                {...register('email', {
                  required: true,
                  pattern: {
                    value: emailRegEx,
                    message: '유효한 이메일을 입력하세요.',
                  },
                })}
              />
*/

/* const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.email ? values : {},
    errors: !values.email
      ? {
          email: {
            type: 'required',
            message: '유효한 이메일을 입력하세요.',
          },
        }
      : {},
  };
}; */

const Login: FC = () => {
  /*   const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver });
  // console.log(watch());
 */
  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FormValues>();
  console.log(errors);

  // const onSubmitHandler: submitHandler<FormValue> = (data) => {
  //   console.log(data)
  // }

  const [emailErrorMsg, setEmailErrorMsg] = useState('');

  const email = watch('email');

  useEffect(() => {
    const isValid = emailRegEx.test(email);
    if (!isValid && email) {
      console.log('error msg!');
      // setEmailErrorMsg('유효한 이메일을 입력하세용!!!@@');
      setError('email', {
        type: 'manual',
        message: '올바른 이메일을 입력해주세요.',
      });
    } else {
      // setEmailErrorMsg('');
      clearErrors('email');
    }
  }, [email, setError, clearErrors]);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  const emailRegEx =
    /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;

  return (
    <Container>
      <Wrapper>
        <LoginBox>
          <LogoWrap>
            <Logo />
          </LogoWrap>
          <CatchPhrase>
            <h4>
              하나의 계정으로 <br />
              더욱 편리하게
            </h4>
          </CatchPhrase>
          <Explanation>
            원티드가 제공하는 서비스를 <br />
            하나의 계정으로 모두 이용할 수 있습니다.
          </Explanation>
          <LoginForm onSubmit={handleSubmit(onSubmit)}>
            <InputBox>
              <EmailTitle>이메일</EmailTitle>
              {/* <EmailInput
                hasError={!!errors?.email}
                placeholder='이메일을 입력해주세요.'
                {...register('email', {
                  required: '이메일을 입력해주세요.',
                  pattern: {
                    value:
                      /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/,
                    message: '유효한 이메일을 입력하세요.',
                  },
                })}
                type='email'
              /> */}
              <EmailInput
                {...register('email', {
                  required: true,
                  validate: (value) =>
                    emailRegEx.test(value) || '유효한 이메일을 입력해주세요.',
                  // pattern:
                  //   /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/,
                })}
                type='email'
                placeholder='이메일을 입력해주세요.'
                hasError={!!errors?.email}
                // data-hasError={!!errors?.email}
              />
              {/* {errors.email && errors.email.type === 'pattern' && (
                <ErrorMsg>유효한 이메일을 입력해주세요.</ErrorMsg>
              )} */}
              {/* {errors.email && <ErrorMsg>{errors.email.message}</ErrorMsg>} */}
              {errors.email && <ErrorMsg>{errors.email.message}</ErrorMsg>}
              {/* {emailErrorMsg && <ErrorMsg>{emailErrorMsg}</ErrorMsg>} */}
              {/* {errors.email && (
                <ErrorMsg>
                  {errors.email.type === 'required' && '이메일을 입력해주세요.'}
                  {errors.email.type === 'pattern' &&
                    '유효한 이메일을 입력해주세요.'}
                </ErrorMsg>
              )} */}
              {/* {errors.name && errors.name.type === "required" && (
        		<div>이름을 입력해 주세요!</div>
        	)}
        	{errors.name && errors.name.type === "maxLength" && (
        		<div>이름은 최대 20자만 입력할 수 있습니다!</div>
        	)} */}
              {/* <input {...register("email", { required: true, pattern: /^\S+@\S+$/i })} type="email" /> */}
              {/* {errors?.email && <ErrorMsg>{errors.email.message}</ErrorMsg>} */}
            </InputBox>
            <EmailBtn type='submit' disabled={!email || !!errors.email}>
              <span>이메일로 계속하기</span>
            </EmailBtn>
          </LoginForm>
        </LoginBox>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  font-family: ${({ theme }) => theme.fontThin};
  width: 100%;
  /* height: 100%; */
  height: 100vh;
  background-color: ${({ theme }) => theme.loginBg};
  color: ${({ theme }) => theme.loginGray};
`;

const Wrapper = styled.div`
  width: 100%;
`;
const LoginBox = styled.main`
  max-width: 400px;
  padding: 20px;
  margin: 0 auto;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.borderGray};
  background-color: #fff;
  text-align: center;
`;

const LogoWrap = styled.div`
  font-family: ${({ theme }) => theme.fontSb};
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 50px;
  margin-bottom: 30px;
`;

const CatchPhrase = styled.div`
  line-height: 32px;
  font-weight: 700;
  font-size: 24px;
  margin: 16px 0;
`;

const Explanation = styled.p`
  margin-bottom: 45px;
  font-weight: 400;
  font-size: 14px;
  color: ${({ theme }) => theme.loginGray};
`;

const LoginForm = styled.form`
  width: 100%;

  text-align: left;
  font-size: 14px;
  color: ${({ theme }) => theme.loginGray};
`;

const InputBox = styled.div`
  width: 100%;
  text-align: left;
  font-size: 14px;
  color: ${({ theme }) => theme.loginGray};

  /* input {
    width: 100%;
    min-height: 50px;
    padding: 0 12px;
    margin-bottom: 8px;
    border: 1px solid ${({ theme }) => theme.borderGray};
    border-radius: 5px;
    outline: none;
    font-size: 16px;

    &:focus {
      border: 1px solid ${({ theme }) => theme.mainBlue};
      border-radius: 5px;
    }
  } */
`;

const EmailInput = styled.input<{ hasError: boolean }>`
  width: 100%;
  /* height: 50px; */
  min-height: 50px;
  padding: 0 12px;
  margin-bottom: 8px;

  /* border: 1px solid ${({ theme }) => theme.borderGray}; */
  border: 1px solid
    ${({ hasError, theme }) => (hasError ? theme.alertRed : theme.borderGray)};
  border-radius: 5px;
  outline: none;
  font-size: 16px;

  /* &:focus {
    border: 1px solid ${({ theme }) => theme.mainBlue};
    border-radius: 5px;
  } */

  &:focus {
    border: 1px solid
      ${({ hasError, theme }) => (hasError ? theme.alertRed : theme.mainBlue)};
  }

  /* &:not([hasError='true']):focus {
    border: 1px solid ${({ theme }) => theme.mainBlue};
    border-radius: 5px;
  } */

  /* &:not([data-hasError='true']):focus {
    border: 1px solid ${({ theme }) => theme.mainBlue};
  } */
`;

const EmailTitle = styled.div`
  margin-top: 17px;
  margin-bottom: 7px;
  font-weight: 600;
`;

const ErrorMsg = styled.p`
  color: ${({ theme }) => theme.alertRed};
`;

const EmailBtn = styled.button<{ disabled: boolean }>`
  width: 100%;
  min-height: 50px;
  padding: 1px 6px;
  margin-top: 30px;
  margin-bottom: 10px;
  border-radius: 25px;
  border: none;
  font-size: 16px;

  background-color: ${({ disabled, theme }) =>
    disabled ? theme.disabledGray : theme.mainBlue};
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};

  span {
    color: ${({ disabled }) => (disabled ? '#ccc' : '#fff')};
  }
`;

export default Login;
