import axios from 'axios';
import Toast from './toast';

const toast = new Toast();

let cancel, promiseArr = {};
const CancelToken = axios.CancelToken;

axios.defaults.baseURL = '/';
axios.defaults.headers = {
    'Access-Control-Allow-Origin': '*',
    'Authorization': 'snowe',
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8"',
    'X-Requested-With': 'XMLHttpRequest'
};

let instance = axios.create();
// 请求超时
instance.defaults.timeout = 5000;

// 添加请求拦截器
instance.interceptors.request.use(config => {
    //发起请求时，取消掉当前正在进行的相同请求
    const params = config.params;
    let param = '';
    for(let key in params){
        param +=  key + '=' + params[key] + (Object.keys(params).length > 1 ? '&' : '');
    }
    const url = config.url + '?' + param;
    if (promiseArr[url]) {
        promiseArr[url]('操作取消');
        promiseArr[url] = cancel;
    } else {
        promiseArr[url] = cancel;
    }
    // toast.show({
    //     text: 'loading...',
    //     duration: 50000
    // });
    return config;
}, error => {
    toast.hide();
    return Promise.reject(error);
});
// 移除拦截器
// axios.interceptors.request.eject(rep);

// 添加响应拦截器
instance.interceptors.response.use(response => {
    toast.hide();
    return response;
}, err => {
    toast.hide();
    if (err && err.response) {
        switch (err.response.status) {
            case 400:
                err.message = '错误请求';
                break;
            case 401:
                err.message = '未授权，请重新登录';
                break;
            case 403:
                err.message = '拒绝访问';
                break;
            case 404:
                err.message = '请求错误,未找到该资源';
                break;
            case 405:
                err.message = '请求方法未允许';
                break;
            case 408:
                err.message = '请求超时';
                break;
            case 500:
                err.message = '服务器端出错';
                break;
            case 501:
                err.message = '网络未实现';
                break;
            case 502:
                err.message = '网络错误';
                break;
            case 503:
                err.message = '服务不可用';
                break;
            case 504:
                err.message = '网络超时';
                break;
            case 505:
                err.message = 'http版本不支持该请求';
                break;
            default:
                err.message = `连接错误${err.response.status}`
        }
    }
    console.log(err.message);
    return Promise.resolve(err.response);
});


export default {
    get(url, params) {
        return new Promise((resolve, reject) => {
            instance({
                    method: 'get',
                    url,
                    params,
                    cancelToken: new CancelToken(c => {
                        cancel = c
                    })
                })
                .then(res => {
                    resolve(JSON.parse(res.data));
                })
                .catch(err => {
                    reject(err);
                })
        })
    },
    post(url, params) {
        return new Promise((resolve, reject) => {
            instance({
                    method: 'post',
                    url,
                    params,
                    cancelToken: new CancelToken(c => {
                        cancel = c
                    })
                })
                .then(res => {
                    resolve(JSON.parse(res.data));
                })
                .catch(err => {
                    reject(err);
                })
        })
    }
}