<template>
  <div>
    <empBasic :topSearch="topSearch">
      <div slot="footer">
        <el-form ref="empForm" :model="emp">
          <!-- 第一行 -->
          <el-row class="dialogRow">
            <el-col :span="3">
              <el-form-item label="性别:" prop="gender">
                <el-radio-group v-model="emp.gender">
                  <el-radio label="1">男</el-radio>
                  <el-radio label="2" style="margin-left: -8px">女</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>

            <el-col :span="4">
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
            <el-col :span="4">
              <el-form-item label="籍贯:" prop="nativePlace">
                <el-input
                  v-model="emp.nativePlace"
                  size="small"
                  style="width: 120px"
                  prefix-icon="el-icon-edit"
                ></el-input>
              </el-form-item>
            </el-col>

            <!-- 第二行 -->
            <el-col :span="4">
              <el-form-item label="电话:" prop="phone">
                <el-input
                  v-model="emp.phone"
                  size="small"
                  style="width: 140px"
                  prefix-icon="el-icon-edit"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="毕业学校" prop="school">
                <el-input
                  v-model="emp.school"
                  size="small"
                  style="width: 150px"
                  prefix-icon="el-icon-edit"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
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
      </div>
    </empBasic>
  </div>
</template>

<script>
import empBasic from "./EmpBasic.vue";
export default {
  components: { empBasic },
  name: "empAdv",
  data() {
    return {
      topSearch: false,
      empName: "",
      searchValue: {
        name: "", //姓名
        gender: "", //性别
        nativePlace: "", //籍贯
        phone: "", //电话
        school: "", //毕业学校
        politicsStatus: "", //政治面貌
        nampositionNamee: "", //职位
      },

      politicsStatus: [], // 政治面貌
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
        tiptopDegree: "", //学历
        school: "", //毕业学校
        beginDate: "", //入职日期
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

      // rules: {
      //   gender: [
      //     { required: true, message: "请输入员工性别", trigger: "blur" },
      //   ],

      //   nativePlace: [
      //     { required: true, message: "请输入员工籍贯", trigger: "blur" },
      //   ],

      //   phone: [{ required: true, message: "请输入员工电话", trigger: "blur" }],

      //   school: [
      //     { required: true, message: "请输入员工毕业学校", trigger: "blur" },
      //   ],
      //   // beginDate: [
      //   //   { required: true, message: "请输入员工入职日期", trigger: "blur" },
      //   // ],
      //   // conversionTime: [
      //   //   { required: true, message: "请输入员工转正日期", trigger: "blur" },
      //   // ],
      //   politicsStatus: [
      //     { required: true, message: "请输入政治面貌", trigger: "blur" },
      //   ],
      //   positionName: [
      //     { required: true, message: "请输入员工职位", trigger: "blur" },
      //   ],
      // },
    };
  },
  mounted() {
    this.topSearch = true;
  },
};
</script>

<style scoped>
.dialogRow {
  margin-top: 30px;
  margin-bottom: -10px;
}
</style>