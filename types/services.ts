/* eslint-disable no-unused-vars */
import { ClientRequestConfig } from '../utils/client'

export enum ApiMethods {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
}

export enum QueryType {
  query = 'query',
  infiniteQuery = 'infinite-query',
  mutation = 'mutation',
}

// eslint-disable-next-line no-shadow
declare global {
  interface ServiceInterface<Req extends object, Resp>
    extends Omit<ClientRequestConfig<Req>, 'responseType'> {
    transform?: (req: Req, resp: Resp) => Resp
  }
}
