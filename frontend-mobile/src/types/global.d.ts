import {AxiosResponse} from 'axios';

declare global {
  interface CommonResponse<T> extends AxiosResponse {
    data: T;
  }
  interface CodeResponse<T = unknown> {
    //Code: number;
    //ListError: Array<any>;
    MsgNo: string;
    Data?: T;
  }
}

export {};
