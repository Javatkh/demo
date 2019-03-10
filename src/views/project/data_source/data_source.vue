<template>
  <div class="data_source">
    <app-module-title
      title="数据源管理"
      description="可以进行多种的数据源连接配置，并在当前项目中保存配置的数据源连接信息。">
    </app-module-title>
    <app-module-content class="source-content">
      <!-- 过滤 & 新增 -->
      <el-row class="operation-container">
        <el-col :span="12">
          <el-form ref="form" :inline="true">
            <el-form-item label="数据源类型过滤">
              <!-- @特殊处理, 定制select样式 补充选中图标  -->
              <img v-show="filterType.src" class="data-source-active-icon" :src="filterType.src">
              <el-select
                :class="{'empty-filter-type': !filterType.name}"
                @change="changeFilterType"
                @clear="clearFilterType"
                popper-class="data-source-popper"
                :popper-append-to-body="true"
                v-model="filterType.name"
                class="data-source-type"
                clearable filterable placeholder="请选择数据源类型">
                <el-option
                  v-for="(item, index) in filterTypeList"
                  :key="index"
                  :value="item.name">
                  <img class="data-source-icon" :src="item.src"> <span>{{ item.name }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12" class="table-btn-group">
          <el-button type="warning" icon="el-icon-plus" round>新建数据源</el-button>
        </el-col>
      </el-row>
      <!-- 数据列表 -->
      <div class="table-container">
        <el-table
          stripe
          size="medium"
          :data="tableData"
          style="width: 100%"
          :default-sort="tableSort">
          <el-table-column
            sortable
            prop="name"
            label="类型">
            <template slot-scope="scope">
              <div class="clearfix">
                <div class="data-source-icon">
                  <img :src="getSrc(scope.row.type)">
                </div>
                <div>
                  <div class="data-source-name">{{ scope.row.name }}</div>
                  <div class="data-source-version">版本 {{ scope.row.version }}</div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            sortable
            prop="create_time"
            label="时间">
            <template slot-scope="scope">
              {{ moment(scope.row.create_time).fromNow() }}创建
            </template>
          </el-table-column>
          <el-table-column
            sortable
            prop="status"
            label="状态">
            <template slot-scope="scope">
              <span class="status" :class="'status-' + scope.row.status">
                <i class="icon iconfont icon-circle"></i>
              </span>
              <span class="text" :class="'status-' + scope.row.status">{{ dict.status[scope.row.status] }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="180"
            align="center">
            <template slot-scope="scope">
              <!-- 测试链接 -->
              <el-tooltip effect="dark" content="测试链接" placement="top">
                <span class="operation-btn app-hover"><i class="icon iconfont icon-lianjie1"></i></span>
              </el-tooltip>
              <!-- 预览 -->
              <el-tooltip effect="dark" content="预览" placement="top">
                <span class="operation-btn app-hover"><i class="icon iconfont icon-yulan"></i></span>
              </el-tooltip>
              <!-- 编辑 -->
              <el-tooltip effect="dark" content="编辑" placement="top">
                <span class="operation-btn app-hover"><i class="icon iconfont icon-bianji"></i></span>
              </el-tooltip>
              <!-- 删除 -->
              <el-tooltip effect="dark" content="删除" placement="top">
                <span class="operation-btn app-hover"><i class="icon iconfont icon-trasch"></i></span>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </app-module-content>
  </div>
</template>

<script>

  import Apache_Hive from '../../../assets/images/data_source/Apache_Hive.svg'
  import Cassandra from '../../../assets/images/data_source/Cassandra.svg'
  import CouchDB from '../../../assets/images/data_source/CouchDB.svg'
  import CSV from '../../../assets/images/data_source/CSV.svg'
  import DB2 from '../../../assets/images/data_source/DB2.svg'
  import Elasticsearch from '../../../assets/images/data_source/Elasticsearch.svg'
  import Excel from '../../../assets/images/data_source/Excel.svg'
  import Hadoop from '../../../assets/images/data_source/Hadoop.svg'
  import HBase from '../../../assets/images/data_source/HBase.svg'
  import MongoDB from '../../../assets/images/data_source/MongoDB.svg'
  import MySQL from '../../../assets/images/data_source/MySQL.svg'
  import Oracle from '../../../assets/images/data_source/Oracle.svg'
  import SQL_Server from '../../../assets/images/data_source/SQL_Server.svg'
  import XML from '../../../assets/images/data_source/XML.svg'

  export default {
    name: 'data_source',
    computed: {
    },
    data() {

      let start = new Date()
      start.setHours(0)
      start.setMinutes(0)
      start.setSeconds(0)
      start.setMilliseconds(0)

      return {
        filterType: {
          name: '',
          src: ''
        },
        filterTypeList: [
          {name: 'Apache Hive', src: Apache_Hive},
          {name: 'Cassandra', src: Cassandra},
          {name: 'CouchDB', src: CouchDB},
          {name: 'CSV', src: CSV},
          {name: 'DB2', src: DB2},
          {name: 'Elasticsearch', src: Elasticsearch},
          {name: 'Excel', src: Excel},
          {name: 'Hadoop', src: Hadoop},
          {name: 'HBase', src: HBase},
          {name: 'MongoDB', src: MongoDB},
          {name: 'MySQL', src: MySQL},
          {name: 'Oracle', src: Oracle},
          {name: 'SQL Server', src: SQL_Server},
          {name: 'XML', src: XML},
        ],
        dict: {
          status: {
            "1": '正常',
            "2": '未连接',
            "3": '故障'
          }
        },
        tableSort: {
          prop: 'create_time',
          order: 'descending'
        },
        tableDataClone: [],
        tableData: [
          {
            name: 'demo数据源001',
            type: 'Elasticsearch',
            version: '5.5.1.9',
            status: 1,        // 1 正常, 2 未连接 3 故障
            create_time: start
          },
          {
            name: 'demo数据源001',
            type: 'Excel',
            version: '5.5.1.9',
            status: 1,        // 1 正常, 2 未连接 3 故障
            create_time: start
          },
          {
            name: 'demo数据源001',
            type: 'MySQL',
            version: '5.5.1.9',
            status: 2,        // 1 正常, 2 未连接 3 故障
            create_time: start
          },
          {
            name: 'demo数据源001',
            type: 'Hadoop',
            version: '5.5.1.9',
            status: 3,        // 1 正常, 2 未连接 3 故障
            create_time: start
          }
        ]
      }
    },
    methods: {
      // 切换过滤条件
      changeFilterType(value) {
        // 切换选中数据源图标
        this.filterType.src = this.getSrc(value)
        // 过滤数据
        this.filterData(value)
      },
      // 清空过滤条件
      clearFilterType() {
        this.filterType = {name: '', src: ''}
        // 过滤数据
        this.filterData()
      },
      // 获取数据源图标
      getSrc(type) {
        return this.filterTypeList.find(f => f.name === type).src
      },
      // 过滤数据
      filterData(type) {
        this.tableData = this.tableDataClone.filter(d => {
          return type ? d.type === type : true
        })
      },
      load() {
        this.tableDataClone = JSON.parse(JSON.stringify(this.tableData))
      }
    },
    mounted() {
      this.load()
    }
  }
</script>

<style>
  .data_source {
    height: 100%;
    position: relative;
  }

  /* 顶部操作区 */
  .data_source .operation-container {

  }

  .data_source .operation-container .data-source-active-icon {
    position: absolute;
    z-index: 1;
    left: 11px;
    height: 20px;
    width: 20px;
    top: 6px;
  }

  .data_source .operation-container .data-source-type .el-input__inner {
    padding-left: 40px;
  }

  /* @特殊处理 过滤条件为空的时候恢复默认内边距 */
  .data_source .operation-container .data-source-type.empty-filter-type .el-input__inner {
    padding-left: 15px;
  }

  .data-source-popper .data-source-icon {
    height: 20px;
    width: 20px;
    position: relative;
    top: 6px;
    left: -10px;
  }

  .data_source .operation-container .table-btn-group {
    text-align: right;
  }

  /* 列表区 */

  /* 类型 列 */
  .data_source .el-table .cell .data-source-icon {
    float: left;
  }

  .data_source .el-table .cell .data-source-icon img {
    width: 40px;
    height: 40px;
    position: relative;
    top: 3px;
    margin-right: 20px;
    margin-left: 10px;
  }

  .data_source .el-table .cell .data-source-icon + div {
    float: left;
  }

  .data_source .el-table .cell .data-source-name {
    line-height: 23px;
    font-size: 14px;
  }

  .data_source .el-table .cell .data-source-version {
    line-height: 22px;
    font-size: 13px;
  }

  /* 状态 列 */
  .data_source .el-table .cell .status {
    font-size: 12px;
    margin-right: 5px;
  }

  .data_source .el-table .status-1 {
    color: #55c83e;
  }

  .data_source .el-table .status-2 {
    color: #666666;
  }

  .data_source .el-table .status-3 {
    color: #f85c63;
  }

  .data_source .el-table .operation-btn {
    margin: 0 10px;
  }
</style>

