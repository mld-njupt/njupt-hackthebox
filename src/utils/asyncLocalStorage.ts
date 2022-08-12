const asyncLocalStorage = {
  setItem: function (key: string, value: string) {
    return Promise.resolve().then(function () {
      localStorage.setItem(key, value);
    });
  },
  getItem: function (key: string) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const res = localStorage.getItem(key);
        resolve(res);
      }, 500);
    });
  },
};
export default asyncLocalStorage;
