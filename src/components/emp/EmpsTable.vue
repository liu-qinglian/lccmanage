<template>
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
      <el-table-column prop="gender" label="性别" width="50"> </el-table-column>
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
      <el-table-column prop="department.position.name" label="职位" width="110">
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
</template>

<script>
export default {
  name: "empTable",
  data() {
    return {
      emps: [],

      importDisable: false,

      loading: false,
      total: 0,
      page: 1,
      size: 10,
      empName: "",
      ifShow: false,
      dialogFormVisible: false,
      title: "",
      //   tiptopDegree: [
      //     "博士",
      //     "硕士",
      //     "本科",
      //     "大专",
      //     "高中",
      //     "初中",
      //     "小学",
      //     "其他",
      //   ], //学历
      //   politicsStatus: [], // 政治面貌
      //   inputDepName: [], //所属部门
      //   positionName: [], //职位
      //   nations: [], // 民族
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
  },
};
</script>

<style>
</style>