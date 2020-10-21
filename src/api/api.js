//发送具体的请求
// 导入需要使用的模块

import http from './http';
import {
    nowPlayingListUri,
    comingSoonListUri,
    cinemaListUri,
    moiveDetailUrl,
    bannersUri,
    cityListUri,
    loginUrl,
    centerUrl
} from '@/config/url';

//请求正在热映列表数据 
export const nowPlayingListData = (pageNum) => {
    http.defaults.headers.authorization = "";
    http.defaults.headers.info = " ";
    return http.get(nowPlayingListUri + pageNum);
}

//请求即将上映列表数据 
export const comingSoonListData = (pageNum) => {
    http.defaults.headers.authorization = "";
    http.defaults.headers.info = " ";
    return http.get(comingSoonListUri + pageNum);
}

//影院列表详情
export const cinemaListData = (ticketFlag) => {
    http.defaults.headers.authorization = "";
    http.defaults.headers.info = "cinema";
    return http.get(cinemaListUri + ticketFlag);
}

export const bannersData = () => {
    http.defaults.headers.authorization = "";
    http.defaults.headers.info = "banners";
    return http.get(bannersUri);
}
// 城市列表信息
export const cityListData = async () => {
    http.defaults.headers.authorization = "";
    http.defaults.headers.info = "city";
    let ret = await http.get(cityListUri);
    let cities = ret.data.data.cities;
    let cityIndex = [];
    let dataList = [];
    let indexList = [];

    for (let i = 65; i <= 90; i++) {
        cityIndex.push(String.fromCharCode(i));
    }
    cityIndex.forEach((index) => {
        let tmpArr = cities.filter(
            (item) => index.toLowerCase() == item.pinyin.substr(0, 1)
        );
        if (tmpArr.length > 0) {
            indexList.push(index);
            dataList.push({
                index,
                data: tmpArr,
            });
        }
    });
    return Promise.resolve([dataList, indexList]);
}

// 电影详情

export const moiveDetailData = (filmId) => {
    http.defaults.headers.authorization = "";
    http.defaults.headers.info = "info"
    return http.get(moiveDetailUrl + filmId)
}


//登录
export const userLogin = (data) => {
    return http.post(loginUrl, data);
};


// 获取用户个人信息
export const userInfo = (_token) => {
    http.defaults.headers.authorization = _token;
    http.interceptors.response.use(function (response) {
        // response.data.user_info.gender = response.data.user_info.gender ?
        //     "女" :
        //     "男";
        return response
    }, function (error) {
        // 错误的处理
    });
    return http.get(centerUrl);
};