<template>
  <div class="login">
    <el-form
      :rules="rules"
      v-loading="loading"
      element-loading-text="拼命登录中.."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      ref="loginForm"
      :model="loginForm"
      class="loginContainer"
    >
      <h3 class="loginTitle">系统登录</h3>
      <el-form-item prop="username">
        <el-input
          type="text"
          autocomplete="false"
          v-model="loginForm.username"
          placeholder="请输入用户名："
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          auto-complete="false"
          v-model="loginForm.password"
          placeholder="请输入密码："
        ></el-input>
      </el-form-item>
      <el-form-item prop="code" class="verification">
        <el-input
          type="text"
          auto-complete="false"
          v-model="loginForm.code"
          placeholder="点击图片更换验证码"
          style="width: 260px; margin-right: 20px"
        ></el-input>
        <!-- <img :src="captchUrl" alt="" @click="updataCaptcha" /> </el-form-item
      >  -->
        <!-- <img :src="captchUrl" alt="" /> -->
        <div @click="updataCaptcha" class="verification_code" ref="ver_code">
          {{ captchUrl }}
        </div>
      </el-form-item>
      <el-checkbox v-model="checked" class="loginRemember">记住我</el-checkbox>
      <el-button type="primary" style="width: 100%" @click="submitCommit"
        >登录</el-button
      >
      <!-- <el-button type="primary" style="width: 100%">登录</el-button> -->
    </el-form>
  </div>
</template>

<script>
// import axios from "axios";
import { getRequest } from "../utils/api";
export default {
  name: "login",
  data() {
    return {
      // 加参数 确认验证码可以刷新
      //   captchUrl: "/captcha?time=" + new Data(),
      captchUrl: "",
      inputCode: "",
      loginForm: {
        username: "",
        password: "",
        code: "",
      },
      checked: true,
      loading: false,
      rules: {
        username: [
          { required: true, message: "请输入用户名！", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码！", trigger: "blur" },
        ],
        code: [{ required: true, message: "请输入验证码！", trigger: "blur" }],
      },
    };
  },
  methods: {
    updataCaptcha() {
      let _this = this;
      this.axios.get("/vertical").then(function (res) {
        // res.data 是服务器返回的数据
        // console.log("res", res);
        var result = res.num;
        _this.captchUrl = result;
      });

      //   console.log(res.data.data);
    },
    submitCommit() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          //   alert("submit!");
          this.loading = true;
          getRequest("/login", this.loginForm).then((res) => {
            // alert(JSON.stringify(res));
            var _username = res.username;
            const _password = res.password;
            if (
              this.loginForm.username != _username ||
              this.loginForm.password != _password
            ) {
              this.$message.error("账号或密码有误");
            } else if (this.loginForm.code != this.captchUrl) {
              this.$message.error("验证码输入有误");
              //   this.$refs.ver_code.clicked == "ture"
              //     ? this.updataCaptcha()
              //     : alert("点击图片更换验证码!!");
              this.updataCaptcha();
            } else {
              //   alert("success!!");
              //   存储用户token
              //   if (resp) {
              //     const tokenStr = resp.obj.tokenHead + resp.obj.token;
              //     window.sessionStorage.setItem("tokenStr", tokenStr);
              //   }
              const tokenStr = res.token;
              window.sessionStorage.setItem("tokenStr", tokenStr);
              this.loading = false;
              this.$message.success("登录成功！");

              // 页面跳转  如果用户手动输入地址就查看是否为登录页，不是就强制先登录
              let path = this.$route.query.redirect;
              this.$router.replace(
                path == "/" || path == undefined ? "home" : path
              );
            }
          });
        } else {
          this.$message.error("请输入对应信息");
          return false;
        }
      });
    },
  },
};
</script>

<style>
.loginContainer {
  width: 400px;
  border-radius: 15px;
  background-clip: padding-box;
  margin: 250px auto;
  padding: 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.loginTitle {
  margin: 10px auto 30px;
  text-align: center;
}

.loginRemember {
  text-align: left;
  margin-bottom: 15px;
}
.verification_code {
  width: 100px;
  height: 50px;
  text-align: center;
  font-size: 26px;
  line-height: 50px;
  background: rgb(207, 236, 240);
}
/* .bbb {
  display: block;
} */
.verification > div {
  display: flex;
  /* flex-direction: row; */
}
</style>