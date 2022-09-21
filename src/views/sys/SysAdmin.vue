<template>
  <div>
    <div class="adminHead">
      <el-input
        v-model="keyWords"
        placeholder="通过用户名搜索用户..."
        prefix-icon="el-icon-search"
        style="width: 400px; margin-right: 50px"
        clearable
        @clear="initAdmins"
      ></el-input>
      <el-button
        type="primary"
        icon="el-icon-search"
        size="small"
        @click="doSearch"
        >搜 索</el-button
      >
      <div class="el-icon-user allAdmins" @click="getAllAdmin">全部</div>
    </div>
    <div class="adminMain" ref="aaa">
      <div v-if="ifShow" class="notFindMessage">没有您要找的这个人哦！</div>
      <el-card class="box-card" v-for="(admin, index) in admins" :key="index">
        <div slot="header" class="clearfix">
          <span>{{ admin.name }}</span>
          <el-button
            style="float: right; padding: 3px 0; color: red"
            icon="el-icon-delete"
            @click="deleteAdmin(admin)"
          ></el-button>
        </div>
        <div class="cardMain">
          <div class="imgContain">
            <img
              :src="admin.userFace"
              :alt="admin.name"
              :title="admin.name"
              class="userFace"
            />
          </div>

          <div class="userInfoContain">
            <div>
              用户名: <span>{{ admin.name }}</span>
            </div>
            <div>
              手机号码:<span> {{ admin.phone }}</span>
            </div>
            <div>
              电话号码:<span>{{ admin.telephone }}</span>
            </div>
            <div>
              地址: <span>{{ admin.address }}</span>
            </div>
            <div>
              用户状态:

              <el-switch
                v-model="admin.enabled"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-text="启用"
                inactive-text="禁用"
                style="margin-left: 20px"
                @change="enabldChange(admin)"
              >
              </el-switch>
            </div>

            <div>
              用户角色:
              <el-tag
                type="success"
                v-for="(role, indexj) in admin.roles"
                :key="indexj"
                >{{ role.nameZh }}
              </el-tag>
              <el-popover
                placement="bottom"
                title="角色列表"
                width="200"
                trigger="click"
                @show="showPops(admin)"
                @hide="hidePops(admin)"
              >
                <el-select
                  v-model="selectedRoles"
                  multiple
                  placeholder="请选择"
                >
                  <el-option
                    v-for="(r, index) in allRoles"
                    :key="index"
                    :label="r.nameZh"
                    :value="r.id"
                  >
                  </el-option>
                </el-select>

                <el-button
                  style="margin-left: 10px"
                  type="text"
                  icon="el-icon-more"
                  slot="reference"
                ></el-button>
              </el-popover>
            </div>
            <div>
              备注：<span>{{ admin.remark }}</span>
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "sysAdmin",
  data() {
    return {
      admins: [],
      keyWords: "",
      ifShow: false,
      allRoles: [],
      selectedRoles: [],
    };
  },

  mounted() {
    this.initAdmins();
  },
  methods: {
    initAdmins() {
      // this.getRequest( "/sys/admin/adminController/?keyWords=" + this.keywords
      this.getRequest("/sys/admin/getAdminlist").then((res) => {
        if (res) {
          this.admins = res;
          this.ifShow = false;
        }
      });
    },
    initAllRoles() {
      this.getRequest("/sys/basic/basicPermissData").then((res) => {
        if (res) {
          this.allRoles = res;
        }
      });
    },
    // 这里搜索功能要传参
    doSearch() {
      if (this.keyWords) {
        // this.initAdmins();
        // 自己定义方法
        let newAdmins = [];
        for (let i = 0; i < this.admins.length; i++) {
          if (this.admins[i].name.indexOf(this.keyWords) !== -1) {
            // console.log("aaa");
            // console.log(this.admins[i].name);
            newAdmins.push(this.admins[i]);
          }
        }
        // console.log(newAdmins);
        // return newAdmins;
        this.admins = newAdmins;
        console.log(this.admins);
        if (this.admins.length == 0) {
          this.ifShow = true;
        }
      } else {
        this.$message.error("输入不能为空！");
        this.ifShow = false;
        // this.initAdmins();
      }
    },

    getAllAdmin() {
      this.initAdmins();
      this.keyWords = "";
    },

    deleteAdmin(admin) {
      this.$confirm(
        "此操作将永久删除[" + admin.name + "]信息, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          this.postRequest("/sys/admin/deleteuser", { id: admin.id }).then(
            (res) => {
              if (res) {
                console.log(res);
                this.initAdmins();
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
              }
            }
          );
        })
        .catch((e) => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    enabldChange(admin) {
      // this.putRequest("/sys/admin/adminController", admin).then((res) => {
      //   if (res) {
      //     this.initAdmins();
      //   }
      // });
    },
    showPops(admin) {
      this.initAllRoles();
      let roles = admin.roles; //对象
      this.selectedRoles = []; //初始化
      roles.forEach((r) => {
        this.selectedRoles.push(r.id);
      });
    },
    hidePops(admin) {
      let roles = [];
      Object.assign(roles, admin.roles);
      let flag = false;
      // 如果长度变了，就一定改了数据
      if (roles.length != this.selectedRoles.length) {
        flag = true;
      } else {
        // 如果长度没有变则判断是否为原来的数据
        for (let i = 0; i < roles.length; i++) {
          let role = roles[i];
          for (let j = 0; j < this.selectedRoles.length; j++) {
            let sr = this.selectedRoles[j];
            if (role.id == sr) {
              roles.splice(i, 1);
              i--;
              break;
            }
          }
        }
        if (roles.length != 0) {
          flag = true;
        }
      }

      if (flag) {
        let url = "/sys/admin/adminController?adminId=" + admin.id;
        this.selectedRoles.forEach((sr) => {
          url += "&rids=" + sr;
        });
        this.putRequest(url).then((res) => {
          if (res) {
            this.initAdmins();
          }
        });
      }
    },
  },
};
</script>

<style>
.adminHead {
  display: flex;
  justify-content: center;
  margin: 25px 0;
}
.adminMain {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap: wrap;
}
.box-card {
  width: 430px;
  margin-bottom: 25px;
}
.userFace {
  width: 50px;
  height: 50px;
  border-radius: 25px;
}
.imgContain {
  width: 100%;
  display: flex;
  justify-content: center;
}
.userInfoContain > div {
  margin: 10px;
}
.userInfoContain > div > span {
  margin-left: 20px;
  /* flex: 1; */
}
.notFindMessage {
  font-size: 24px;
  color: rgb(248, 159, 99);
  text-align: center;
  width: 100%;
  margin-top: 40px;
}
.allAdmins {
  padding: 10px 15px;
  cursor: pointer;
  color: rgb(197, 134, 52);
  font-weight: bold;
}
</style>