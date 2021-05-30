import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';

//return 값에 대한 type지정
type ReturnTypes<T = any> = [T, (e: React.ChangeEvent<HTMLInputElement>) => void, Dispatch<SetStateAction<T>>];

//useInput 커스텀 훅 작성
const useInput = <T>(initialData: T): ReturnTypes => {
  const [value, setValue] = useState(initialData);
  const handler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue((e.target.value as unknown) as T);
  }, []);
  return [value, handler, setValue];
};

export default useInput;
