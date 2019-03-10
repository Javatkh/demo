<template>
  <div class="setting clearfix">
    <!-- 侧边栏 -->
    <div class="setting-sidebar">
      <el-menu
        ref="sidebar-menu"
        :defaultOpeneds="['1', '2']"
        default-active="1-1"
        @open="openSidebar"
        @close="closeSidebar"
        @select="selectSidebar">
        <el-submenu index="1">
          <template slot="title">
            <!--<i class="el-icon-location"></i>-->
            <span>服务器设置</span>
          </template>
          <el-menu-item index="time_zone">
            <i class="el-icon-setting"></i>
            <span slot="title">时区</span>
          </el-menu-item>
          <el-menu-item index="restart">
            <i class="el-icon-setting"></i>
            <span slot="title">重启</span>
          </el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <!--<i class="el-icon-location"></i>-->
            <span>系统设置</span>
          </template>
          <el-menu-item index="version">
            <i class="el-icon-setting"></i>
            <span slot="title">版本更新</span>
          </el-menu-item>
          <el-menu-item index="language">
            <i class="el-icon-setting"></i>
            <span slot="title">语言设置</span>
          </el-menu-item>
          <el-menu-item index="db_backup">
            <i class="el-icon-setting"></i>
            <span slot="title">数据库备份</span>
          </el-menu-item>
          <el-menu-item index="ftp">
            <i class="el-icon-setting"></i>
            <span slot="title">远程FTP</span>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
    <!-- 内容区 -->
    <div class="setting-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'setting',
    computed: {},
    data() {
      return {}
    },
    methods: {
      openSidebar(idx, idxPath) {
        console.log(idx, idxPath);
      },
      closeSidebar(idx, idxPath) {
        console.log(idx, idxPath);
      },
      selectSidebar(idx, idxPath) {
        this.$router.push({name: idx})
      }
    },
    mounted() {
      this.$refs['sidebar-menu']
    }
  }
</script>

<style>
  .setting {
    height: 100%;
    position: relative;
  }

  /* 侧边栏 */
  .setting .setting-sidebar {
    height: 100%;
    float: left;
    width: 200px;
    border-right: 1px solid #e2e2e2;
  }

  /* 功能区 */
  .setting .setting-content {
    height: 100%;
    float: left;
    width: calc(100% - 201px);
    overflow: auto;
    padding: 20px;
    box-sizing: border-box;
  }
</style>

