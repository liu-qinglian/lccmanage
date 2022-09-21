<template>
  <div>
    <!-- 头部 -->
    <div class="empHeadContain">
      <div>
        <!--  如果使用接口就可以直接查询 @keydown.enter.native="initEmps" -->
        <el-input
          style="width: 300px; margin-right: 10px"
          prefix-icon="el-icon-search"
          v-model="empName"
          @keydown.enter.native="empsSearch"
          clearable
          @clear="initEmps"
          placeholder="请输入员工名进行搜索..."
        ></el-input>
        <el-button type="primary" icon="el-icon-search" @click="empsSearch"
          >搜索</el-button
        >
        <el-button type="primary" v-if="topSearch">
          <i class="fa fa-angle-double-down" aria-hidden="true"></i>高级搜索
        </el-button>
      </div>
      <div>
        <el-upload
          style="display: inline-flex; margin-right: 10px"
          class="upload-demo"
          :show-file-list="false"
          :before-upload="beforeUpload"
          :on-success="onSuccess"
          :on-error="onError"
          :disabled="importDisable"
          action="https://jsonplaceholder.typicode.com/posts/"
          :headers="headers"
        >
          <!--后端接口 action="https://jsonplaceholder.typicode.com/posts/" -->
          <!-- headers 设置请求头 -->
          <el-button
            type="success"
            :disabled="importDisable"
            :icon="importIcon"
          >
            {{ importText }}
          </el-button>
        </el-upload>
        <el-button
          type="success"
          icon="el-icon- download"
          @click="downloadEmpsData"
        >
          导出数据
        </el-button>
        <el-button type="primary" icon="el-icon-plus" @click="showAddEmpsView"
          >添加员工</el-button
        >
      </div>
    </div>
    <!-- 插槽 -->
    <!-- <slot name="footer"></slot> -->
    <!-- 主要内容 -->
    <!-- <empTable /> -->
    <div class="empMainContain">
      <div v-if="ifShow" class="notFindMessage">没有您要找的这个人哦！</div>
      <el-table
        :data="emps"
        border
        stripe
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0,0，0，0.8)"
        style="width: 100%"
      >
        <el-table-column type="selection" width="55"> </el-table-column>

        <el-table-column prop="name" label="姓名" width="80" fixed="left">
        </el-table-column>
        <el-table-column prop="workID" label="工号" width="110">
        </el-table-column>
        <el-table-column prop="gender" label="性别" width="50">
        </el-table-column>
        <el-table-column prop="birthday" label="生日" width="130">
        </el-table-column>
        <el-table-column prop="idCard" label="身份证号码" width="180">
        </el-table-column>
        <el-table-column prop="wedlock" label="婚姻状况"> </el-table-column>
        <el-table-column prop="nation.name" label="民族"> </el-table-column>
        <el-table-column prop="nativePlace" label="籍贯"> </el-table-column>
        <el-table-column prop="politicsStatus.name" label="政治面貌">
        </el-table-column>
        <el-table-column prop="email" label="电子邮件" width="170">
        </el-table-column>
        <el-table-column prop="phone" label="电话号码" width="120">
        </el-table-column>
        <el-table-column prop="address" label="通讯地址" width="250">
        </el-table-column>
        <el-table-column prop="department.name" label="所属部门">
        </el-table-column>
        <el-table-column
          prop="department.position.name"
          label="职位"
          width="110"
        >
        </el-table-column>
        <el-table-column prop="engageForm" label="聘用形式"> </el-table-column>
        <el-table-column prop="tiptopDegree" label="学历"> </el-table-column>
        <el-table-column prop="school" label="毕业学校" width="140">
        </el-table-column>
        <el-table-column prop="specialty" label="专业" width="90">
        </el-table-column>
        <el-table-column prop="workState" label="在职状态"> </el-table-column>
        <el-table-column prop="beginDate" label="入职日期" width="110">
        </el-table-column>
        <el-table-column prop="conversionTime" label="转正日期" width="110">
        </el-table-column>
        <el-table-column prop="endContract" label="合同截止日期" width="110">
        </el-table-column>
        <!-- 操作 -->
        <el-table-column label="操作" fixed="right" width="125">
          <template slot-scope="scope">
            <el-button
              @click="showEditEmpView(scope.row)"
              size="mini"
              style="padding: 5px 8px"
              >编辑</el-button
            >
            <!-- <el-button size="mini" style="padding: 5px 8px" type="primary"
              >高级资料</el-button
            > -->
            <el-button
              @click="deleteEmp(scope.row)"
              size="mini"
              style="padding: 5px 8px"
              type="danger"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <!-- -->
      <div class="empPagination">
        <el-pagination
          background
          @current-change="currentChange"
          @size-change="sizeChange"
          layout="sizes,prev, pager, next, jumper, ->, total"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
    <!--  -->
    <!-- 添加员工弹出框 -->
    <div class="dialogContain">
      <el-dialog :title="title" :visible.sync="dialogFormVisible" width="80%">
        <el-form ref="empForm" :model="emp" :rules="rules">
          <!-- 第一行 -->
          <div class="messageTitle">个人信息</div>
          <el-row :gutter="20" class="dialogRow">
            <el-col :span="6">
              <el-form-item label="姓名:" prop="name">
                <el-input
                  v-model="emp.name"
                  size="small"
                  style="width: 120px"
                  prefix-icon="el-icon-edit"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="性别:" prop="gender">
                <el-radio-group v-model="emp.gender">
                  <el-radio label="1">男</el-radio>
                  <el-radio label="2">女</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="出生日期:" prop="birthday">
                <!-- prop可读不可写-->
                <el-date-picker
                  v-model="emp.birthday"
                  type="date"
                  size="small"
                  style="width: 130px"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="政治面貌" prop="politicsStatus">
                <el-select
                  v-model="emp.politicsStatus.name"
                  placeholder="选择面貌"
                  style="width: 120px"
                  size="small"
                >
                  <el-option
                    v-for="item in politicsStatus"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 第二行 -->
          <el-row :gutter="20" class="dialogRow">
            <el-col :span="6">
              <el-form-item label="婚姻状况:" prop="wedlock">
                <el-radio-group v-model="emp.wedlock" size="small">
                  <el-radio label="1">已婚</el-radio>
                  <el-radio label="2">未婚</el-radio>
                </el-radio-group>
              </el-form-item></el-col
            >
            <el-col :span="6">
              <el-form-item label="籍贯:" prop="nativePlace">
                <el-input
                  v-model="emp.nativePlace"
                  size="small"
                  style="width: 120px"
                  prefix-icon="el-icon-edit"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="邮箱:" prop="email">
                <el-input
                  v-model="emp.email"
                  size="small"
                  style="width: 180px"
                  prefix-icon="el-icon-edit"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="电话:" prop="phone">
                <el-input
                  v-model="emp.phone"
                  size="small"
                  style="width: 140px"
                  prefix-icon="el-icon-edit"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 第三行 -->
          <el-row :gutter="20" class="dialogRow">
            <el-col :span="6">
              <el-form-item label="民族:" prop="nations">
                <el-select
                  v-model="emp.nation.name"
                  placeholder="选择民族"
                  style="width: 120px"
                  size="small"
                >
                  <el-option
                    v-for="item in nations"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="通讯地址" prop="address">
                <el-input
                  v-model="emp.address"
                  size="small"
                  style="width: 350px"
                  prefix-icon="el-icon-edit"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="身份证号码" prop="idCard">
                <el-input
                  v-model="emp.idCard"
                  size="small"
                  style="width: 200px"
                  prefix-icon="el-icon-edit"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 第四行 -->
          <el-row :gutter="20" class="dialogRow">
            <el-col :span="6">
              <el-form-item label="学历" prop="tiptopDegree">
                <el-select
                  v-model="emp.tiptopDegree"
                  placeholder="选择学历"
                  style="width: 120px"
                  size="small"
                >
                  <el-option
                    v-for="item in tiptopDegree"
                    :key="item"
                    :label="item"
                    :value="item"
                  >
                  </el-option>
                </el-select> </el-form-item
            ></el-col>
            <el-col :span="6">
              <el-form-item label="毕业学校" prop="school">
                <el-input
                  v-model="emp.school"
                  size="small"
                  style="width: 180px"
                  prefix-icon="el-icon-edit"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 第五行 -->
          <div class="messageTitle">入职信息</div>
          <el-row :gutter="20" class="dialogRow">
            <el-col :span="6">
              <el-form-item label="工号:" prop="workID">
                <el-input
                  disabled
                  v-model="emp.workID"
                  size="small"
                  style="width: 120px"
                  prefix-icon="el-icon-edit"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="入职日期:" prop="beginDate">
                <el-date-picker
                  v-model="emp.beginDate"
                  type="date"
                  size="small"
                  style="width: 130px"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="合同终止日期:" prop="endContract">
                <el-date-picker
                  v-model="emp.endContract"
                  type="date"
                  size="small"
                  style="width: 130px"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 第六行 -->
          <el-row :gutter="20" class="dialogRow">
            <el-col :span="6">
              <el-form-item label="转正日期" prop="conversionTime">
                <el-date-picker
                  v-model="emp.conversionTime"
                  type="date"
                  size="small"
                  style="width: 130px"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="所属部门:" prop="departmentName">
                <el-select
                  v-model="emp.department.name"
                  placeholder="选择部门"
                  style="width: 120px"
                  size="small"
                >
                  <el-option
                    v-for="item in inputDepName"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="职位" prop="positionName">
                <el-select
                  v-model="emp.department.position.name"
                  placeholder="选择职位"
                  style="width: 120px"
                  size="small"
                >
                  <el-option
                    v-for="item in positionName"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="doAddEmp">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "empBasic",
  // components: { empTable },
  props: ["topSearch"],
  data() {
    return {
      emps: [],
      importText: "导入数据",
      importIcon: "el-icon-upload2",
      importDisable: false,
      // topSearch: false,
      headers: {
        Authorization: window.sessionStorage.getItem("tokenStr"),
      },
      loading: false,
      total: 0,
      page: 1,
      size: 10,
      empName: "",
      ifShow: false,
      dialogFormVisible: false,
      title: "",
      tiptopDegree: [
        "博士",
        "硕士",
        "本科",
        "大专",
        "高中",
        "初中",
        "小学",
        "其他",
      ], //学历
      politicsStatus: [], // 政治面貌
      inputDepName: [], //所属部门
      positionName: [], //职位
      nations: [], // 民族
      emp: {
        id: null,
        name: "", //姓名
        gender: "", //性别
        birthday: "", //生日
        wedlock: "", //婚姻状况
        nativePlace: "", //籍贯
        email: "", //邮箱
        idCard: "", //身份证
        phone: "", //电话
        address: "", //通讯地址
        engageForm: "",
        tiptopDegree: "", //学历
        specialty: "",
        school: "", //毕业学校
        beginDate: "", //入职日期
        workState: "",
        workID: "", //工号
        contractTerm: "",
        conversionTime: "", //转正日期
        beginContract: "",
        endContract: "", // 合同终止日期
        nation: {
          name: "",
        },
        politicsStatus: {
          name: "", //政治面貌
        },

        department: {
          name: "", //所属部门
          position: {
            name: "", //职位
          },
          salary: null,
        },
      },

      rules: {
        name: [{ required: true, message: "请输入员工姓名", trigger: "blur" }],
        gender: [
          { required: true, message: "请输入员工性别", trigger: "blur" },
        ],
        birthday: [
          { required: true, message: "请输入员工生日", trigger: "blur" },
        ],
        wedlock: [
          { required: true, message: "请输入员工婚姻状况", trigger: "blur" },
        ],
        nativePlace: [
          { required: true, message: "请输入员工籍贯", trigger: "blur" },
        ],
        email: [
          { required: true, message: "请输入员工邮箱", trigger: "blur" },
          { type: "email", message: "邮箱格式不正确", trigger: "blur" },
        ],
        idCard: [
          { required: true, message: "请输入员工身份证", trigger: "blur" },
          {
            pattern:
              /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[0-2])(([0-2][1-9])|10|20|30|31)\d{3}(\d|X|x)$/,
            message: "身份证号码格式不正确",
            trigger: "blur",
          },
        ],
        phone: [
          { required: true, message: "请输入员工电话", trigger: "blur" },
          {
            pattern:
              /^(0|86|17951)?(13[0-9]|15[012356789]|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
            message: "手机号码格式不正确",
            trigger: "blur",
          },
        ],
        address: [
          { required: true, message: "请输入员工通讯地址", trigger: "blur" },
        ],
        tiptopDegree: [
          { required: true, message: "请输入员工学历", trigger: "blur" },
        ],
        school: [
          { required: true, message: "请输入员工毕业学校", trigger: "blur" },
        ],
        beginDate: [
          { required: true, message: "请输入员工入职日期", trigger: "blur" },
        ],
        conversionTime: [
          { required: true, message: "请输入员工转正日期", trigger: "blur" },
        ],
        endContract: [
          {
            required: true,
            message: "请输入员工合同终止日期",
            trigger: "blur",
          },
        ],
        politicsStatus: [
          { required: true, message: "请输入政治面貌", trigger: "blur" },
        ],
        // nations: [{ required: true, message: "请输入民族", trigger: "blur" }],
        // departmentName: [
        //   { required: true, message: "请输入员工部门", trigger: "blur" },
        // ],
        // positionName: [
        //   { required: true, message: "请输入员工职位", trigger: "blur" },
        // ],
      },
    };
  },
  mounted() {
    this.initEmps();
    this.initData();
  },
  methods: {
    initData() {
      if (!window.sessionStorage.getItem("nations")) {
        // console.log("111");
        this.getRequest("/emp/nationsData").then((res) => {
          if (res) {
            this.nations = res;
            window.sessionStorage.setItem("nations", JSON.stringify(res));
          }
        });
      } else {
        this.nations = JSON.parse(window.sessionStorage.getItem("nations"));
      }

      if (!window.sessionStorage.getItem("positionName")) {
        this.getRequest("/emp/positionNameData").then((res) => {
          if (res) {
            this.positionName = res;
            window.sessionStorage.setItem("positionName", JSON.stringify(res));
          }
        });
      } else {
        this.positionName = JSON.parse(
          window.sessionStorage.getItem("positionName")
        );
      }

      // if (!window.sessionStorage.getItem("departmentName")) {
      //   this.getRequest("/emp/departmentNameData").then((res) => {
      //     if (res) {
      //       this.departmentName = res;
      //       window.sessionStorage.setItem(
      //         "departmentName",
      //         JSON.stringify(res)
      //       );
      //     }
      //   });
      // } else {
      //   this.departmentName = JSON.parse(
      //     window.sessionStorage.getItem("departmentName")
      //   );
      // }

      if (!window.sessionStorage.getItem("politicsStatus")) {
        this.getRequest("/emp/politicsStatusData").then((res) => {
          if (res) {
            this.emp.politicsStatus = res;
            window.sessionStorage.setItem(
              "politicsStatus",
              JSON.stringify(res)
            );
          }
        });
      } else {
        this.politicsStatus = JSON.parse(
          window.sessionStorage.getItem("politicsStatus")
        );
        // console.log("222");
      }
    },
    initWorkID() {
      this.getRequest("/emp/workID").then((res) => {
        if (res) {
          this.emp.workID = res.id;
        }
      });
    },
    initEmps() {
      this.loading = true;
      // 这里传参实现分页效果
      // this.getRequest( '/emp/empBasicData/?currentPage' + this.currentPage + '&size='+this.size+'&name='+this.empName).then((res) => {
      this.getRequest("/emp/empBasicData").then((res) => {
        if (res) {
          this.emps = res.data;
          this.loading = false;
          this.total = res.total;
          this.currentPage = res.currentPage;
          this.size = res.size;
          this.ifShow = false;
        }
      });
    },

    currentChange(currentPage) {
      this.currentPage = currentPage;
      // console.log(this.currentPage);

      // this.initEmps();
    },
    sizeChange(size) {
      this.size = size;
      console.log(this.size);
      // this.initEmps();
    },
    // 搜索
    empsSearch() {
      if (this.empName) {
        // 自己定义方法
        let newEmps = [];
        for (let i = 0; i < this.emps.length; i++) {
          if (this.emps[i].name.indexOf(this.empName) !== -1) {
            newEmps.push(this.emps[i]);
          }
        }
        this.emps = newEmps;
        if (this.emps.length == 0) {
          this.ifShow = true;
        }
      } else {
        this.$message.error("输入不能为空！");
        this.ifShow = false;
        // this.initEmps();
      }
    },

    showAddEmpsView() {
      this.title = "添加员工";
      this.dialogFormVisible = true;
      this.initWorkID();
      // 如果点击编辑员工，emp里面的数据就是该员工的，要先清空
      this.emp = {
        id: null,
        name: "",
        gender: "",
        birthday: "",
        wedlock: "",
        nativePlace: "",
        email: "",
        idCard: "",
        phone: "",
        address: "",
        engageForm: "",
        tiptopDegree: "",
        specialty: "",
        school: "",
        beginDate: "",
        workState: "",
        workID: "",
        contractTerm: "",
        conversionTime: "",
        beginContract: "",
        endContract: "",
        nation: {
          name: "",
        },
        politicsStatus: {
          name: "",
        },

        department: {
          name: "",
          position: {
            name: "",
          },
          salary: null,
        },
      };
      // console.log(this.emp);
      this.inputDepName = "";
    },
    // 删除
    deleteEmp(data) {
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
          this.delRequest("/emp/empBasicData/" + data.id).then((res) => {
            if (res) {
              this.initAdmins();
              this.$message({
                type: "success",
                message: "删除成功!",
              });
            }
          });
        })
        .catch((e) => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 编辑
    showEditEmpView(data) {
      // console.log(data);
      this.title = "编辑员工信息";
      this.dialogFormVisible = true;
      this.inputDepName = data.department.name;
      // 展示要编辑的员工信息
      this.emp = data;
    },

    doAddEmp() {
      // 操作修改员工
      if (this.emp.id) {
        this.$refs["empForm"].validate((valid) => {
          if (valid) {
            this.putRequest("/emp/empBasicData", this.emp).then((res) => {
              if (res) {
                this.dialogFormVisible = false;
                this.initEmps();
                this.$message.success("修改员工成功！");
              }
            });
          }
        });
      } else {
        // 操作添加员工
        this.$refs["empForm"].validate((valid) => {
          if (valid) {
            this.postRequest("/emp/empBasicData", this.emp).then((res) => {
              if (res) {
                this.dialogFormVisible = false;
                this.initEmps();
                this.$message.success("添加员工成功！");
              }
            });
          }
        });
      }
    },

    // npm install js-file-download
    // 导出数据
    downloadEmpsData() {
      this.downloadRequest("");
    },

    beforeUpload() {
      this.importIcon = "el-icon-loading";
      this.importText = "正在导入";
      this.importDisable = true;
    },
    onSuccess() {
      this.importIcon = "el-icon-upload2";
      this.importText = "导入数据";
      // 带入成功要插入数据
      this.initEmps();
      this.importDisable = false;
    },
    onError() {
      this.importIcon = "el-icon-upload2";
      this.importText = "导入数据";
      this.importDisable = false;
    },
  },
};
</script>

<style scoped>
.empHeadContain {
  display: flex;
  justify-content: space-between;
  margin-top: 25px;
}
.fa {
  margin-right: 8px;
}
.empMainContain {
  margin-top: 30px;
}
.empPagination {
  display: flex;
  justify-content: center;
}
.messageTitle {
  font-size: 16px;
  font-weight: bold;
  margin: 8px 0;
}
.dialogRow {
  padding-left: 30px;
}
</style>