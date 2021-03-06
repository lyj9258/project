import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
export default new Vuex.Store({
    // state 数据源  存放数据  读数据（this.$store.state.全局数据名称）
    state: {
        count: 0,
        city: '地球',
        _token:"",
        gender: "",
    },
    // 存储修改数据的方法
    // 不能写异步代码
    mutations: {
        add: function (state, step) {
            state.count += step
        },
        setCity: function (state, cityName) {
            state.city = cityName;
        },
        updateToken: function (state, _token) {
            state._token = _token;
            localStorage.setItem("_token", _token);
        },
    },
    // 存储修改数据的方法（可以写异步）
    actions: {
        addAsync: function (context, step) {
            setTimeout(() => {
                context.commit('add', step)
            }, 3000)
        },
    },
    // 加工处理数据
    getters: {
        getCount: function (state) {
            return "当前总数是" + state.count;
        }
    },
})