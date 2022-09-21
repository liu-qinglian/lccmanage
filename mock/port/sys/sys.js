const Mock = require('mockjs')


Mock.mock('/login', 'get', require('./json/login.json'))   //账号密码