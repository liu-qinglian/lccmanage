import { getRequest } from './api'

export const initMenu = (router, store) => {
    // 如果有菜单路由数据就不要操作了
    if (store.state.routes.length > 0) {
        return;
    }
    // 获取菜单数据
    getRequest('/menuList').then(data => {
        // 如果存在数据
        if (data) {
            // 格式化Router  使用formatRoutes方法
            // fmtRoutes是格式化后的数据 

            let fmtRoutes = formatRoutes(data);
            // console.log(fmtRoutes);
            // 把fmtRoutes数据添加到router
            router.addRoutes(fmtRoutes);
            console.log(router);
            store.commit('initRoutes', fmtRoutes);
            // 连接websocket
            // store.dispatch('connect')
        }
    })
}

export const formatRoutes = (routes) => {
    let fmtRoutes = [];
    routes.forEach(router => {
        let {
            path,
            component,
            name,
            iconCls,
            children,
        } = router;
        if (children && children instanceof Array) {
            children = formatRoutes(children);
        }
        let fmRouter = {
            path: path,
            name: name,
            iconCls: iconCls,
            children: children,

            component(resolve) {
                if (component.startsWith('Home')) {
                    require(['../views/' + component + '.vue'], resolve);

                }
                else if (component.startsWith('Emp')) {
                    // es5
                    require(['../views/emp/' + component + '.vue'], resolve);

                } else if (component.startsWith('Per')) {
                    // es5
                    require(['../views/per/' + component + '.vue'], resolve);

                } else if (component.startsWith('Sal')) {
                    // es5
                    require(['../views/sal/' + component + '.vue'], resolve);

                } else if (component.startsWith('Sta')) {
                    // es5
                    require(['../views/sta/' + component + '.vue'], resolve);

                } else if (component.startsWith('Sys')) {
                    // es5
                    require(['../views/sys/' + component + '.vue'], resolve);

                }
            }
        };

        fmtRoutes.push(fmRouter);
    });
    // console.log(fmtRoutes);
    return fmtRoutes;
}