import { ChangeEventHandler } from "react";

const debounce = (
  fn: Function,
  delay: number
): ChangeEventHandler<HTMLInputElement> => {
  let timer: any = null;
  return (...args: any) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
};
export default debounce;
