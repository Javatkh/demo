<template>
  <div class="project_manage">
    <app-module-title
      title="项目管理"
      description="我们将页面以项目的形式进行划分，页面是归属于项目的，新建页面之前需要先新建项目，除了自己能够新建项目外，也可以被邀请参与其他项目。">
    </app-module-title>
    <app-module-content class="project-content">
        <el-tabs v-model="tabName" @tab-click="handleTabClick">
          <el-tab-pane label="所有项目" name="all"></el-tab-pane>
          <el-tab-pane label="我创建的项目" name="create"></el-tab-pane>
          <el-tab-pane label="我参与的项目" name="join"></el-tab-pane>
        </el-tabs>
        <div class="table-btn-group">
          <el-button type="warning" icon="el-icon-plus" round>新建项目</el-button>
        </div>
        <div class="table-container" v-if="tableData.length > 0">
          <!-- 项目列表 -->
          <ul>
            <li class="data-item" v-for="item in tableData" :key="item.id">
              <div class="data-item-name">
                <el-tooltip class="item" effect="dark" content="进入项目" placement="right">
                  <span class="name app-hover" @click="entryProject(item)">{{ item.name }}</span>
                </el-tooltip>
                <span class="item-tag" v-show="item.creator">创建者</span>
              </div>
              <div class="data-item-description">{{ item.description }}</div>
              <!-- 操作区 -->
              <div class="item-right">
                <div class="column">
                  <!-- 跳转 -->
                  <el-tooltip class="item" effect="dark" content="进入项目" placement="top">
                    <span class="app-hover" @click="entryProject(item)"><i class="icon iconfont icon-fenxiang"></i></span>
                  </el-tooltip>
                  <!-- 操作菜单 -->
                  <el-dropdown placement="bottom" size="medium" v-if="item.creator">
                    <span class="el-dropdown-link app-hover">
                      <i class="icon iconfont icon-weibiaoti2zhuanhuan"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>
                        <i class="icon iconfont icon-bianji"></i> 编辑
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <i class="icon iconfont icon-zhuanrang"></i> 转让
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <i class="icon iconfont icon-fuzhi"></i> 复制
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <i class="icon iconfont icon-trasch"></i> 删除
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                  <!-- 退出 -->
                  <el-tooltip v-else class="item" effect="dark" content="退出项目" placement="top">
                    <span class="app-hover"><i class="icon iconfont icon-tuichu1"></i></span>
                  </el-tooltip>
                </div>
                <div class="column">
                  <!-- 项目成员 -->
                  <el-dropdown placement="bottom" size="medium">
                    <span class="el-dropdown-link app-hover">
                      <i class="icon iconfont icon-chengyuan"></i>
                      项目成员 {{ item.members.length || 1 }} 人
                      <i class="el-icon-caret-bottom el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item v-for="member in item.members" :key="member">
                        <i class="icon iconfont icon-yonghu"></i>
                        {{ member }}
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                  <!-- 更新时间 -->
                  <span class="update-time">{{ moment(item.update_time).fromNow() }}更新</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div v-else class="empty-text">
          <img src="">
          暂无数据
        </div>
    </app-module-content>
  </div>
</template>

<script>
  export default {
    name: 'project_manage',
    computed: {

    },
    data() {

      let start = new Date()
      start.setHours(0)
      start.setMinutes(0)
      start.setSeconds(0)
      start.setMilliseconds(0)

      return {
        tabName: 'all',
        // 所有
        allData: [],
        // 我创建的
        createData: [],
        // 我参与的
        joinData: [],
        // 列表相关
        where: [],
        order: ["create_time desc"],
        loading: true,
        tableData: [
          {
            id: 999,
            name: '项目名称1项目名称1项目名称1项目名称1项目名称1',
            description: '项目描述',
            creator: true,
            members: [
              '张三', '李四', '王五'
            ],
            update_time: start
          },
          {
            id: 888,
            name: '项目名称2',
            description: '项目描述2',
            creator: false,
            members: [
              '张三', '李四', '王五'
            ],
            update_time: new Date()
          },
          {
            id: 881,
            name: '项目名称3',
            description: '项目描述2',
            creator: true,
            members: [
              '张三', '李四', '王五'
            ],
            update_time: new Date()
          },
          {
            id: 882,
            name: '项目名称4',
            description: '项目描述2',
            creator: false,
            members: [
              '张三', '李四', '王五'
            ],
            update_time: new Date()
          },
          {
            id: 883,
            name: '项目名称5',
            description: '项目描述2',
            creator: false,
            members: [
              '张三', '李四', '王五'
            ],
            update_time: new Date()
          },
          {
            id: 783,
            name: '项目名称6',
            description: '项目描述2',
            creator: false,
            members: [
              '张三', '李四', '王五'
            ],
            update_time: new Date()
          },
          {
            id: 683,
            name: '项目名称7',
            description: '项目描述2',
            creator: false,
            members: [
              '张三', '李四', '王五'
            ],
            update_time: new Date()
          },
          {
            id: 583,
            name: '项目名称8',
            description: '项目描述2',
            creator: false,
            members: [
              '张三', '李四', '王五'
            ],
            update_time: new Date()
          },
          {
            id: 483,
            name: '项目名称9',
            description: '项目描述2',
            creator: false,
            members: [
              '张三', '李四', '王五'
            ],
            update_time: new Date()
          },
          {
            id: 884,
            name: '项目名称10',
            description: '项目描述2',
            creator: false,
            members: [
              '张三', '李四', '王五'
            ],
            update_time: new Date()
          },
          {
            id: 885,
            name: '项目名称11',
            description: '项目描述2',
            creator: false,
            members: [
              '张三', '李四', '王五'
            ],
            update_time: new Date()
          }
        ]
      }
    },
    methods: {
      // tab页切换
      handleTabClick(tab, event) {

      },
      // 进入项目
      entryProject(project) {
        this.$store.commit("project", project);
        this.$router.push({name: 'data_source', params: {project_id: project.id}});
      },
      list() {
        this.$store.commit("projectList", this.tableData);

//        this.$post('/action', {
//          data: {
//            "select": this.tableName,
//            "join": ["sys_user_role", "sys_role"],
//            "limit": [(this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize],
//            "where": this.where,
//            "order": this.order
//          }
//        }).then((data) => {
//          if (data && Array.isArray(data.data)) {
//            this.total = data.total;
//            this.tableData = data.data;
//          }
//        })
      },
      load() {
        this.list()
      }
    },
    mounted() {
      this.load()
    }
  }
</script>

<style>
  .project_manage {
    height: 100%;
    position: relative;
  }
  .project_manage .project-content {
    position: relative;
  }
  .project_manage .table-btn-group {
    position: absolute;
    top: 0;
    right: 0;
    padding-right: 40px;
    padding-top: 20px;
  }
  .project_manage .table-container {
    height: calc(100% - 54px);
    overflow: auto;
  }
  /* 数据项 */
  .project_manage .data-item {
    border-bottom: 1px solid #eeeeee;
    padding: 20px 20px;
    position: relative;
  }
  /* 数据项 名称 */
  .project_manage .data-item-name {
    font-size: 14px;
    padding-right: 300px;
  }
  .project_manage .data-item-name .item-tag {
    background: #fd9234;
    padding: 3px 10px;
    border-radius: 50px;
    font-size: 12px;
    color: #fff;
    margin-left: 5px;
    position: relative;
    top: -1px;
  }
  /* 数据项 描述 */
  .project_manage .data-item-description {
    font-size: 13px;
    padding-top: 10px;
    padding-right: 300px;
    color: #999;
  }
  /* 数据项 操作区 */
  .project_manage .data-item .item-right {
    position: absolute;
    top: 0;
    right: 0;
    padding: 18px 20px 20px;
    height: 100%;
    width: 300px;
  }
  .project_manage .data-item .item-right .column {
    text-align: right;
  }
  /* 跳转 & 操作更多 */
  .project_manage .data-item .item-right .column:first-child {
    margin-bottom: 10px;
  }
  .project_manage .data-item .item-right .column:first-child > span {
    margin-right: 15px;
  }
  .project_manage .data-item .item-right .column:first-child > span + span {
    margin-right: 0;
  }
  .project_manage .data-item .item-right .column:first-child > span .icon {
    font-size: 18px;
  }
  /* 成员 & 更新时间 */
  .project_manage .data-item .item-right .column:nth-child(2) .el-dropdown-link {
    font-size: 13px;
  }
  .project_manage .data-item .item-right .column:nth-child(2) .el-dropdown-link .icon {
    position: relative;
    top: 1px;
  }
  .project_manage .data-item .item-right .column:nth-child(2) .el-dropdown-link .el-icon--right {
    margin-left: 0;
    font-size: 12px;
  }
  .project_manage .data-item .item-right .column:nth-child(2) .update-time {
    margin-left: 15px;
    font-size: 13px;
  }
</style>

