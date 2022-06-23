<template>
  <div class="register">
    <h3>
      注册新用户
      <span class="go"
        >我有账号，去 <a @click="goLogin" href="javascript:;">登陆</a>
      </span>
    </h3>

    <div class="content">
      <label>手机号:</label>
      <input v-model="phone" type="text" placeholder="请输入你的手机号" />
    </div>

    <div class="content">
      <label>验证码:</label>
      <input v-model="serveCode" type="text" placeholder="请输入验证码" />
      <button @click="sendCode">点我发送验证码</button>
    </div>

    <div class="content">
      <label>登录密码:</label>
      <input v-model="password" type="text" placeholder="请输入你的登录密码" />
    </div>

    <div class="content">
      <label>确认密码:</label>
      <input
        v-model.lazy="insurePassword"
        type="text"
        placeholder="请输入确认密码"
      />
    </div>

    <div class="controls">
      <input v-model="checkIt" name="m1" type="checkbox" />
      <span>同意协议并注册《尚品汇用户协议》</span>
    </div>

    <div class="btn">
      <button @click="createAccount">完成注册</button>
    </div>
  </div>
</template>

<script>
import { reqCreateAccount } from "../../api";

import { mapState } from "vuex";
export default {
  name: "BaseRegister",
  data() {
    return {
      phone: "",
      password: "",
      insurePassword: "",
      checkIt: true,
    };
  },
  computed: {
    ...mapState("registerOptions", ["serveCode"]),
  },
  methods: {
    // 前往登录页面
    goLogin() {
      this.$router.push({
        path: "/login",
      });
    },
    // 完成注册请求
    createAccount() {
      let userData = {
        phone: this.phone,
        password: this.password,
        code: this.serveCode,
      };

      // 注册post请求
      reqCreateAccount(userData).then(
        //! 请求发送成功
        (res) => {
          // 成功注册则跳转
          if (res.code == 200) {
            alert("注册成功");
            this.$router.replace({
              path: "/login",
            });
          } else {
            alert(res.message);
          }
        },
        //! 请求发送失败
        (err) => {
          alert(err);
        }
      );
    },

    // 发请求：得到验证码
    sendCode() {
      this.$store.dispatch("registerOptions/GetSendCode", this.phone);
    },
  },
};
</script>

<style lang="less" scoped>
.register {
  width: 1200px;
  height: 445px;
  border: 1px solid rgb(223, 223, 223);
  margin: 0 auto;

  h3 {
    background: #ececec;
    margin: 0;
    padding: 6px 15px;
    color: #333;
    border-bottom: 1px solid #dfdfdf;
    font-size: 20.04px;
    line-height: 30.06px;

    span {
      font-size: 14px;
      float: right;

      a {
        color: #e1251b;
      }
    }
  }

  div:nth-of-type(1) {
    margin-top: 40px;
  }

  .content {
    padding-left: 390px;
    margin-bottom: 18px;
    position: relative;

    label {
      font-size: 14px;
      width: 96px;
      text-align: right;
      display: inline-block;
    }

    input {
      width: 270px;
      height: 38px;
      padding-left: 8px;
      box-sizing: border-box;
      margin-left: 5px;
      outline: none;
      border: 1px solid #999;
    }

    img {
      vertical-align: sub;
    }

    .error-msg {
      position: absolute;
      top: 100%;
      left: 495px;
      color: red;
    }
  }

  .controls {
    text-align: center;
    position: relative;

    input {
      vertical-align: middle;
    }

    .error-msg {
      position: absolute;
      top: 100%;
      left: 495px;
      color: red;
    }
  }

  .btn {
    text-align: center;
    line-height: 36px;
    margin: 17px 0 0 55px;

    button {
      outline: none;
      width: 270px;
      height: 36px;
      background: #e1251b;
      color: #fff !important;
      display: inline-block;
      font-size: 16px;
    }
  }
}
</style>
