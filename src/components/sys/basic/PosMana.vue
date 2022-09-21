<template>
  <div>
    <div>
      <!-- 操作区 -->
      <el-input
        placeholder="添加职位"
        class="addPosInput"
        size="small"
        suffix-icon="el-icon-circle-plus-outline"
        v-model="pos.name"
        @keydown.enter.native="addPositions"
      >
      </el-input>
      <el-button
        type="primary"
        plain
        suffix-icon="el-icon-plus"
        size="small"
        @click="addPositions"
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
    <!-- 表格 -->
    <div>
      <el-table
        :data="positions"
        stripe
        border
        style="width: 80%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="id" label="编号" width="100"> </el-table-column>
        <el-table-column prop="name" label="职位" width="180">
        </el-table-column>
        <el-table-column prop="createDate" label="创建时间"> </el-table-column>
        <!-- <el-table-column
      prop="enabled"
      label="是否启用">
    </el-table-column> -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="showEditView(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 编辑的对话框 -->
    <div>
      <el-dialog title="编辑职位" :visible.sync="dialogVisible" width="30%">
        <el-tag>职位名称</el-tag>
        <el-input
          v-model="updataPos.name"
          size="small"
          class="updataPosInput"
        ></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateEmit">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>


<script>
export default {
  name: "posMana",
  data() {
    return {
      pos: {
        name: "",
      },
      updataPos: {
        name: "",
      },
      positions: [],
      dialogVisible: false,
      multipleSelection: [],
    };
  },
  mounted() {
    this.initPositions();
  },
  methods: {
    // 添加职位信息
    addPositions() {
      // 如果输入不为空
      if (this.pos.name) {
        // 这里只能传一个对象this.pos  不能直接。name
        // console.log(this.pos);
        this.postRequest("/sys/basic/pos", this.pos).then((res) => {
          if (res) {
            // console.log(this.pos);
            this.initPositions();
            this.pos.name = "";
            this.$message.success("添加成功~");
          }
        });
      } else {
        this.$message.error("输入不能为空哦~");
      }
    },
    updateEmit() {
      this.putRequest("/sys/basic/posData", this.updataPos).then((res) => {
        if (res) {
          this.initPositions();
          this.dialogVisible = false;
        }
      });
    },
    showEditView(index, data) {
      // this.updataPos=data;
      // 数据拷贝
      Object.assign(this.updataPos, data);
      this.updataPos.createDate = "";
      this.dialogVisible = true;
    },

    // 删除数据
    handleDelete(index, data) {
      // console.log(data);
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
          this.delRequest("/sys/basic/posData", data.id).then((res) => {
            if (res) {
              // 这个地方的函数，你再思考一下
              this.initPositions();
              console.log(res);
              this.positions = res;
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
    // 格式化表格数据
    initPositions() {
      this.getRequest("/sys/basic/posData").then((res) => {
        if (res) {
          this.positions = res;
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

          this.delRequest("/sys/basic/posData" + ids).then((res) => {
            if (res) {
              this.initPositions();
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
.addPosInput {
  width: 250px;
  margin: 20px 15px;
}
.updataPosInput {
  width: 250px;
  margin-left: 20px;
}
</style>