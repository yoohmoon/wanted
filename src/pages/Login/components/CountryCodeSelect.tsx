import React, { useState } from 'react';
import Select, { SingleValue, ActionMeta } from 'react-select';

const CountryCodeSelect = () => {
  const [selectOption, setSelectOption] = useState('82');
  const handleOptionChange = (
    selectedOption: SingleValue<{
      value: string;
      label: string;
    }>,
    _actionMeta: ActionMeta<{ value: string; label: string }>
  ) => {
    if (selectedOption === null) return;
    setSelectOption(selectedOption.value);
    console.log('현재 국가코드는? ', selectedOption.value, selectOption);
  };
  return (
    <>
      <Select
        defaultValue={CONTRY_CODE[0]}
        isClearable={false}
        isSearchable={false}
        menuPortalTarget={document.body}
        options={CONTRY_CODE}
        styles={customStyles}
        onChange={handleOptionChange}
      />
    </>
  );
};

export default CountryCodeSelect;

const customStyles = {
  control: (provided: any) => ({
    ...provided,
    height: '50px',
    minHeight: '50px',
    marginBottom: '8px',
    border: '1px solid #e1e2e3',
    borderRadius: '5px',
    fontSize: '16px',
    color: '#333',
    '&:hover': {
      border: '1px solid #e1e2e3',
    },
    '&:focus': {
      border: '1px solid #e1e2e3',
    },
  }),
};

const CONTRY_CODE = [
  { value: '82', label: 'South Korea +82' },
  { value: '61', label: 'Australia +61' },
  { value: '81', label: 'Japan +81' },
  { value: '84', label: 'Vietnam +84' },
  { value: '852', label: 'Hong Kong +852' },
  { value: '65', label: 'Singapore +65' },
  { value: '34', label: 'Spain +34' },
  { value: '90', label: 'Turkey +90' },
  { value: '1', label: 'United States +1' },
  { value: '44', label: 'United Kingdom +44' },
];
