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

function fetch(option: Options): Promise<AxiosResponse> {
  return new Promise((resolve, reject) => {
    let data = {};
    if (option["headers"]["Content-type"] === "application/x-www-form-urlencoded") {
      data = qs.stringify(option["data"]);
    } else {
      data = JSON.stringify(option["data"]);
    }

    axios(option).then(resolve).catch(reject);
  });
}

export default fetch;
