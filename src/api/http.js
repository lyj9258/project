//封装axios
import axios from 'axios'

//设置基础的域名
axios.defaults.baseURL = "https://m.maizuo.com";

// 请求拦截器
axios.interceptors.request.use(
    function (config) {
        let host = "mall.film-ticket.film.list"
        let info = config.headers.info
        if (info == 'cinema') {
            host = "mall.film-ticket.cinema.list"
        }
        if (info == "info") {
            host = "mall.film-ticket.film.info"
        }
        if (info == "city") {
            host = "mall.film-ticket.city.list"
        }
        if (info == "banners") {
            host = "mall.cfg.cinema.banners"
        }

        if (config.headers.authorization) {
            config.headers = {
                authorization: config.headers.authorization,
            };
        } else {
            config.headers = {
                "X-Client-Info": '{"a":"3000","ch":"1002","v":"5.0.4","e":"160074879731645319036929","bc":"310100"}',
                "X-Host": host
            };
        }
        return config;
    },
    function (err) {

    });



export default axios;