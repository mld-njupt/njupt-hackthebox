import React from "react";
import loadable from "@loadable/component";
import { Spin } from "@arco-design/web-react";
function load(fn: Function, options: Object): any {
  const Component = loadable(fn, options);
  // console.log(Component);
  return Component;
}
function loadingComponent() {
  return (
    <div className="spin-wrap">
      <Spin></Spin>
    </div>
  );
}
export default (loader: Function): any => {
  load(loader, {
    fallback: loadingComponent(),
  });
};
