interface fetchInterface {
  url: string;
  query: Object | any;
  body: Object;
  method: string;
}
interface dashboardCardInterface {
  src: string;
  title: string;
  msg: string;
}
export type { fetchInterface, dashboardCardInterface };
