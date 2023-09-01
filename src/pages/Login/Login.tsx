import { FC, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { emailState } from '../../store/emailState';
import { loginStepState } from '../../store/loginStepState';
import Logo from '../../components/Nav/components/Logo';
import SignUp from './components/SignUp';
import InputForm from './components/InputForm';
import SubmitBtn from './components/SubmitBtn';
import PasswordLogin from './components/PasswordLogin';

const Login: FC = () => {
  // 단계 로그인/회원가입 회원가입 로직
  const [step, setStep] = useRecoilState(loginStepState);

  const [emailRoot, setEmailRoot] = useRecoilState(emailState);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FieldValues>();
  // console.log(errors);

  const email = watch('email');

  useEffect(() => {
    const isValid = emailRegEx.test(email);
    if (!isValid && email) {
      console.log('error msg!');
      setError('email', {
        type: 'manual',
        message: '올바른 이메일을 입력해주세요.',
      });
    } else {
      clearErrors('email');
    }
  }, [email, setError, clearErrors]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    setEmailRoot(data.email);
    // setStep('signUp');
    setStep('passwordInput');
  };

  const emailRegEx =
    /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;

  return (
    <Container>
      <Wrapper>
        <LoginBox>
          {step === 'emailInput' && (
            <>
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
                <InputForm
                  title='이메일'
                  type='email'
                  placeholder='이메일을 입력해주세요.'
                  register={register}
                  validate={(value: string) =>
                    emailRegEx.test(value) || '유효한 이메일을 입력해주세요.'
                  }
                  errors={errors}
                  name='email'
                  readOnly={false}
                  isPhone={false}
                />
                <SubmitBtn
                  title='이메일로 계속하기'
                  disabledCon={!email || !!errors.email}
                />

                {/* <EmailBtn type='submit' disabled={!email || !!errors.email}>
                  <span>이메일로 계속하기</span>
                </EmailBtn> */}
              </LoginForm>
            </>
          )}
          {step === 'passwordInput' && <PasswordLogin />}
          {step === 'signUp' && <SignUp />}
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
  max-height: calc(100vh - 100px);
  padding: 20px;
  margin: 0 auto;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.borderGray};
  background-color: #fff;
  text-align: center;
  overflow: auto;

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
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

export default Login;
