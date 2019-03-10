<template>
  <div class="app-header">
    <!-- logo -->
    <div class="logo">
      <img src="../assets/images/logo.svg" alt="logo">
    </div>
    <!-- @特殊处理, 当切仅当 project.id 存在的时候才显示 -->
    <div class="nav-container clearfix" v-if="project.id">
      <!-- 项目列表 下拉菜单 -->
      <div class="project-list">
        <el-dropdown placement="bottom" size="medium" trigger="click" @command="activeProject">
          <div class="header-project-display-name app-hover clearfix">
            <div><i class="icon iconfont icon-xiangmu app-icon-right"></i></div>
            <div><span>当前项目:</span></div>
            <div :title="project.name"><span>{{ project.name }}</span></div>
            <div><i class="el-icon-caret-bottom el-icon--right"></i></div>
          </div>
          <el-dropdown-menu slot="dropdown" class="header-project-dropdown">
            <el-dropdown-item v-for="(item, index) in projectList" :key="item.id" :command="index">
              <div class="project-name clearfix">
                <!-- 项目名 -->
                <div class="item-name" :title="item.name">
                  <!-- 选中图标 -->
                  <i v-show="item.id === project.id" class="el-icon-check el-icon--left"></i>
                  {{ item.name }}
                </div>
                <!-- 是否是创建者 -->
                <div><span class="item-tag" v-show="item.creator">创建者</span></div>
              </div>
            </el-dropdown-item>
            <el-dropdown-item class="dropdown-last-item" command="back-project-manage">
              回到项目管理
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!-- 分割线 -->
        <div class="v-line"></div>
      </div>
      <!-- 导航 -->
      <ul class="clearfix nav">
        <li v-for="(item, index) in navList" class="nav-item app-hover" :key="index"
            :data-index="index"
            @click="activeNav(item.routerName)"
            :class="{active: item.routerName === nav}">
          <i class="icon iconfont" :class="item.icon"></i>
          {{item.name}}
        </li>
      </ul>
    </div>
    <!-- 个人中心 & 设置 -->
    <div class="user">
      <div class="item user-info">
        <el-dropdown trigger="click" class="user-info-dropdown" @command="activeUser">
          <!-- 当前 -->
          <div class="el-dropdown-link">
            <i class="icon iconfont icon-yonghu"></i>
            {{ user.name }}
            <i class="el-icon-caret-bottom"></i>
          </div>
          <!-- 下拉菜单 -->
          <el-dropdown-menu slot="dropdown">
            <!--<el-dropdown-item>用户管理</el-dropdown-item>-->
            <el-dropdown-item command="edit-user-info">个人信息</el-dropdown-item>
            <el-dropdown-item command="edit-pwd">修改密码</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <div class="v-line"></div>
      </div>
      <el-tooltip class="item" effect="dark" content="帮助" placement="bottom">
        <div class="item" @click="help">
          <i class="icon iconfont icon-dengpao"></i>
          <div class="v-line"></div>
        </div>
      </el-tooltip>
      <!--<div class="item" title="信息">-->
      <!--<i class="icon iconfont icon-wodezhanghu-" style="font-size: 22px;"></i>-->
      <!--<div class="icon-target">5</div>-->
      <!--<div class="v-line"></div>-->
      <!--</div>-->
      <el-tooltip class="item" effect="dark" content="退出系统" placement="bottom">
        <div class="item" @click="logout">
          <i class="icon iconfont icon-tuichu"></i>
        </div>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
  import cryptoUtil from '@/lib/cryptoUtil'

  export default {
    name: "app-header",
    computed: {
      project() {
        let project = this.$store.state.project || this.localStore.get("project");
        return project || {}
      },
      projectList() {
        return this.$store.state.projectList || this.localStore.get("projectList");
      },
      nav() {
        return this.$store.state.nav || this.localStore.get("nav");
      },
      user() {
        let user = this.localStore.get("user") || this.$store.state.user;
        return user || {}
      },
      permission() {
        let permission = this.localStore.get("permission") || this.$store.state.permission;
        return permission || {}
      }
    },
    data() {
      return {
        username: "",
        // 导航
        navList: [
          {
            icon: 'icon-tongjifenxi',
            routerName: 'data_analysis',
            name: '分析'
          },
          {
            icon: 'icon-caidan-shujuyuan',
            routerName: 'data_source',
            name: '数据源'
          },
          {
            icon: 'icon-jiekou',
            routerName: 'data_service',
            name: '数据服务'
          },
          {
            icon: 'icon-shujumoxing',
            routerName: 'data_model',
            name: '数据模型'
          },
          {
            icon: 'icon-shezhi1',
            routerName: 'setting',
            name: '设置'
          }
        ]
      };
    },
    methods: {
      // 项目列表
      activeProject(command) {
        if (command === 'back-project-manage') {
          // 返回项目列表
          this.$router.push({name: 'project_manage'});
        } else {
          let project = this.projectList[command]
          this.$store.commit("project", project);
          // @fixme 有可能复杂的子路由路径的匹配失效情况, 需要优化代码
          this.$router.push({name: this.$route.name, params: {project_id: project.id}})
        }
      },
      // nav导航
      activeNav(routerName) {
        this.$store.commit("nav", routerName);
        // @fixme 有可能复杂的子路由路径的匹配失效情况, 需要优化代码
        this.$router.push({name: routerName, params: {project_id: this.project.id}})
      },
      // 个人中心
      activeUser(command) {
        if (command === 'edit-user-info') {

        } else if (command === 'edit-pwd') {

        }
      },
      // 帮助
      help() {

      },
      // 退出 & 注销
      logout() {
        this.$confirm('是否确认退出系统？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(_ => {
          // 请求
          this.$post('/logout').then((data) => {
            if (data === true) {
              this.localStore.remove("user");
              this.localStore.remove("permission");
              this.$router.push('/login');
            }
          })
        }).catch(_ => {
        })
      }
    }
  };
</script>

<style>
  .app-header {
    position: relative;
    height: 45px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
    z-index: 2;
  }

  /* logo */
  .app-header .logo {
    /*cursor: pointer;*/
    position: absolute;
    top: 0;
    left: 0;
    width: 180px;
    height: 100%;
    line-height: 100%;
    text-align: center;
  }

  .app-header .logo img {
    position: relative;
    height: 60%;
    top: 20%;
  }

  /* 导航 */
  .app-header .nav-container {
    padding-left: 180px;
  }

  .app-header .nav-container .project-list {
    float: left;
    height: 45px;
    line-height: 45px;
    text-align: center;
    padding: 0 20px;
    position: relative;
  }

  /* 项目列表 */
  .header-project-display-name {
    font-weight: 500;
  }
  .header-project-display-name > div {
    float: left;
  }
  .header-project-display-name > div:nth-child(3) {
    margin-left: 5px;
    max-width: 160px;
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
  }
  .header-project-dropdown.el-dropdown-menu {
    margin: 5px 0 0;
    padding: 6px 0 0;
  }
  .header-project-dropdown.el-dropdown-menu .el-dropdown-menu__item {
    width: 285px;
    padding: 0 17px 0 36px;
    position: relative;
  }
  .header-project-dropdown.el-dropdown-menu .el-dropdown-menu__item.active {
    color: #3d9df4;
  }
  .header-project-dropdown .el-dropdown-menu__item .project-name .item-name {
    max-width: 170px;
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
    float: left;
  }
  .header-project-dropdown .el-dropdown-menu__item .project-name .item-name i {
    position: absolute;
    left: 10px;
    top: 6px;
    font-size: 18px;
    font-weight: 600;
  }
  .header-project-dropdown .el-dropdown-menu__item .project-name .item-tag {
    background: #fd9234;
    padding: 3px 10px;
    border-radius: 50px;
    font-size: 12px;
    color: #fff;
    margin-left: 5px;
  }
  /* 回到项目列表 */
  .header-project-dropdown .dropdown-last-item.el-dropdown-menu__item {
    margin-top: 6px;
    cursor: pointer;
    height: 30px;
    line-height: 30px;
    background: #f8f8f8;
    font-size: 13px;
    text-align: center;
    font-weight: 500;
    border-top: 1px solid #eeeeee;
    padding: 0 17px;
  }
  .header-project-dropdown .dropdown-last-item.el-dropdown-menu__item:focus,
  .header-project-dropdown .dropdown-last-item.el-dropdown-menu__item:not(.is-disabled):hover {
    background: #f8f8f8;
    color: #666;
  }

  /* 导航菜单 */

  .app-header .nav-container .nav {
    float: left;
  }

  .app-header .nav-container .nav .nav-item {
    float: left;
    padding: 0 20px;
    height: 45px;
    line-height: 45px;
    font-size: 14px;
    font-weight: 500;
    box-sizing: border-box;
    cursor: pointer;
    transition: all 0.1s;
    color: #585858;
  }

  .app-header .nav-container .nav .nav-item:hover,
  .app-header .nav-container .nav .nav-item.active {
    color: #3d9df4;
  }

  /* 个人中心 设置 */
  .app-header .user {
    position: absolute;
    top: 0;
    right: 0;
  }

  .app-header .user .item {
    display: inline-block;
    min-width: 45px;
    height: 45px;
    line-height: 45px;
    cursor: pointer;
    position: relative;
    color: #585858;
    text-align: center;
  }

  .app-header .user .item .icon-target {
    position: absolute;
    font-size: 10px;
    background-color: #b60102;
    border-radius: 50%;
    height: 14px;
    padding: 0 4px;
    line-height: 14px;
    top: 16px;
    right: 16px;
    color: #ffffff;
  }

  .app-header .user .item .icon {
    font-size: 18px;
  }

  .app-header .user .item.user-info .el-dropdown {
  }

  .app-header .user .item.user-info .el-dropdown .el-dropdown-link {
    padding: 0 10px;
    position: relative;
    top: -2px;
  }

  .app-header .user .item.user-info .el-dropdown .el-dropdown-link .icon {
    font-size: 20px;
    position: relative;
    top: 2px;
  }

  .app-header .user .item.user-info .el-dropdown .el-dropdown-link:hover {
    color: #3d9df4;
  }

  .app-header .v-line {
    position: absolute;
    right: 0;
    height: 40%;
    top: 30%;
    width: 1px;
    background: #f0f0f0;
  }

  .app-header .user .item:hover {
    color: #3d9df4;
  }
</style>
