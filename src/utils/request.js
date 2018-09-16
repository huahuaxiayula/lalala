import Taro from '@tarojs/taro'

// export default function request(opt) {
//   return Taro.request(opt).then((res) => {
//     let {statusCode, data} = res;
//     if (statusCode >= 200 && statusCode < 300) {
//       return data;
//     } else {
//       throw new Error(`网络请求错误，状态码${statusCode}`);
//     }
//   })
// }
const _header = { 'Content-Type': 'application/json' }
const _errorHandler = (res) => {
	console.log("请求出错了老兄", res)
}
/**
 * GET类型的网络请求
 */
export function getRequest(url, data, header = _header, error = _errorHandler) {
	return request(url, data, header, 'GET', error)
}

/**
 * DELETE类型的网络请求
 */
export function deleteRequest(url, data, header = _header, error = _errorHandler) {
	return request(url, data, header, 'DELETE', error)
}

/**
 * PUT类型的网络请求
 */
export function putRequest(url, data, header = _header, error = _errorHandler) {
	return request(url, data, header, 'PUT', error)
}

/**
 * POST类型的网络请求
 */
export function postRequest(url, data, header = _header, error = _errorHandler) {
	// console.log(url, data, header = _header, error = _errorHandler)
	return request(url, data, header, 'POST', error)
}

/**
 * 网络请求
 */
export function request(url, data, header, method, error) {
	return new Promise((resolve, reject) => {
		Taro.request({
			url: url,
			data: data,
			header: header,
			method: method,
			success: (res => {
				if (res.statusCode === 200) {
					//200: 服务端业务处理正常结束
					resolve(res)
				} else {
					//其它错误，提示用户错误信息
					if (error != null) {
						//如果有统一的异常处理，就先调用统一异常处理函数对异常进行处理
						error(res)
					}
					reject(res)
				}
			}),
			fail: (res => {
				if (error != null) {
					error(res)
				}
				reject(res)
			})
		})
	})
}
