<template>
  <div class="login-wrap">
    <div class="login">
      <div class="loginform">
        <ul class="tab clearFix">
          <li>
            <a href="##" style="border-right: 0">扫描登录</a>
          </li>
          <li>
            <a href="##" class="current">账户登录</a>
          </li>
        </ul>
        <!-- 登录区域 start -->
        <div class="content">
          <form>
            <div class="input-text clearFix">
              <i></i>
              <input v-model="phone" type="text" placeholder="手机号" />
              <span>13700000000</span>
            </div>

            <div class="input-text clearFix">
              <i class="pwd"></i>
              <input v-model="password" type="text" placeholder="请输入密码" />
              <span>111111</span>
            </div>

            <div class="setting clearFix">
              <label class="checkbox inline">
                <input name="m1" type="checkbox" v-model="isAutoLogin" />
                自动登录
              </label>
              <span class="forget">忘记密码？</span>
            </div>
            <button @click="goLogin" class="btn">登&nbsp;&nbsp;录</button>
          </form>
          <div class="call clearFix">
            <ul>
              <li><img src="./images/qq.png" alt="" /></li>
              <li><img src="./images/sina.png" alt="" /></li>
              <li><img src="./images/ali.png" alt="" /></li>
              <li><img src="./images/weixin.png" alt="" /></li>
            </ul>
            <a @click="goRegister" href="javascript:;" class="register"
              >立即注册</a
            >
          </div>
        </div>
        <!-- 登录区域 end -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "BaseLogin",
  data() {
    return {
      password: "",
      phone: "",
      isAutoLogin: false,
    };
  },
  computed: {
    ...mapState("loginOptions", ["isLogin"]),
  },
  methods: {
    // 登录按钮
    goLogin(e) {
      // 停止表单默认提交行为
      e.preventDefault();
      // 包装用户账号密码
      let { password, phone, isAutoLogin } = this;
      // 发送登录请求请求
      this.$store
        .dispatch("loginOptions/GetLogin", { password, phone, isAutoLogin })
        .then((res) => {
          this.$message("登录成功");
          this.$router.replace("/home");
        },err=>{
          this.$message("账号密码错误");
        });
    },
    // 立即注册
    goRegister() {
      this.$router.push({
        path: "/register",
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login-wrap {
  height: 487px;
  background-color: #e93854;
  .login {
    width: 1200px;
    height: 487px;
    margin: 0 auto;
    background: url(./images/loginbg.png) no-repeat;
  }
  .loginform {
    width: 420px;
    height: 406px;
    box-sizing: border-box;
    background: #fff;
    float: right;
    top: 45px;
    position: relative;
    padding: 20px;
    .tab {
      li {
        width: 50%;
        float: left;
        text-align: center;
        a {
          width: 100%;
          display: block;
          height: 50px;
          line-height: 50px;
          font-size: 20px;
          font-weight: 700;
          color: #333;
          border: 1px solid #ddd;
          box-sizing: border-box;
          text-decoration: none;
        }
        .current {
          border-bottom: none;
          border-top-color: #28a3ef;
          color: #e1251b;
        }
      }
    }
    .content {
      width: 380px;
      height: 316px;
      box-sizing: border-box;
      border: 1px solid #ddd;
      border-top: none;
      padding: 18px;
      form {
        margin: 15px 0 18px 0;
        font-size: 12px;
        line-height: 18px;
        .input-text {
          margin-bottom: 22px;
          position: relative;
          i {
            float: left;
            width: 37px;
            height: 32px;
            border: 1px solid #ccc;
            background: url(./images/icons.png) no-repeat -10px -201px;
            box-sizing: border-box;
            border-radius: 2px 0 0 2px;
          }
          .pwd {
            background-position: -72px -201px;
          }
          input {
            width: 302px;
            height: 32px;
            box-sizing: border-box;
            border: 1px solid #ccc;
            border-left: none;
            float: left;
            padding-top: 6px;
            padding-bottom: 6px;
            font-size: 14px;
            line-height: 22px;
            padding-right: 8px;
            padding-left: 8px;

            border-radius: 0 2px 2px 0;
            outline: none;
          }

          .error-msg {
            position: absolute;
            top: 100%;
            left: 40px;
            color: red;
          }
        }
        .setting {
          label {
            float: left;
          }
          .forget {
            float: right;
          }
        }
        .btn {
          background-color: #e1251b;
          padding: 6px;
          border-radius: 0;
          font-size: 16px;
          font-family: 微软雅黑;
          word-spacing: 4px;
          border: 1px solid #e1251b;
          color: #fff;
          width: 100%;
          height: 36px;
          margin-top: 25px;
          outline: none;
        }
      }
      .call {
        margin-top: 30px;
        ul {
          float: left;
          li {
            float: left;
            margin-right: 5px;
          }
        }
        .register {
          float: right;
          font-size: 15px;
          line-height: 38px;
        }
        .register:hover {
          color: #4cb9fc;
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
