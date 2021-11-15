import qs from "qs";
import axios, { AxiosResponse } from "axios";

interface Options {
  data: {
    [key: string]: string | undefined;
  };
  headers: {
    [key: string]: string;
  };
}

function fetch(url: string, method: string, option: Options): Promise<AxiosResponse>{
  return new Promise((resolve, reject) => {
    axios.post(url, qs.stringify(option.data), option.headers).then(resolve).catch(reject);
  });
}

export default fetch;
