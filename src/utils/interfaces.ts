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
export type { focusInterface, fetchInterface };
