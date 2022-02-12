interface fetchInterface {
  url: string;
  query: Object | any;
  body: Object;
  method: string;
}
interface focusInterface {
  username: boolean;
  password: boolean;
}
interface dashboardCardInterface {
  src: string;
  title: string;
  msg: string;
}
export type { focusInterface, fetchInterface, dashboardCardInterface };
