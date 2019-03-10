<template>
  <div class="app-login">
    <el-row class="app-fill-height">
      <el-col class="left" :span="16">
        <img class="company-logo" src="../../assets/images/logo-aigodata.svg">
        <img class="sketch" src="../../assets/images/login-sketch.svg">
      </el-col>
      <el-col class="right" :span="8">
        <!-- 登录框 -->
        <div class="app-login-box">
          <!--name-->
          <div class="logo">
            <img src="../../assets/images/logo.svg">
          </div>
          <!--login-form-->
          <el-form ref="loginForm" :model="loginForm" label-width="0px">
            <el-form-item label="">
              <el-input v-model="loginForm.username" placeholder="请输入用户名" clearable
                        @keyup.enter.native="submit" autofocus="true">
                <i slot="prefix" class="icon iconfont icon-yonghu"></i>
              </el-input>
            </el-form-item>
            <el-form-item label="">
              <el-input v-model="loginForm.password" placeholder="请输入密码"
                        :type="passwordType" @keyup.enter.native="submit">
                <i slot="prefix" class="icon iconfont icon-mima"></i>
                <i slot="suffix" class="icon iconfont"
                   :class="passwordEye ? 'icon-biyan' : 'icon-szp-eay'" @click="changePwdEye"></i>
              </el-input>
            </el-form-item>
            <!--verification-->
            <div class="verification">
              <el-form-item label="" class="verification-input">
                <el-input v-model="loginForm.captcha" placeholder="请输入验证码" clearable
                          type="text" @keyup.enter.native="submit"></el-input>
              </el-form-item>
              <!--verificationcode-->
              <div class="verification-code" @click="changeCaptcha">
                <img :src="captchaURL" @load="loadImg">
              </div>
            </div>
            <el-form-item>
              <el-button type="primary" round class="app-loginin-btn" :loading="loading" @click="submit">登录</el-button>
            </el-form-item>
          </el-form>
          <div class="rememberPassword">
            <!--<el-checkbox v-model="rememberPassword">记住密码</el-checkbox>-->
            <!--<a href="#" class="forget-password">忘记密码？</a>-->
          </div>

          <div class="warning" v-show="messageVisible">
            {{message}}。请重试。如果总是不能登录，请<!--点击“忘记密码”或-->联系管理员。
          </div>

          <!-- 产品描述 -->
          <div class="product-info">
            aigovisual是一款大数据可视化分析平台，拥有企业级的数据处理能力，轻松定制数据可视化展示，更智能更易用的数据分析，支持多人协同工作。
          </div>
        </div>
        <!-- 版本信息 -->
        <div class="copyright-info">
          Copyright © 2019 aigodata all rights reserved.
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import cryptoUtil from '@/lib/cryptoUtil'
  export default {
    name: "app",
    data() {
      return {
        loading: false,
        passwordEye: false,
        passwordType: 'password',
        //登陆表单
        loginForm: {
          username: "",
          password: "",
          captcha: ""
        },
        captchaURL: '/api/captcha?identify=' + Date.now(),
        repeatChangeCaptcha: false,
        //记住密码
        rememberPassword: false,
        //账号密码输入错误提示
        messageVisible: false,
        message: "您的用户名和密码错误"
      };
    },
    methods: {
      submit() {
        // @特殊处理, 补充密码加密
        let loginForm = JSON.stringify(this.loginForm);
        loginForm = cryptoUtil.encrypt(loginForm)
        this.$post("/login", {
          data: {
            "params": loginForm
          }
        }).then(data => {
          // @特殊处理, 如果发生错误, 刷新验证码
          if (data.code !== 200) {
            this.changeCaptcha()
          }
          if (data.code === 500) {
            this.message = data.message;
            this.messageVisible = true;
          } else {

            this.$store.commit("user", data);

            // 取得权限
            this.$post("/action", {
              data: {
                "select": "sys_role",
                "where": "id=" + data.roleId,
                "join": ["sys_role_permission", "sys_permission"]
              }
            }).then(per => {
              if (Array.isArray(per) && per.length > 0) {
                this.$store.commit("permission", per[0].sys_role_permission.sys_permission);

                // @特殊处理 session失效被阻止到登录页面, 需要返回最后的访问页面
                let before403Path = this.localStore.get("before_403_path");
                if (before403Path) {
                  this.$router.push(before403Path);
                  this.localStore.remove("before_403_path");
                } else {
                  this.$router.push('/main');
                }

              }
            });
          }
        });
      },
      // 切换密码眼睛
      changePwdEye() {
        this.passwordEye = !this.passwordEye
        this.passwordType = this.passwordEye ? 'text' : 'password'
      },
      changeCaptcha() {
        // console.log(this.repeatChangeCaptcha);
        if (!this.repeatChangeCaptcha) {
          this.repeatChangeCaptcha = true;
          this.captchaURL = this.captchaURL.split("?")[0] + '?identify=' + Date.now()
        }
      },
      loadImg() {
        this.repeatChangeCaptcha = false;
      }
    },
    mounted() {
      // console.log(cryptoUtil.encrypt('123'), cryptoUtil.decrypt(cryptoUtil.encrypt('123')))
    }
  };
</script>

<style>
  .app-login {
    width: 100%;
    height: 100%;
    /*background-image: url(../../assets/images/login-bg.jpg);*/
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
  }

  .app-login .left {
    height: 100%;
    position: relative;
  }

  .app-login .left .company-logo {
    width: 200px;
    position: absolute;
    top: 20px;
    left: 30px;
  }

  .app-login .left .sketch {
    position: absolute;
    width: 80%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .app-login .right {
    height: 100%;
    position: relative;
  }

  .app-login .app-login-box {
    width: 440px;
    padding: 50px 60px;
    background-color: #ffffff;
    position: relative;
    top: 25%;
    transform: translate(-15%, -10%);
    border-radius: 6px;
    margin: 0 auto;
  }

  .app-login .app-login-box .logo {
    height: 40px;
    margin-bottom: 40px;
    text-align: center;
  }

  .app-login .app-login-box .logo img {
    width: 60%;
  }

  .app-login .app-login-box .verification {
    width: 100%;
    position: relative;
  }

  .app-login .app-login-box .verification .verification-input {
    width: 50%;
  }

  .app-login .app-login-box .verification .verification-input .el-input__inner {
    padding-left: 15px;
  }

  .app-login .app-login-box .verification .verification-code {
    width: 47%;
    height: 40px;
    line-height: 40px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    position: absolute;
    top: 0;
    right: 0;
    text-align: center;
    cursor: pointer;
  }

  .app-login .app-login-box .verification .verification-code img {
    width: 146px;
    height: 38px;
  }

  .app-login .app-login-box .el-input--small .el-input__inner {
    height: 40px;
    line-height: 40px;
    color: #a4a4a4;
    font-size: 14px;
    padding-left: 40px;
  }

  .app-login .app-login-box .el-input--small .el-input__suffix-inner {
    cursor: pointer;

  }

  .app-login .app-login-box .icon {
    font-size: 20px;
    line-height: 40px;
    color: #a3a3a3;
    margin-left: 2px;
    padding-right: 5px;
    border-right: 1px solid #e8e8e8;
  }

  .app-login .app-login-box .el-form-item--mini.el-form-item,
  .app-login .app-login-box .el-form-item--small.el-form-item {
    margin-bottom: 15px;
  }

  .app-login .app-login-box .app-loginin-btn {
    width: 100%;
    height: 42px;
    font-size: 14px;
    background-color: #1b5b9e;
    margin: 11px 0px;
    border: none;
  }

  .app-login .app-login-box .rememberPassword {
    position: relative;
    width: 100%;
    margin-bottom: 20px;
  }

  .app-login .app-login-box .rememberPassword .forget-password {
    text-decoration: none;
    color: #3d9df4;
    font-size: 14px;
    position: absolute;
    top: 0;
    right: 0;
  }

  .app-login .app-login-box .warning {
    font-size: 12px;
    color: #ee1515;
    text-align: justify;
    line-height: 20px;
  }

  .app-login .app-login-box .el-loading-mask {
    background-color: rgba(0, 0, 0, 0.3);
  }

  /* 产品介绍 */
  .app-login .product-info {
    width: 95%;
    text-align: justify;
    color: #999;
    margin: 40px auto 0;
    font-size: 14px;
    line-height: 20px;
    text-indent:26px;
  }

  /* 版权信息 */
  .app-login .copyright-info {
    width: 440px;
    text-align: center;
    color: #999;
    position: absolute;
    padding: 0 60px;
    bottom: 20px;
    /* width: 100%; */
    transform: translateX(-15%);
    margin: 0 auto;
    font-size: 13px;
    left: 0;
    right: 0;
  }
</style>
