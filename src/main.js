// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Routers from './router/routers'
import VueRouter from 'vue-router'
import store from './store'
// import Vuex from 'vuex'
import iView from 'iview'
// import i18n from '@/locale'
// import config from '@/config'
// import importDirective from '@/directive'
// import { directive as clickOutside } from 'v-click-outside-x'
// import installPlugin from '@/plugin'
import './index.less'
import '@/assets/icons/iconfont.css'
// import TreeTable from 'tree-table-vue'
// import VOrgTree from 'v-org-tree'
// import 'v-org-tree/dist/v-org-tree.css'

//--iviewUI--
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';

//--elementUi
import {
    DatePicker,
    Table,
    TableColumn,
    Button,
    Pagination,
    Dialog,
    Radio,
    Input,

} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(DatePicker)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Button)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Radio)
Vue.use(Input)
//--elementUi

axios.defaults.withCredentials = true;
axios.defaults.crossDomain = true;
Vue.prototype.$http = axios

Vue.use(VueRouter);
Vue.use(ViewUI);
// Vue.use(Vuex);

//环境
/*第一层if判断生产环境和开发环境*/
if (process.env.NODE_ENV === 'production') {
    /*第二层if，根据.env文件中的VUE_APP_FLAG判断是生产环境还是测试环境*/
    if (process.env.VUE_APP_FLAG === 'pro') {
        //production 生产环境
        axios.defaults.baseURL = 'http://49.234.229.202:7088/';
        // axios.defaults.baseURL = 'http://47.98.106.35:17088/';

    } else {
        //test 测试环境
        // axios.defaults.baseURL = 'http://47.98.106.35:17088/';
        axios.defaults.baseURL = 'http://49.234.229.202:7088/';

    }
} else {
    //dev 开发环境
    axios.defaults.baseURL = 'http://49.234.229.202:7088/';
    // axios.defaults.baseURL = 'http://47.98.106.35:17088/';
}

//----**----
import axios from 'axios'
Vue.prototype.axios = axios
const RouterConfig = {
    routes: Routers
};
const router = new VueRouter(RouterConfig);

// Vue.config.headers.common['UID'] = store.state.session


Vue.prototype.axios.interceptors.response.use(response => {
    console.log(toString(response))
    console.log("response" + '上111---------')
    if (response.data.resCode == "1000") {
        localStorage.clear();
        alert(response.data.resMsg)
        router.push({
            name: 'login'
        })
    }
    return response;
}, error => {
    if (error && error.response) {
        switch (error.response.status) {
            case 404:
                router.push({ name: 'error_404' });
                // error.message = '请求出错(404)'
                break;

            case 500:
                router.push({ name: 'error_500' });
                //  error.message = '服务器错误(500)';
                break;

            default: error.message = `连接出错(${error.response.status})!`;
        }
    }
    return Promise.reject(error);
});



router.beforeResolve((to, from, next) => {
    // let data = sessionStorage.getItem('data')
    // console.log(data)
    // let data = window.document.cookie
    if (to.meta.requireAuth) {
        // let data = document.cookie.split(';')
        let data = sessionStorage.getItem('data')
        if (data == '0') {
            ViewUI.Message.warning('请先登录');
            // next()
            next('/login')
        }
        if (data == null) {
            ViewUI.Message.warning('请先登录');
            setTimeout(() => {
                // next()
                next('/login')
            }, 1500);
        }
        if (data.length > 0) {
            next()
        }
    } else {
        next()
    }
})

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
