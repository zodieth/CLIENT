import { useState } from 'react';

interface InputState {
  type: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function useInput(initialValue: string, inputType: string): InputState {
  const [value, setValue] = useState(initialValue);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  return {
    type: inputType,
    value,
    onChange: handleChange
  };
}

export default useInput;