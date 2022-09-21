<template>
  <div>
    <el-card class="box-card" style="width: 35%">
      <div slot="header" class="clearfix">
        <span>{{ admin.name }}</span>
      </div>
      <div class="infos">
        <div class="avatar">
          <el-upload
            class="upload-demo"
            action="/"
            :headers="headers"
            :data="admin"
            :show-file-list="false"
            :on-success="onSuccess"
          >
            <img
              title="点击修改用户头像"
              src="admin.userFace"
              alt="点击头像进行上传"
            />
          </el-upload>
        </div>
        <div>
          电话号码：
          <el-tag>{{ admin.phone }}</el-tag>
        </div>
        <div>
          居住地址：
          <el-tag>{{ admin.address }}</el-tag>
        </div>
        <div>
          用户标签：
          <el-tag type="success" v-for="(r, index) in admin.roles" :key="index">
            {{ r.nameZh }}
          </el-tag>
        </div>
        <div class="operations">
          <el-button size="small" type="primary" @click="showAdminInfoView"
            >修改信息</el-button
          >
          <el-button size="small" type="danger" @click="showPasswordInfo"
            >修改密码</el-button
          >
        </div>
      </div>
      <!-- 修改信息弹窗 -->
      <div>
        <el-dialog
          title="编辑用户信息"
          :visible.sync="dialogVisible"
          width="30%"
        >
          <div>
            <table>
              <tr>
                <td>用户昵称：</td>
                <td><el-input v-model="admin2.name"></el-input></td>
              </tr>
              <tr>
                <td>电话号码：</td>
                <td><el-input v-model="admin2.phone"></el-input></td>
              </tr>
              <tr>
                <td>居住地址：</td>
                <td><el-input v-model="admin2.address"></el-input></td>
              </tr>
              <!-- <tr>
                <td>用户标签：</td>
                <td><el-input v-model="admin2.roles"></el-input></td>
              </tr> -->
            </table>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="updateAdmin">确 定</el-button>
          </span>
        </el-dialog>
      </div>
      <!-- 修改密码弹窗 -->
      <div>
        <el-dialog
          title="更新密码"
          :visible.sync="passwordDialogVisible"
          width="30%"
        >
          <div>
            <el-form
              :model="ruleForm"
              status-icon
              :rules="rules"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="旧密码" prop="oldPass">
                <el-input
                  type="password"
                  v-model="ruleForm.oldPass"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="pass">
                <el-input
                  type="password"
                  v-model="ruleForm.pass"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="checkPass">
                <el-input
                  type="password"
                  v-model="ruleForm.checkPass"
                  autocomplete="off"
                ></el-input>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')"
                  >提交</el-button
                >
                <el-button @click="resetForm('ruleForm')">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-dialog>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "adminInfo",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      headers: {
        Authorization: window.sessionStorage.getItem("tokenStr"),
      },
      admin: {
        name: "",
        phone: "",
        address: "",
        roles: [],
      },
      admin2: {
        name: "",
        phone: "",
        address: "",
      },
      dialogVisible: false,
      passwordDialogVisible: false,

      ruleForm: {
        oldPass: "",
        pass: "",
        checkPass: "",
      },
      rules: {
        oldPass: [{ validator: validatePass, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  mounted() {
    this.initAdmin();
  },
  methods: {
    initAdmin() {
      this.getRequest("/adminInfo").then((res) => {
        if (res) {
          this.admin = res;
          //   console.log(this.admin);
          this.admin2 = Object.assign({}, this.admin);
          //   console.log(this.admin2);
          window.sessionStorage.setItem("user", JSON.stringify(res));
          this.$store.commit("INIT_ADMIN", res);
        }
      });
    },
    onSuccess() {
      this.initAdmin();
    },
    showAdminInfoView() {
      this.dialogVisible = true;
    },
    showPasswordInfo() {
      this.passwordDialogVisible = true;
    },
    updateAdmin() {
      this.putRequest("/adminInfo", this.admin2).then((res) => {
        if (res) {
          this.dialogVisible = false;
          this.initAdmin();
        }
      });
    },
    updatePassword() {},

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
          this.ruleForm.adminId = this.admin.id;
          this.putRequest("/login", this.ruleForm).then((res) => {
            if (res) {
              //退出登录
              this.postRequest("/logout");
              //   移除sessionStorage里面的登录信息
              window.sessionStorage.removeItem("user");
              window.sessionStorage.removeItem("tokenStr");
              // 菜单初始化 给一个空数组
              this.$store.commit("initRoutes", []);
              //   跳转到登录界面
              this.$router.replace("/");
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style>
.avatar img {
  width: 80px;
  height: 80px;
  border-radius: 30px;
}
.operations {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}
.infos > div {
  margin-bottom: 10px;
}
</style>