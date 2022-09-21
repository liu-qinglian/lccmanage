<template>
  <div>
    <div style="width: 600px" class="depManaOp">
      <el-input
        placeholder="请输入部门名称"
        v-model="filterText"
        prefix-icon="el-icon-search"
        style="width: 300px"
        size="small"
      >
      </el-input>

      <el-tree
        class="filter-tree"
        :data="deps"
        :props="defaultProps"
        :expand-on-click-node="false"
        :filter-node-method="filterNode"
        ref="tree"
        style="padding-bottom: 10px"
      >
        <span class="custom-tree-node" slot-scope="{ data }">
          <span>{{ data.name }}</span>
          <span style="margin-left: 130px">
            <el-button
              type="primary"
              size="mini"
              style="padding: 4px 8px"
              @click="() => appendDep(data)"
            >
              添加
            </el-button>
            <el-button
              type="danger"
              size="mini"
              style="padding: 3px"
              @click="() => removeDep(data)"
            >
              移除
            </el-button>
          </span>
        </span>
      </el-tree>
    </div>

    <div>
      <el-dialog title="添加部门" width="30%" :visible.sync="dialogVisible">
        <table>
          <tr>
            <td><el-tag style="margin-right: 15px">上级部门</el-tag></td>
            <td>{{ pname }}</td>
          </tr>
          <tr>
            <td><el-tag style="margin-right: 15px">部门名称</el-tag></td>
            <td>
              <el-input
                v-model="dep.name"
                placeholder="请输入要添加的部门名称"
              ></el-input>
            </td>
          </tr>
        </table>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancelAddDep">取消</el-button>
          <el-button @click="doAddDep">确定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "depMana",
  data() {
    return {
      filterText: "",
      deps: [],
      dialogVisible: false,
      defaultProps: {
        children: "children",
        label: "name",
      },
      dep: {
        name: "",
        parentId: -1,
      },
      pname: "",
    };
  },

  mounted() {
    this.initDeps();
  },
  watch: {
    // 先监听搜索框里面的内容
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },

  methods: {
    initDeps() {
      this.getRequest("/sys/basic/basicDepartmen").then((res) => {
        if (res) {
          this.deps = res;
        }
      });
    },
    //    :filter-node-method="filterNode"  执行过滤
    filterNode(value, data) {
      // 返回true就展示
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    appendDep(data) {
      this.dep.parentId = data.id;
      this.pname = data.name;
      this.dialogVisible = true;
    },
    // 手动添加  就不会自己收缩
    addDep(deps, dep) {
      for (let i = 0; i < deps.length; i++) {
        let d = deps[i];
        if (d.id == this.dep.parentId) {
          d.children = d.children.concat(dep);
          if (d.children.length > 0) {
            // 添加子之后把父的isParent修改
            parent.isParent = true;
          }
          return;
        } else {
          this.addDep(d.children, dep);
        }
      }
    },
    doAddDep() {
      if (this.dep.name) {
        this.postRequest("/sys/basic/basicDepartmen", this.dep).then((res) => {
          if (res) {
            // this.initDeps();
            this.dep = {
              name: "",
              parentId: -1,
            };

            this.pname = "";
            this.dialogVisible = false;
            this.addDep(this.deps, res.obj);
            this.$message.success("添加成功!");
          }
        });
      } else {
        this.$message.error("输入不能为空!");
      }
    },

    cancelAddDep() {
      this.dialogVisible = false;
      this.$message.info("已取消添加");
    },
    // 手动删除
    removeDepFromDep(parent, deps, id) {
      for (let i = 0; i < deps.length; i++) {
        let d = deps[i];
        if (d.id == id) {
          deps.splice(i, 1); //当前索引开始删，删一个
          if (deps.length == 0) {
            // 删除子之后把父的isParent修改
            parent.isParent = false;
          }
          return;
        } else {
          this.removeDepFromDep(d, d.children, id); //递归
        }
      }
    },
    removeDep(data) {
      // 如果是父部门就删除失败
      if (data.isParent) {
        this.$message.error("不能直接删除父部门哦!");
      } else {
        this.$confirm(
          "此操作将永久删除[" + data.name + "]信息, 是否继续?",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }
        )
          .then(() => {
            this.delRequest("/sys/basic/basicDepartmen/", data.id).then(
              (res) => {
                if (res) {
                  // 这个地方的函数，你再思考一下
                  this.removeDepFromDep(null, this.deps, data.id);
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
      }
    },
  },
};
</script>

<style>
.depManaOp {
  margin: 15px 10px;
}
.filter-tree {
  margin: 10px 20px;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  /* height: 30px; */
}
</style>