import { useEffect, useState, useRef, MutableRefObject } from "react";
import { fetchInterface } from "./interfaces";
export const useFetch = ({ url, body, query, method }: fetchInterface) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [prevent, setPrevent] = useState(true);
  const abortControllRef = useRef<any>();
  const BASE_URL =
    process.env.NODE_ENV === "production" ? "/api" : "http://localhost:3000";
  const request = () => {
    if (prevent) return;
    const abortControll = new AbortController();
    abortControllRef.current = abortControll;
    const singal = abortControll.signal;
    const queryString = query
      ? `${Object.keys(query)
          .map(
            (key) =>
              encodeURIComponent(key) + "=" + encodeURIComponent(query[key])
          )

          .join("&")}`
      : "";
    const options = {
      header: { "content-type": "application/json" },
      method,
      singal,
      body: JSON.stringify(body),
    };
    setLoading(true);
    setData(null);
    setError(null);
    setPrevent(true);
    fetch(`${BASE_URL}url${queryString}`, options)
      .then((res: any) => {
        res.json();
      })
      .then((res: any) => {
        setData(res);
      })
      .catch((err: any) => {
        setError(err);
      })
      .finally(() => {
        abortControllRef.current = null;
        setLoading(false);
      });
  };
  useEffect(request, [query, body, url, method, prevent]);
  useEffect(() => {
    return () => {
      if (abortControllRef) {
        abortControllRef.current.abort();
      }
    };
  }, []);
  return [
    [data, loading, error],
    () => {
      setPrevent(false);
    },
  ];
};

//用于获取元素是否触发焦点
export const useFocus = <T>(): [MutableRefObject<T>, boolean] => {
  const [value, setValue] = useState<boolean>(false);
  const ref: any = useRef<T | null>(null);
  const handleFocus = (): void => setValue(true);
  const handleBlur = (): void => setValue(false);
  useEffect(() => {
    const node: any = ref.current;
    if (node) {
      node.addEventListener("focus", handleFocus);
      node.addEventListener("blur", handleBlur);
    }
    return () => {
      node.removeEventListener("foucs", handleFocus);
      node.removeEventListener("blur", handleBlur);
    };
  }, [ref.current]);
  return [ref, value];
};

//用户获取用户宽度
export const useWidth = <T>(): [MutableRefObject<T>, number] => {
  const [value, setValue] = useState<number>(0);
  const ref: any = useRef<T | null>(null);
  useEffect(() => {
    const node = ref.current;
    if (node) {
      setValue(node.offsetWidth);
    }
  }, [ref.current]);
  return [ref, value];
};
