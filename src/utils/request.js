import axios from "axios";
import ElMessage from "element-ui";

// 创建axios实例
const request = axios.create({
  // 设置接口请求的前缀地址
  baseURL: "http://localhost:5555/",
  // 请求超时时间：50s
  timeout: 50000,
  headers: { "Content-Type": "application/json;charset=utf-8" },
});

//请求拦截器
request.interceptors.request.use(
  (config) => {
    //可以通过请求头携带公共参数-token
    //config:请求拦截器回调注入的对象(配置对象),配置对象的身上最终要的一件事情headers属性
    if (!config.headers) {
      throw new Error(
        `Expected 'config' and 'config.headers' not to be undefined`
      );
    } else config.headers["Authorization"] = localStorage.getItem("token");

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//响应拦截器
request.interceptors.response.use(
  (response) => {
    //响应拦截器成功的回调,一般会进行简化数据
    let res = response.data;
    if (res.code === 200) {
      return response;
    } else {
      ElMessage.Message.error(res.message ? res.message : "系统异常");
      return Promise.reject(response.data.message);
    }
  },
  (error) => {
    //处理http网络错误
    const code = error;
    console.log(error);
    switch (code) {
      case 404:
        //错误提示信息
        ElMessage({
          type: "error",
          message: error.message,
        });
        break;
      case 401:
        //错误提示信息
        ElMessage({
          type: "error",
          message: "请求参数有误",
        });
        break;
      case 500 | 501 | 502 | 503 | 504 | 505:
        //错误提示信息
        ElMessage({
          type: "error",
          message: "服务器挂了",
        });
        break;
      default:
        break;
    }
    return Promise.reject(new Error(error.message));
  }
);

export default request;
