import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { ChipsInputOption, ChipsInputProps, ChipsInputValue } from './ChipsInput';

export const useChipsInput = <Option extends ChipsInputOption>(props: Partial<ChipsInputProps<Option>>) => {
  const { value, getOptionValue, onChange, onInputChange, getNewOptionData } = props;

  const [fieldValue, setFieldValue] = useState(props.inputValue);
  const [selectedOptions, setSelectedOptions] = useState(value);

  const clearInput = useCallback(() => {
    setFieldValue('');
    onInputChange({ target: { value: '' } } as any);
  }, [onInputChange]);

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFieldValue(e.target.value);
    onInputChange(e);
  }, [onInputChange]);

  const toggleOption = useCallback((newOption: Option, value?: boolean) => {
    const newSelectedOptions = [...selectedOptions].reduce((acc: Option[], option: Option) => {
      if (getOptionValue(newOption) !== getOptionValue(option)) {
        acc.push(option);
      }

      return acc;
    }, []);

    if (value === true) {
      newSelectedOptions.push(newOption);
    }

    setSelectedOptions(newSelectedOptions);
    onChange(newSelectedOptions);
  }, [selectedOptions, getOptionValue, onChange]);

  const addOption = useCallback((newOption: Option) => toggleOption(newOption, true), [toggleOption]);
  const addOptionFromInput = useCallback(() => {
    const trimmedValue = fieldValue?.trim();

    if (trimmedValue) {
      addOption(getNewOptionData(undefined, trimmedValue));
      clearInput();
    }
  }, [addOption, clearInput, getNewOptionData, fieldValue]);
  const removeOption = useCallback((value: ChipsInputValue) => {
    toggleOption(getNewOptionData(undefined, value as string), false);
  }, [toggleOption, getNewOptionData]);

  useEffect(() => {
    setSelectedOptions(value);

    return () => setSelectedOptions([]);
  }, [props.value]);

  useEffect(() => {
    setFieldValue(props.inputValue);

    return () => setFieldValue('');
  }, [props.inputValue]);

  return { fieldValue, setFieldValue, selectedOptions, setSelectedOptions, clearInput, toggleOption, addOption, addOptionFromInput, removeOption, handleInputChange };
};
