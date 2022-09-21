<template>
  <div>
    <div class="addInput">
      <el-input
        v-model="jl.name"
        placeholder="添加职称等级"
        prefix-icon="el-icon-plus"
        size="small"
        style="width: 300px; margin-right: 30px"
      ></el-input>
      <el-select
        v-model="jl.titleLevel"
        clearable
        placeholder="请选择职称等级"
        size="small"
        style="margin-right: 50px"
      >
        <el-option
          v-for="item in titleLevels"
          :key="item"
          :label="item"
          :value="item"
          clearable
        >
        </el-option>
      </el-select>
      <el-button
        type="primary"
        size="small"
        icon="el-icon-plus"
        @click="addJobLevel"
        >添加</el-button
      >
      <el-button
        type="danger"
        size="small"
        @click="deleteMore"
        :disabled="this.multipleSelection.length == 0"
        >选定删除</el-button
      >
    </div>

    <div class="jobLevelTable">
      <el-table
        :data="jls"
        stripe
        style="width: 80%"
        border
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="id" label="编号" width="100"> </el-table-column>
        <el-table-column prop="name" label="职称名称" width="150">
        </el-table-column>
        <el-table-column prop="titleLevel" label="职称等级" width="150">
        </el-table-column>
        <el-table-column prop="createDate" label="创建日期" width="180">
        </el-table-column>
        <el-table-column prop="enabled" label="是否启用" width="100">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.enabled" type="success">已启用</el-tag>
            <el-tag v-else type="dander">未启用</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="showEditView(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 弹出框 -->
    <div>
      <el-dialog title="编辑职称" :visible.sync="dialogVisible" width="40%">
        <table>
          <tr>
            <td><el-tag>职称名称</el-tag></td>
            <td>
              <el-input
                v-model="updateJl.name"
                size="small"
                style="margin-left: 15px"
              ></el-input>
            </td>
          </tr>
          <br />
          <tr>
            <td><el-tag>职称等级</el-tag></td>
            <td>
              <el-select
                v-model="updateJl.titleLevel"
                clearable
                placeholder="请选择职称等级"
                size="small"
                style="margin-left: 15px"
              >
                <el-option
                  v-for="item in titleLevels"
                  :key="item"
                  :label="item"
                  :value="item"
                  clearable
                >
                </el-option>
              </el-select>
            </td>
          </tr>
          <br />
          <tr>
            <td><el-tag>是否启用</el-tag></td>
            <td>
              <el-switch
                v-model="updateJl.enabled"
                active-text="开启"
                inactive-text="关闭"
                style="margin-left: 15px"
              >
              </el-switch>
            </td>
          </tr>
        </table>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="doUpdate">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "jobMana",
  data() {
    return {
      jl: {
        name: "",
        titleLevel: "",
      },
      updateJl: {
        name: "",
        titleLevel: "",
        enabled: "",
      },
      titleLevels: ["正高级", "副高级", "中级", "初级", "员级"],
      jls: [],
      dialogVisible: false,
      multipleSelection: [],
    };
  },
  mounted() {
    this.initJls();
  },
  methods: {
    initJls() {
      this.getRequest("/sys/basic/JobLevelData").then((res) => {
        if (res) {
          this.jls = res;
          this.jl.name = "";
          this.jl.titleLevel = "";
        }
      });
    },
    // 添加
    addJobLevel() {
      if (this.jl.name && this.jl.titleLevel) {
        this.postRequest("/sys/basic/JobLevelData", this.jl).then((res) => {
          if (res) {
            this.initJls();
            this.$message.success("添加成功~");
          }
        });
      } else {
        this.$message.error("输入字段不能为空！");
      }
    },
    // 删除
    handleDelete(data) {
      this.$confirm(
        "此操作将永久删除[" + data.name + "]职称, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          this.delRequest("/sys/basic/JobLevelData", data.id).then((res) => {
            if (res) {
              // 这个地方的函数，你再思考一下
              this.initJls();
              console.log(res);
              this.$message({
                type: "success",
                message: "删除成功!",
              });
            }
          });
        })
        .catch((e) => {
          console.log(e);
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 编辑
    showEditView(data) {
      // 复制数据
      Object.assign(this.updateJl, data);
      this.updateJl.createDate = "";
      this.dialogVisible = true;
    },
    doUpdate() {
      this.putRequest("/sys/basic/JobLevelData", this.updateJl).then((res) => {
        if (res) {
          this.initJls();
          this.dialogVisible = false;
        }
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    deleteMore() {
      this.$confirm(
        "是否删除选中的[" + this.multipleSelection.length + "]条数据？",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          let ids = "?";
          this.multipleSelection.forEach((item) => {
            ids += "ids=" + item.id + "&";
          });

          this.delRequest("/sys/basic/JobLevelData" + ids).then((res) => {
            if (res) {
              this.initJls();
            }
          });
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
.addInput {
  margin-top: 20px;
}
.jobLevelTable {
  margin-top: 25px;
}
</style>