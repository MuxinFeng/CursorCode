export interface ResponseStruct<T> {
  data?: T
  results?: T
  // 不同接口不一样
  totalCount?: number
  count?: number
  code?: number
  message?: string
  // 怎么还有这种接口
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export type NormalResponse<T> = ResponseStruct<T>

export interface CommonParams {
  page: number
  size: number
}

export interface FileInfo {
  /**
   * 文件名
   */
  fileName: string
  /**
   * 路径
   */
  filePath: string
  /**
   * 大小
   */
  size?: string
  /**
   * 上传时间
   */
  uploadDatetime?: string
}
