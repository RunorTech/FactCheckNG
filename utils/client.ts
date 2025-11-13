import axios, { AxiosInstance } from "axios";

import dayjs from "dayjs";
import { ApiMethods } from "@/types/services";
import { sessionEventEmitter } from "./eventEmitters";

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

// would be use to create a service procedure instance that is usable out side a react component or hook
export interface ClientRequestConfig<Req extends object> {
  path: string;
  method: ApiMethods;
  isEncrypted?: boolean;
  headers?: object;
  responseType?: "json" | "blob";
  data?: Req;
  options?: {
    isDownload?: boolean;
    canShare?: boolean;
    isPdf?: boolean;
    fileName?: string;
    isFormData?: boolean;
    isCsv?: boolean;
    isXlsx?: boolean;
    keys?: string[];
    enabled?: boolean;
  };
}

interface defaultHeadersProps {
  Authorization?: string;
  Accept?: string;
  "Cache-Control"?: string;
  "Content-Type"?: string;
}

export interface ClientInstanceConfig<Resp extends object> {
  baseUrl?: string;
  transformResponse?: () => Resp;
}
export class Client<Response extends object> {
  http: AxiosInstance | null = null;

  axiosConfig = {};

  constructor(config?: ClientInstanceConfig<Response>) {
    this.create(config);
  }

  request<Req extends object, Resp extends object>(
    config: ClientRequestConfig<Req>
  ): Promise<Resp> {
    if (!this.http) {
      throw new Error(
        "It seems you are yet to instantiate the client with appropriate config. Please instantiate a client instance using using update or create a new client instance (eg new Client(...config))"
      );
    }

    const payloadFormat = {
      [ApiMethods.GET]: "params",
      [ApiMethods.POST]: "data",
      [ApiMethods.PUT]: "data",
      delete: "data",
    };

    const defaultHeaders: defaultHeadersProps = {
      Accept: "application/json",
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
    };
    const { options } = config || {};
    
    if (options?.isPdf) defaultHeaders["Content-Type"] = "application/pdf";
    if (options?.isFormData) delete defaultHeaders["Content-Type"];
    if (options?.isCsv) defaultHeaders["Content-Type"] = "text/csv";
    if (options?.isXlsx) {
      defaultHeaders["Content-Type"] =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    }

    const requestData = config.data;

    return this.http
      .request({
        url: config.path,
        method: config.method,
        withCredentials: true,
        headers: { ...defaultHeaders, ...config.headers },
        responseType:
          !config?.options?.isDownload && !config?.options?.isPdf
            ? "json"
            : "blob",
        [payloadFormat[config.method]]: requestData,
      })
      .then(({ data }) => {
        if (data.statusCode === 101) {
          sessionEventEmitter.emit("session-expired");
        } 
        return data;
      })
      .then(async (jsonResponse) => {
        if (!jsonResponse.arrayBuffer) return jsonResponse;

        if (options?.isDownload || options?.canShare) {
          const fileName = `${
            config.options?.fileName || "download"
          }_${dayjs().format("DD-MM-YYYY HH:mm:ss")}${
            config.options?.isPdf ? ".pdf" : ""
          }`;
          const blob = new Blob([jsonResponse], {
            type: config.options?.isPdf
              ? "application/pdf"
              : "application/octet-stream",
          });

          const link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = fileName;
          link.click();

          return;
        }

        return jsonResponse;
      })
      .catch((err) => {
        const errorResponse = err.response?.data;

        if (errorResponse?.message === "Failed to fetch") {
          errorResponse.message = "Network connection error";
        }

        return Promise.reject(errorResponse || err);
      });
  }

  create<Resp extends object = Response>(config?: ClientInstanceConfig<Resp>) {
    this.http = axios.create({
      baseURL: config?.baseUrl || NEXT_PUBLIC_API_URL,
      transformResponse: config?.transformResponse,
      ...this.axiosConfig,
    });
  }
}

const client = new Client();

export default client;
