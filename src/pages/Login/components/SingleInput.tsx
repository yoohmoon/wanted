import React from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import styled from 'styled-components';

type SingleInputProps = {
  type: string;
  placeholder: string;
  register?: UseFormRegister<FieldValues>;
  validate?: Record<string, any>;
  errors?: Record<string, any>;
  name: string;
  children?: React.ReactNode;
};

const SingleInput: React.FC<SingleInputProps> = ({
  type,
  placeholder,
  register,
  validate,
  errors,
  name,
  children,
}) => {
  const shouldRegister = register && name;
  const shouldShowError = errors && name && errors[name];

  const registerOptions = shouldRegister
    ? register(name, { required: true, validate: validate })
    : {};
  return (
    <>
      <StyledInput
        {...registerOptions}
        //   readOnly={readOnly}
        type={type}
        placeholder={placeholder}
        errors={errors}
        hasError={!!errors?.[name]}
      />
      {/* {children} */}

      {shouldShowError && <ErrorMsg>{errors[name].message}</ErrorMsg>}
    </>
  );
};

const StyledInput = styled.input<{
  hasError: boolean;
  readonly?: boolean;
  errors?: Record<string, any>;
}>`
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

const ErrorMsg = styled.p`
  margin-bottom: 8px;
  text-align: left;
  color: ${({ theme }) => theme.alertRed};
  font-size: 14px;
`;

export default SingleInput;
