import Mock from 'mockjs'

Mock.setup({
    timeout: '300-600'
})




// 1.动态数据

function initData() {
    const adminlists = [];
    for (let i = 0; i < 8; i++) {
        adminlists.push(Mock.mock({
            // "shopId|+1": 1,//生成商品id，自增1 
            id: '@increment',
            name: '@cname',
            'phone|1': /^1[0-9]{10}$/,
            'telephone|1': /^1[0-9]{10}$/,
            'address|1': '@county(true)',
            'enabled|1': [true, false],
            username: 'admin',
            password: /[0-9]{9}$/,
            'userFace|1': ['https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202005%2F02%2F20200502185802_FuFU2.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1663551923&t=a42488375f337bd37b791eecb74e55ed', 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F201908%2F19%2F20190819150344_ALnaX.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1663551923&t=0caab00d0d37259d3ad309d5e30db5b3', 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202107%2F17%2F20210717232533_2edcf.thumb.1000_0.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1663551923&t=e7ac197318502b67a73cdec80d17dd6c', ' https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202004%2F01%2F20200401100914_vrdlk.thumb.1000_0.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1663581867&t=f6ae6f0a889546a95f222cfaa53ae0ad ',],
            remark: null,
            roles: [
                {
                    id: 6,
                    name: 'ROLE_admin',
                    'nameZh|1': ['系统管理员', '部门经理']
                }
            ],
            authorities: [
                {
                    authority: 'ROLE_admin'
                },
                {
                    authority: "ROLE_recruiter"
                },
            ],
            accountNonExpired: true,
            credentialsNonExpired: true,
            accountNonLocked: true

        }))
    }
    return adminlists;
}
// 2.数据共享

export function getAdminList() {
    console.log(localStorage.getItem('adminlist'));
    // 若 localStorage 没有数据，则将 Mock 的数据存入
    if (!localStorage.getItem('adminlist')) {
        // if (localStorage.getItem('adminlist')) {
        localStorage.setItem('adminlist', JSON.stringify(initData()))
        // 每次获取数据时，再从 localStorage 中拉取数据
        console.log(localStorage.getItem("adminlist"));
        //     var adminlist = JSON.parse(localStorage.getItem('adminlist'))
        //     console.log(adminlist);
        //     return adminlist
        // }
    }
    var adminlist = JSON.parse(localStorage.getItem('adminlist'))
    console.log(adminlist);
    return adminlist

}
// 获取单个用户信息
export function getUser(options) {
    // 先从 localStorage 中拉取数据
    var adminlist = JSON.parse(localStorage.getItem('adminlist'))
    // 遍历数组，返回id 与传来 id 相当的一个对象
    for (let index in adminlist) {
        if (adminlist[index].id === options.body) {
            var admin = adminlist[index]
            return admin
        }
    }
}

// 删除用户信息
export function deleteUser(options) {
    // 先从 localStorage 中拉取数据
    var adminlist = JSON.parse(localStorage.getItem('adminlist'))
    console.log(options);
    let index = JSON.parse(options.body).id;
    let temp
    // 根据传递的 id 删除 用户
    for (let i in adminlist) {
        if (adminlist[i].id === index) {
            adminlist.splice(i, 1)
            localStorage.setItem('adminlist', JSON.stringify(adminlist))
            console.log("删除成功");

        }
    }

    return {
        data: {
            msg: "删除成功",
            adminlist,
        }
    }
}

// 添加用户信息
export function addUser(options) {
    // 先从 localStorage 中拉取数据
    var adminlist = JSON.parse(localStorage.getItem('adminlist'))
    // 获取传入用户信息对象，是一个字符串，需要转化为对象
    var admin = JSON.parse(options.body)
    // 使用 mock 随机生成一个 id
    admin.id = Random.id()
    // 将 admin 插入到 adminlist 中
    adminlist.unshift(admin)
    // 重新将 adminlist 存入 localStorage 中
    localStorage.setItem('adminlist', JSON.stringify(adminlist))
    return {
        data: '用户添加成功'
    }
}

// 更新用户信息
export function updateUser(options) {
    // 先从 localStorage 中拉取数据
    var adminlist = JSON.parse(localStorage.getItem('adminlist'))
    var admin = JSON.parse(options.body)
    // 遍历 adminlist 根据传入对象的 id 更新用户信息
    for (let index in adminlist) {

        if (adminlist[index].id === admin.id) {
            adminlist[index] = admin
        }
    }
    localStorage.setItem('adminlist', JSON.stringify(adminlist))
    return {
        data: '用户更新成功'
    }
}

// 制作各个接口  
// 管理员信息
// Mock.mock('/sys/admin/getAdminlist', 'get', getAdminList)
// Mock.mock('/sys/admin/getuser', 'post', getUser)
// Mock.mock('/sys/admin/deleteuser', 'delete', deleteUser)
// Mock.mock('/sys/admin/adduser', 'post', addUser)
// Mock.mock('/sys/admin/updateuser', 'post', updateUser)

export default Mock