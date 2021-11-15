import axios, { AxiosResponse, Method } from "axios";

interface Options {
  url: string;
  method: Method;
  data?: string;
  headers: {
    [key: string]: string;
  };
}

function fetch(option: Options): Promise<AxiosResponse> {
  return new Promise((resolve, reject) => {
    axios(option).then(resolve).catch(reject);
  });
}

export default fetch;
