import React, { useState, useEffect } from "react";

type ReturnType<T> = [
  T | undefined,
  React.Dispatch<React.SetStateAction<T | undefined>>
];

export function useLocalStorage<T>(key: string, initialValue?: T | (() => T)) {
  const [state, setState] = useState<T>(
    () => {
      const jsonState = localStorage.getItem(key)
      if (jsonState == null) {
        if(typeof initialValue === "function"){
          return (initialValue as () => T)();
        } else {
          return initialValue;
        }
      } else {
        return JSON.parse(jsonState);
      };
    }
  );

  useEffect(() => {
    if (state){
      try {
        localStorage.setItem(key, JSON.stringify(state));
      } catch (error) {
        console.log(error);
      }
    }; 
  }, [state, key]);

  return [state, setState] as [T, typeof setState];
}