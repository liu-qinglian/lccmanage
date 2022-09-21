import { getAdminList, getUser, deleteUser, addUser, updateUser } from './port/sys/sysAdmin/adminInfo'
const Mock = require('mockjs')
// require.config({
//     paths: {
//         mock: 'http:/mockjs.com/dist/mock'
//     }
// })


//sys
// 管理员信息
Mock.mock('/sys/admin/getAdminlist', 'get', getAdminList)
Mock.mock('/sys/admin/getuser', 'post', getUser)
Mock.mock('/sys/admin/deleteuser', 'post', deleteUser)
Mock.mock('/sys/admin/adduser', 'post', addUser)
Mock.mock('/sys/admin/updateuser', 'post', updateUser)









Mock.mock('/login', 'get', require('./json/login.json'))   //账号密码
Mock.mock('/login', 'put', require('./json/login.json'))   //账号密码
Mock.mock('/vertical', 'get', require('./json/vertical.json'))  //验证码
Mock.mock('/menuList', 'get', require('./json/menuList.json'))   //主页菜单标题信息
Mock.mock('/adminInfo', 'get', require('./json/adminInfo.json'))  //管理员信息
Mock.mock('/loginOut', 'post', require('./json/loginOut.json')
    //     , () => {
    //         return {
    //             "code": 200,
    //             "message": "注销成功",
    //             "obj": { message: "注销成功" }
    //         }
    //     }
    //     // 太离谱了真的太离谱我无语死掉
)  //注销登录



// sysPos
Mock.mock('/sys/basic/posData', 'get', require('./json/sys/basicPosData.json')) //获取所有职位信息
// Mock.mock('/sys/basic/posData', 'post', require('./json/sys/basicPosData.json')) //获取所有职位信息
// Mock.mock('/sys/basic/posDel/{id}', 'delete', require('./json/sys/basicPosDel.json')) //获取所有职位信息
Mock.mock('/sys/basic/posData', 'put', require('./json/sys/basicPosData.json')) //获取所有职位信息
Mock.mock('/sys/basic/pos', 'post', require('./json/sys/basicPos.json'), function (option) {
    let $name = JSON.parse(option.name);
    if ($name) {
        return Mock.mock({
            status: 200,
            message: '提交成功！！！'
        })
    } else {
        return Mock.mock({
            status: 400,
            message: '未提交参数'
        })
    }
}) //添加职位信息

Mock.mock('/sys/basic/posData', 'delete', function (options) {
    // let rtype = options.type.toLowerCase(); //获取请求类型
    console.log(options);
    let id = parseInt(options.body) //获取删除的id
    console.log(arr);
    //这个arr哪来的
    arr = arr.filter(function (val) {
        return val.id != id;//把这个id对应的对象从数组里删除 
    });
    return arr
})//获取所有职位信息
let arr = [
    {
        "id": 1,
        "name": "技术总监",
        "createDate": "2028-03-31",
        "enabled": true
    },
    {
        "id": 2,
        "name": "运营总监",
        "createDate": "2020-03-31",
        "enabled": true
    },
    {
        "id": 3,
        "name": "市场总监",
        "createDate": "2028-03-31",
        "enabled": true
    },
    {
        "id": 4,
        "name": "研发工程师",
        "createDate": "2828-03-31",
        "enabled": true
    },
    {
        "id": 5,
        "name": "运维工程师",
        "createDate": "2820-03-31",
        "enabled": true
    }
]


// sysJob

Mock.mock('/sys/basic/JobLevelData', 'get', require('./json/sys/basicJobLevel.json')) //获取所有职位等级信息
Mock.mock('/sys/basic/JobLevelData', 'post', require('./json/sys/basicJobLevel.json'))
Mock.mock('/sys/basic/JobLevelData', 'del', require('./json/sys/basicJobLevel.json'))
Mock.mock('/sys/basic/JobLevelData', 'put', require('./json/sys/basicJobLevel.json'))

// sysPermiss

Mock.mock('/sys/basic/basicPermissData', 'get', require('./json/sys/basicPermiss.json'))//获取所有角色
Mock.mock('/sys/basic/basicPermissData', 'post', require('./json/sys/basicPermiss.json'))
Mock.mock('/sys/basic/basicPermissData', 'put', require('./json/sys/basicPermiss.json'))
Mock.mock('/sys/basic/basicPermissData', 'del', require('./json/sys/basicPermiss.json'))


Mock.mock('/sys/basic/basicPermissMenu', 'get', require('./json/sys/basicPermissMenu.json'))//获取所有
Mock.mock('/sys/basic/basicPermissMenu', 'post', require('./json/sys/basicPermissMenu.json'))
Mock.mock('/sys/basic/basicPermissMenu', 'put', require('./json/sys/basicPermissMenu.json'))
Mock.mock('/sys/basic/basicPermissMenu', 'del', require('./json/sys/basicPermissMenu.json'))

// sysDepartmen
Mock.mock('/sys/basic/basicDepartmen', 'get', require('./json/sys/basicDepartment.json')) //获取所有部门
Mock.mock('/sys/basic/basicDepartmen', 'post', require('./json/sys/basicDepartment.json'))
Mock.mock('/sys/basic/basicDepartmen', 'put', require('./json/sys/basicDepartment.json'))
Mock.mock('/sys/basic/basicDepartmen', 'del', require('./json/sys/basicDepartment.json'))


// // admin
// Mock.mock('/sys/admin/adminController', 'get', require('./json/sys/adminController.json')) //获取所有操作员
// Mock.mock('/sys/admin/adminController', 'post', require('./json/sys/adminController.json'))
// Mock.mock('/sys/admin/adminController', 'put', require('./json/sys/adminController.json'))
// Mock.mock('/sys/admin/adminController', 'del', require('./json/sys/adminController.json'))


/////////////////////////////////////////////////////////////////////////////////////////////////////
// emp
Mock.mock('/emp/empBasicData', 'get', require('./json/emp/empBasicData.json'))
Mock.mock('/emp/empBasicData', 'put', require('./json/emp/empBasicData.json'))
Mock.mock('/emp/empBasicData', 'post', require('./json/emp/empBasicData.json'))
Mock.mock('/emp/empBasicData', 'del', require('./json/emp/empBasicData.json'))

// 数据
Mock.mock('/emp/politicsStatusData', 'get', require('./json/emp/politicsStatusData.json'))
Mock.mock('/emp/departmentNameData', 'get', require('./json/emp/departmentNameData.json'))
Mock.mock('/emp/positionNameData', 'get', require('./json/emp/positionNameData.json'))
Mock.mock('/emp/nationsData', 'get', require('./json/emp/nationsData.json'))
Mock.mock('/emp/workID', 'get', require('./json/emp/workID.json'))