<template>
  <div>
    <div class="permissManaTop">
      <el-input
        size="small"
        placeholder="请输入角色英文名"
        v-model="role.name"
        @keydown.enter.native="doAddRole"
        style="width: 300px; margin-right: 30px"
      >
        <template slot="prepend"> ROLE_</template>
      </el-input>
      <el-input
        size="small"
        placeholder="请输入角色中文名"
        v-model="role.nameZh"
        @keydown.enter.native="doAddRole"
        style="width: 300px; margin-right: 30px"
      >
      </el-input>
      <el-button
        size="small"
        type="primary"
        icon="el-icon-plus"
        @click="doAddRole"
      >
        添加角色</el-button
      >
    </div>

    <div class="permissManaMain">
      <el-collapse v-model="activeName" @change="change">
        <el-collapse-item
          :title="ro.nameZh"
          :name="ro.id"
          v-for="(ro, index) in roles"
          :key="index"
        >
          <el-card>
            <div slot="header" class="clearfix">
              <span>可访问资源</span>
              <el-button
                style="float: right; padding: 3px 0; color: red"
                type="text"
                icon="el-icon-delete"
                @click="deleteRole(ro)"
              ></el-button>
            </div>
            <!-- 树形控件展示 -->
            <div>
              <el-tree
                show-checkbox
                :data="allMenu"
                :props="defaultProps"
                :default-checked-keys="selectedMenus"
                node-key="id"
                ref="tree"
                :key="index"
              ></el-tree>
              <div style="display: flex; justify-content: flex-end">
                <el-button size="mini" @click="cancelUpdate"
                  >取消修改</el-button
                >
                <el-button
                  size="mini"
                  type="primary"
                  @click="doUpdate(ro.id, index)"
                  >确认修改</el-button
                >
              </div>
            </div>
          </el-card>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
export default {
  name: "permissMana",
  data() {
    return {
      role: {
        name: "",
        nameZh: "",
      },
      roles: [],
      allMenu: [],
      activeName: -1,
      defaultProps: {
        children: "children", //子菜单对应allMenu里面的children
        label: "name", //显示的名字
      },
      selectedMenus: [7, 8, 13, 15, 19, 21], //模拟接口返回数据
    };
  },
  mounted() {
    this.initRoles();
  },
  methods: {
    initRoles() {
      this.getRequest("/sys/basic/basicPermissData").then((res) => {
        if (res) {
          this.roles = res;
        }
      });
    },
    initAllMenu() {
      this.getRequest("/sys/basic/basicPermissMenu").then((res) => {
        if (res) {
          this.allMenu = res;
        }
      });
    },
    // 这里的接口要传数据，mock模拟不了呀
    // initSelecteMunu(rid){
    //   this.getRequest(" "+rid).then((res) => {
    //     if (res) {
    //       this.selectedMenus = res;
    //     }
    //   });
    // },
    change(rid) {
      if (rid) {
        this.initAllMenu();
        // this.initSelecteMunu();
      }
    },

    doUpdate(rid, index) {
      let tree = this.$refs.tree[index];
      let selectedKeys = tree.getCheckedKeys(true); // 拿到选中的keys  true只返回自叶子结点的keys
      // console.log(tree, selectedKeys);
      let url = "/sys/basic/basicPermissMenu/?rid=" + rid;
      selectedKeys.forEach((key) => {
        url += "&mids=" + key;
      });
      this.putRequest(url).then((res) => {
        if (res) {
          this.initRoles();
          this.activeName = -1;
        }
      });
    },
    cancelUpdate() {
      this.activeName = -1;
    },
    doAddRole() {
      if (this.role.name && this.role.nameZh) {
        // this.postRequest("/sys/basic/basicPermissMenu", this.roles).then(   //接口没有用get测试
        this.getRequest("/sys/basic/basicPermissMenu", this.roles).then(
          (res) => {
            if (res) {
              this.role.name = "";
              this.role.nameZh = "";
              this.initRoles();
              this.$message.success("success");
            }
          }
        );
      } else {
        this.$message.error("输入不能为空！");
      }
    },
    deleteRole(role) {
      this.$confirm("是否删除选中的[" + role.nameZh + "]数据？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.delRequest("/sys/basic/basicPermissMenu/" + role.id).then(
            (res) => {
              if (res) {
                this.initRoles();
              }
            }
          );
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style>
.permissManaTop {
  margin-top: 20px;
}
.permissManaMain {
  margin-top: 20px;
  width: 75%;
}
</style>