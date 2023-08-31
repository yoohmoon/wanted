import React from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import styled from 'styled-components';
import SubmitBtn from './SubmitBtn';

type InputFormProps = {
  title: string;
  type: string;
  placeholder: string;
  register?: UseFormRegister<FieldValues>;
  validate?: Record<string, any>;
  errors?: Record<string, any>;
  name: string;
  readOnly: boolean;
  children?: React.ReactNode;
  isPhone: boolean;
  phoneDisableCon?: boolean;
};

const InputForm: React.FC<InputFormProps> = ({
  title,
  type,
  placeholder,
  register,
  validate,
  errors,
  name,
  readOnly,
  children,
  isPhone,
  phoneDisableCon,
}) => {
  const shouldRegister = register && name;
  const shouldShowError = errors && name && errors[name];

  const registerOptions = shouldRegister
    ? register(name, { required: true, validate: validate })
    : {};

  return (
    <InputBox>
      <Title>{title}</Title>
      {children}
      <InputContainer isPhone={isPhone}>
        <StyledInput
          {...registerOptions}
          readOnly={readOnly}
          type={type}
          placeholder={placeholder}
          hasError={!!errors?.[name]}
          isPhone={isPhone}
        />
        {isPhone && (
          <SubmitBtn
            title='인증번호 받기'
            disabledCon={!!phoneDisableCon}
            size='medium'
          />
        )}
      </InputContainer>
      {shouldShowError && <ErrorMsg>{errors[name].message}</ErrorMsg>}

      {/* {errors[name] && <ErrorMsg>{errors[name].message}</ErrorMsg>} */}
      {/* {isPhone ? (
        <>
          <div>
            <StyledInput
              {...register(name, {
                required: true,
                validate: validate,
              })}
              readOnly={readOnly}
              type={type}
              placeholder={placeholder}
              hasError={!!errors?.[name]}
            />
            <SubmitBtn
              title='인증번호 받기'
              disabledCon={!!phoneDisableCon}
              size='medium'
            />
          </div>
          {errors[name] && <ErrorMsg>{errors[name].message}</ErrorMsg>}
        </>
      ) : (
        <>
          <StyledInput
            {...register(name, {
              required: true,
              validate: validate,
            })}
            readOnly={readOnly}
            type={type}
            placeholder={placeholder}
            hasError={!!errors?.[name]}
          />
          {errors[name] && <ErrorMsg>{errors[name].message}</ErrorMsg>}
        </>
      )} */}
    </InputBox>
  );
};

const InputBox = styled.div`
  width: 100%;
  text-align: left;
  font-size: 14px;
  color: ${({ theme }) => theme.loginGray};
`;

const InputContainer = styled.div<{ isPhone: boolean }>`
  box-sizing: border-box;
  width: 100%;
  display: ${({ isPhone }) => (isPhone ? 'flex' : 'block')};
  align-items: center;
  justify-content: space-between;
`;

const StyledInput = styled.input<{
  hasError: boolean;
  readonly?: boolean;
  isPhone: boolean;
}>`
  /* width: ${({ isPhone }) => (isPhone ? 'calc(100% - 100px)' : '100%')}; */
  width: ${({ isPhone }) => (isPhone ? '63%' : '100%')};
  /* width: 100%; */
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
  background-color: ${({ readOnly }) => (readOnly ? '#f2f4f7' : 'transparent')};

  /* &:focus {
    border: 1px solid ${({ theme }) => theme.mainBlue};
    border-radius: 5px;
  } */

  &:focus {
    border: 1px solid
      ${({ hasError, theme, readOnly }) =>
        readOnly ? 'none' : hasError ? theme.alertRed : theme.mainBlue};
  }
`;

const Title = styled.div`
  margin-top: 17px;
  margin-bottom: 7px;
  font-weight: 600;
`;

const ErrorMsg = styled.p`
  color: ${({ theme }) => theme.alertRed};
  margin-bottom: 8px;
`;

export default InputForm;
