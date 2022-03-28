interface fetchInterface {
  url: string;
  query?: Object | any;
  body?: Object;
  method: string;
}
interface dashboardCardInterface {
  src: string;
  title: string;
  msg: string;
  style?: any;
}
interface scollViewInterface {
  width: number;
  children: Array<JSX.Element> | JSX.Element;
  itemWidth: number;
}
interface scollViewContextInterface {
  scollViewIndex?: number;
  setScollViewIndex?: any;
}
interface registerConfigInterface {
  username: string;
  password: string;
  confirm: string;
  email: string;
  code: string;
}
interface articlrCard{
  id:number,
  title:string,
  author:string,
  image:string,
  time:string
  key:number
}
export type {
  fetchInterface,
  dashboardCardInterface,
  scollViewInterface,
  scollViewContextInterface,
  registerConfigInterface,
  articlrCard
};
