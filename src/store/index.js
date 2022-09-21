import { getRequest } from '@/utils/api';
import Vue from 'vue'
import Vuex from 'vuex'
import SockJs from 'sockjs-client'
// import Stomp from 'stompjs'

Vue.use(Vuex);
const now = new Date();

const store = new Vuex.Store({
    state: {
        routes: [],

        sessions: [
            //     {
            //     id: 1,
            //     user: {
            //         name: '示例介绍',
            //         img: 'https://github.com/is-liyiwei/vue-Chat-demo/blob/master/src/assets/images/3.jpg?raw=true'
            //     },
            //     messages: [{
            //         content: 'Hello，这是一个基于Vue + Vuex + Webpack构建的简单chat示例，聊天记录保存在localStorge, 有什么问题可以通过Github Issue问我。',
            //         date: now
            //     }, {
            //         content: '项目地址(原作者): https://github.com/coffcer/vue-chat',
            //         date: now
            //     }, {
            //         content: '本项目地址(重构): https://github.com/is-liyiwei',
            //         date: now
            //     }]
            // }, {
            //     id: 2,
            //     user: {
            //         name: 'webpack',
            //         img: 'https://github.com/is-liyiwei/vue-Chat-demo/blob/master/src/assets/images/2.png?raw=true'
            //     },
            //     messages: [{
            //         content: 'Hi，我是webpack哦',
            //         date: now
            //     }]
            //     }
        ],
        admins: [],
        currentAdmin: JSON.parse(window.sessionStorage.getItem("user")),

        currentSessionId: -1,
        filterKey: '',
        stomp: null
    },


    mutations: {
        initRoutes(state, data) {
            state.routes = data;
        },

        changeCurrentSessionId(state, id) {
            state.currentSessionId = id;
        },
        addMessage(state, msg) {
            state.sessions[state.currentSessionId - 1].messages.push({
                content: msg,
                date: new Date(),
                self: true
            })
        },
        INIT_DATA(state) {
            // 浏览器本地历史聊天记录
            let data = localStorage.getItem('vue-chat-session');

            if (data) {
                state.sessions = JSON.parse(data);
            }
        },
        INIT_ADMINS(state, data) {
            state.admins = data;
        },
        INIT_ADMIN(state, admin) {
            state.currentAdmin = admin;
        }
    },
    actions: {
        // /连接 denglu
        connect(context) {
            context.state.stomp = Stomp.over(new SockJs(''));
            let token = window.sessionStorage.getItem('tokenStr');
            context.state.stomp.connect({ 'Auth-Token': token }, success => {
                context.state.stomp.subscribe('', msg => {
                    console.log(msg.body);
                })
            }, error => {

            })
        },
        initData(context) {

            // context.commit('INIT_DATA')
            getRequest('/sys/admin/adminController').then(res => {
                if (res) {
                    context.commit('INIT_ADMINS', res)
                }
            })
        }
    },
});

export default store;

// export const actions = {
//     initData: ({ dispatch }) => dispatch('INIT_DATA'),
//     sendMessage: ({ dispatch }, content) => dispatch('SEND_MESSAGE', content),
//     selectSession: ({ dispatch }, id) => dispatch('SELECT_SESSION', id),
//     search: ({ dispatch }, value) => dispatch('SET_FILTER_KEY', value)
// };

store.watch(function (state) {
    return state.sessions
}, function (val) {
    console.log('CHANGE: ', val);
    localStorage.setItem('vue-chat-session', JSON.stringify(val));
}, {
    deep: true/*这个貌似是开启watch监测的判断,官方说明也比较模糊*/
})

