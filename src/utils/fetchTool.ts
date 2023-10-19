import { HttpError } from "@h/h-rest";

import api from "../services";
import { NormalResponse, ResponseStruct } from "../types/commonRes";

type ApiType = typeof api;

/**
 * 获取HttpResponse下的data类型
 */
type FunctionReturnType<T> = T extends (
  ...args: unknown[]
) => NormalResponse<infer R>
  ? R
  : any;

/**
 * 构建HTTPResponse的函数
 */
type FetcherFn<T> = (api?: ApiType) => NormalResponse<T>;

/**
 * 工具配置
 */
interface FetchToolConfig {
  /**
   * 是否抛出错误
   */
  throwError?: boolean;
  /**
   * 是否隐藏接口报错toast
   */
  hideErrorToast?: boolean;
}

/**
 * FetchTool的定义
 * https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-types
 * @example
  // interface GenericIdentityFn {
  //   <Type>(arg: Type): Type;
  // }
  // function identity<Type>(arg: Type): Type {
  //   return arg;
  // }
  // let myIdentity: GenericIdentityFn = identity;
 *
 */
// type FetchTool = <T>(fetcher: FetcherFn<T>, config?: FetchToolConfig) => Promise<FunctionReturnType<typeof fetcher>>
interface FetchTool {
  <T>(fetcher: FetcherFn<T>, config?: FetchToolConfig): Promise<
    ResponseStruct<FunctionReturnType<typeof fetcher>>
  >;
}

/**
 * 处理报错信息
 * @param error FetchToolCatch的error
 * @returns String
 */
const dealError = (error: HttpError | Error) => {
  // eslint-disable-next-line no-underscore-dangle
  if ("__hRestHttpError" in error && error.__hRestHttpError) {
    const {
      response: { data: { message } = {} },
    } = error as HttpError;
    return ` ${message || ""}` || "未知";
  }

  return error.message;
};

const fetchTool: FetchTool = async (fetcher, config) => {
  try {
    const { data } = await fetcher(api);
    // NOTICE: 注意接口 层级
    return data;
  } catch (error) {
    // 默认展示报错弹窗
    if (!config?.hideErrorToast) {
      console.error(dealError(error as HttpError | Error), 5);
    }

    if (config?.throwError) {
      throw error;
    }
  }
  return undefined;
};

/**
 * NOTICE: 返回出来的值存在结构不一的问题
 */
export default fetchTool;
