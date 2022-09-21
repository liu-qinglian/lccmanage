<template>
  <div class="home">
    <el-container>
      <el-header class="systemHeader">
        <div class="systemTitle">小车车在线办公</div>
        <!-- 下拉框 -->
        <div>
          <el-button
            icon="el-icon-s-comment"
            type="text"
            size="medium"
            style="margin-right: 10px; font-size: 24px; color: black"
            @click="goChat"
          ></el-button>
          <el-dropdown :hide-on-click="false" @command="commandHeader">
            <span class="el-dropdown-link">
              <i class="userName"> {{ user.name }} </i>
              <img
                :src="user.userFace"
                alt=""
                class="vatar"
                referrerPolicy="no-referrer"
              />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="userInfo">个人中心</el-dropdown-item>
              <el-dropdown-item command="setting">设置</el-dropdown-item>
              <el-dropdown-item command="loginout">注销登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>

      <el-container>
        <!-- 菜单栏 -->
        <el-aside width="200px">
          <!-- <el-menu @select="menuClick"> -->

          <el-menu router>
            <!-- <template v-for="(item, index) in this.$router.options.routes"> -->
            <template v-for="(item, index) in routes">
              <el-submenu :index="index + ''" v-if="!item.hidden" :key="index">
                <template slot="title">
                  <!--  Font Awesome 图标库 npm install font-awesome-->
                  <i
                    :class="item.iconCls"
                    style="color: rgb(248, 188, 109); font-size: 20px"
                  ></i>
                  <span class="titleName">{{ item.name }}</span>
                </template>

                <el-menu-item-group>
                  <!-- <template slot="title">分组一</template> -->
                  <el-menu-item
                    :index="children.path"
                    v-for="(children, indexx) in item.children"
                    :key="indexx"
                    class="childrenName"
                    >{{ children.name }}</el-menu-item
                  >
                  <!-- <el-menu-item index="/home/test2">选项2</el-menu-item> -->
                </el-menu-item-group>
              </el-submenu>
            </template>
          </el-menu>
        </el-aside>
        <!-- 主要展示区 -->
        <el-main>
          <el-breadcrumb
            v-if="this.$router.currentRoute.path != '/home'"
            separator-class="el-icon-arrow-right"
            class="Breadcrumb"
          >
            <el-breadcrumb-item :to="{ path: '/home' }">
              首页
            </el-breadcrumb-item>

            <el-breadcrumb-item>
              {{ this.$router.currentRoute.name }}
            </el-breadcrumb-item>
          </el-breadcrumb>
          <div class="welcome" v-if="this.$router.currentRoute.path == '/home'">
            欢迎来到小车车在线办公系统 ━(*｀∀´*)ノ亻!
          </div>
          <router-view class="showDataView"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// 这里到index——————————————————————————————————————————————————————————————HRY
import store from "../store/index";
// import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
export default {
  name: "home",
  data() {
    return {
      // user: JSON.parse(window.sessionStorage.getItem("user")),
    };
  },
  computed: {
    routes() {
      // 从vuex获取routes
      // 这里修改过————————————————————————————————————————————————————————HRY
      // console.log(store);
      // ...mapState(["routes"]),
      return store.state.routes;
    },
    user() {
      return this.$store.state.currentAdmin;
    },
  },
  methods: {
    // ...mapMutations(["initRoutes"]),
    // menuClick(index) {
    //   this.$router.push(index);
    // },
    commandHeader(command) {
      if (command == "userInfo") {
        console.log("233");
        this.$router.push("/userInfo");
      } else if (command == "loginout") {
        // 跳出弹出框确认
        this.$confirm("是否退出登录?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then((options) => {
            // // 注销登录
            // console.log(options);
            // this.postRequest("/loginOut");

            // // this.axios.post("/loginOut").then(function (res) {

            // //   console.log(res);
            // // });
            // // 清空用户数据
            window.sessionStorage.removeItem("tokenStr");
            window.sessionStorage.removeItem("user");
            // // 清空菜单  因为每个用户对应的菜单是不一样的
            // // this.$store.commit("initRoutes", []);
            // // 跳转到登录页面

            this.$router.replace("/");
            // 给你看一个就是那个不知道哪里来的

            this.$message({
              type: "success",
              message: "退出成功!",
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消",
            });
          });
      }
    },

    goChat() {
      this.$router.push("/Chat");
    },
  },
};
</script>

<style>
.systemHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgb(247, 155, 112);
  box-sizing: border-box;
}
.systemTitle {
  font-size: 28px;
  color: white;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
}
.titleName {
  margin-left: 15px;
  font-size: 18px;
}
.userName {
  /* line-height: 60px; */
  /* padding-bottom: 5px; */
  color: rgb(255, 255, 255);
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  font-size: 16px;
}
.vatar {
  width: 40px;
  height: 40px;
  cursor: pointer;
  margin-left: 10px;
  border-radius: 50%;
  vertical-align: middle;
}
.childrenName {
  font-size: 14px;
}
.Breadcrumb {
  height: 40px;
  line-height: 40px;
  background-color: rgb(245, 245, 245);
  font-size: 16px;
  padding-left: 10px;
}
.welcome {
  font-size: 32px;
  color: rgb(255, 205, 67);
  text-align: center;
}
.showDataView {
  margin-top: 8px;
}
</style>