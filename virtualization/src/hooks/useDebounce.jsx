import { useEffect, useState } from "react";

export const useDebounce = (text, delay) => {
  const [debouncedValue, setdebouncedValue] = useState("");

  useEffect(() => {
    let timer = setTimeout(() => {
      setdebouncedValue(text);
    }, delay);

    return () => clearTimeout(timer);
  }, [text, delay]);

  return debouncedValue;
};
