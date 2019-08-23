import { Dispatch } from "redux";

interface IOptions {
  url: string,
  method?: string,
  data?: any,
  headers?: Record<string, string>,
  contentType?: string,
  dispatch?: Dispatch
}
const _fetch = async ({
  dispatch,
  url,
  method = 'GET',
  data = {},
  headers = {},
}: IOptions) => {
  try {
    const reqOptions = {
      method,
      headers,
      body: typeof data === 'string' ? data : JSON.stringify(data)
    }
    if (reqOptions.method.toUpperCase() === 'GET' && !!data) { // 若是get，则去掉body
      data = typeof data === 'string' ? JSON.parse(data) : data
      url = url + '?' + Object.keys(data).map(key => `${key}=${data[key]}`).join('&')
      delete reqOptions.body
    }
    const response = await fetch(url, reqOptions)
    const responseJson = await response.json()
    const { status } = response
    if (status === 200) { // 请求成功
      console.log(responseJson)
      return responseJson
    }
    throw responseJson
  } catch (err) {
    throw err
  }
}

const Fetch = function (opts: IOptions, timeout: number = 10000) {
  if (timeout === 0) {
    return _fetch(opts)
  }
  return Promise.race([
    _fetch(opts),
    new Promise((resolve, reject) => {
      setTimeout(
        () => {
          reject('timeout')
        },
        timeout)
    })
  ])
}

export const to = (promise: Promise<any>) => {
  return promise.then(function () {
    return [null, ...arguments]
  }).catch(err => {
    if (err === 'timeout') {
      console.error('请求超时，请稍后再试')
    }
    return [err, null]
  })
}

export default Fetch