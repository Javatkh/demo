<template>
  <div class="data_service">
    <div class="service-container clearfix">
      <!-- 侧边栏 -->
      <div class="service-sidebar">
        <el-tabs class="service-sidebar-tab"
                 :data-active="activeSidebarTab"
                 v-model="activeSidebarTab"
                 @tab-click="activeSidebarTabClick">
          <el-tab-pane name="group">
            <span slot="label"><i class="icon iconfont icon-jiekou"></i> 服务集</span>
          </el-tab-pane>
          <el-tab-pane name="history">
            <span slot="label"><i class="icon iconfont icon-zuijin"></i> 最近</span>
          </el-tab-pane>
        </el-tabs>
        <!-- 功能区 -->
        <div class="sidebar-area" v-show="activeSidebarTab === 'group'">
          <!-- 工具栏 -->
          <div class="sidebar-toolbar clearfix">
            <el-row>
              <el-col :span="4" class="toolbar-left">
                <el-tooltip class="item" effect="dark" content="搜索" placement="top">
                  <span class="toolbar-btn app-hover"><i class="icon iconfont icon-sousuo"></i></span>
                </el-tooltip>
              </el-col>
              <el-col :span="20" class="toolbar-right app-align-right">
                <el-tooltip class="item" effect="dark" content="新建文件夹" placement="top">
                  <span class="toolbar-btn app-hover"><i class="icon iconfont icon-xinjianwenjianjia"></i></span>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="新建文件" placement="top">
                  <span class="toolbar-btn app-hover"><i class="icon iconfont icon-xinjianwenjian"></i></span>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="定位文件" placement="top">
                  <span class="toolbar-btn app-hover"><i class="icon iconfont icon-dingwei"></i></span>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="收起文件夹" placement="top">
                  <span class="toolbar-btn app-hover"><i class="icon iconfont icon-hebing1"></i></span>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="排序方式" placement="top">
                  <span class="toolbar-btn app-hover"><i class="icon iconfont icon-shijianshengxu"></i></span>
                </el-tooltip>
              </el-col>
            </el-row>
            <tree
              :data="treeData">
              <span class="tree-text" slot-scope="{ node }">
                <!-- 普通节点 -->
                <template v-if="!node.hasChildren()">
                  <i class="icon iconfont icon-yemian1"></i>
                  {{ node.text }}
                </template>
                <!-- 文件夹节点 -->
                <template v-else>
                  <i class="icon iconfont"
                     :class="[node.expanded() ? 'icon-wenjianjiazhankai' : 'icon-wenjianjia2']"></i>
                  {{ node.text }}
                </template>
              </span>
            </tree>
          </div>
        </div>
        <div class="sidebar-area" v-show="activeSidebarTab === 'history'">
          <tree
            :data="treeData2">
              <span class="tree-text" slot-scope="{ node }">
                <!-- 普通节点 -->
                <template>
                  <i class="icon iconfont icon-yemian1"></i>
                  {{ node.text }}
                </template>
              </span>
          </tree>
        </div>
      </div>
      <!-- 内容区 -->
      <div class="service-content">
        <el-tabs class="service-tab" v-model="serviceTabName" type="card" @tab-remove="removeServiceTab">
          <!-- 普通tab -->
          <el-tab-pane
            v-for="(item, index) in serviceTabs"
            :closable="true"
            :key="item.name"
            :label="item.title"
            :name="item.name">

            <!-- @fixme tab切换的数据联动 离开页面未保存是否需要保存需要提示 -->

            <!-- 描述 -->
            <div class="service-section">
              <div class="section-title">
                <span class="description-expand-btn" @click="expandDescription">
                  <i class="el-icon-caret-bottom" :class="{collapse: !descriptionShow}"></i>
                </span>
                <app-edit-element
                  class="edit-name"
                  :value="info.name"
                  :edit="editStatusInfoName"
                  @input="changeInfoName"
                  @enter="editDoneInfoName"></app-edit-element>
                <span class="app-hover" @click="openEditInfoName">
                  <i class="icon iconfont icon-bianji"></i>
                </span>
              </div>
              <el-collapse-transition>
                <div class="section-content section-content-description" v-show="descriptionShow">
                  <div>
                    <el-input
                      type="textarea"
                      :rows="4"
                      placeholder="添加描述方便管理和记录"
                      v-model="info.description"></el-input>
                  </div>
                  <div class="app-align-right">
                    <el-button>取消</el-button>
                    <el-button type="primary" @click="onSaveDescription">保存</el-button>
                  </div>
                </div>
              </el-collapse-transition>
            </div>
            <!-- 请求 -->
            <div class="service-section">
              <div class="section-title">请求</div>
              <div class="section-content section-content-request">
                <!-- 请求地址 -->
                <div class="request-send">
                  <el-input class="send-url" placeholder="请求地址" v-model="info.url">
                    <el-select class="send-method" slot="prepend" v-model="info.method">
                      <el-option
                        v-for="method in methods"
                        :key="method.value"
                        :label="method.label"
                        :value="method.value"
                      ></el-option>
                    </el-select>
                  </el-input>
                  <el-button type="warning" @click="onSend">发送请求</el-button>
                  <el-button type="primary" @click="onSave">保存</el-button>
                </div>
                <!-- 请求配置 -->
                <el-tabs class="request-config"
                         v-model="activeRequestTab">
                  <el-tab-pane name="params" label="Params">
                    <app-request-table :data="paramsData"></app-request-table>
                  </el-tab-pane>
                  <el-tab-pane name="body" label="Body">
                    <div class="request-body-type">
                      <el-radio-group v-model="requestBodyType">
                        <el-radio label="form-data">form-data</el-radio>
                        <el-radio label="x-www-form-urlencoded">x-www-form-urlencoded</el-radio>
                        <el-radio label="raw">raw</el-radio>
                        <el-radio label="binary">binary</el-radio>
                      </el-radio-group>
                    </div>
                    <app-request-table :data="paramsData"></app-request-table>
                  </el-tab-pane>
                  <el-tab-pane name="headers" label="Headers">
                    <app-request-table :data="paramsData"></app-request-table>
                  </el-tab-pane>
                </el-tabs>
              </div>
            </div>
            <!-- 响应 -->
            <div class="service-section">
              <div class="section-title">响应</div>
              <div class="section-content section-content-response">
                <!-- 响应结果 -->
                <el-tabs class="response-result"
                         v-model="activeResponseTab">
                  <el-tab-pane name="body" label="Body">
                    <div class="response-result-type">
                      <el-radio-group v-model="responseResultType">
                        <el-radio-button label="pretty">美化</el-radio-button>
                        <el-radio-button label="raw">原始</el-radio-button>
                      </el-radio-group>
                    </div>
                    <div class="result-body" v-show="responseResultType === 'pretty'">
                      111
                    </div>
                    <div class="result-body" v-show="responseResultType === 'raw'">
                      222
                    </div>
                  </el-tab-pane>
                  <el-tab-pane name="headers" label="Headers">
                    <app-request-table :data="paramsData"></app-request-table>
                  </el-tab-pane>
                  <el-tab-pane name="cookies" label="Cookies">
                    <app-request-table :data="paramsData"></app-request-table>
                  </el-tab-pane>
                </el-tabs>
              </div>
            </div>

          </el-tab-pane>
          <!-- 新增 -->
          <el-tab-pane name="plus" :closable="false">
            <span slot="label"><i class="icon iconfont icon-jiahao"></i></span>
          </el-tab-pane>
          <!-- 删除 -->
          <el-tab-pane name="more" :closable="false">
            <span slot="label"><i class="icon iconfont icon-weibiaoti2zhuanhuan"></i></span>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <!-- 页脚 -->
    <div class="service-footer clearfix">
      <el-tooltip effect="dark" content="展开/收起 侧边栏" placement="top">
        <div class="btn-item app-hover" @click="activeFooterBtn('sidebar')">
          <i class="icon iconfont icon-iconqiecebianlan"></i>
        </div>
      </el-tooltip>
      <el-tooltip effect="dark" content="整理树结构" placement="top">
        <div class="btn-item app-hover" @click="activeFooterBtn('tree')">
          <i class="icon iconfont icon-_tree"></i>
        </div>
      </el-tooltip>
      <el-tooltip effect="dark" content="新建文件夹" placement="top">
        <div class="btn-item app-hover" @click="activeFooterBtn('folder')">
          <i class="icon iconfont icon-xinjianwenjianjia"></i>
        </div>
      </el-tooltip>
      <el-tooltip effect="dark" content="新建文件" placement="top">
        <div class="btn-item app-hover" @click="activeFooterBtn('file')">
          <i class="icon iconfont icon-xinjianwenjian"></i>
        </div>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'data_service',
    computed: {},
    data() {
      return {
        methods: [
          {value: 'get', label: 'GET'},
          {value: 'post', label: 'POST'},
          {value: 'put', label: 'PUT'},
          {value: 'delete', label: 'DELETE'},
          {value: 'head', label: 'HEAD'},
          {value: 'options', label: 'OPTIONS'}
        ],
        // 侧边栏
        activeSidebarTab: 'group',
        treeData: [
          {
            text: '默认文件夹',
            state: {expanded: true},
            children: [
              {text: 'Item 1', state: {visible: false}},
              {text: 'Item 2', data: {customProp: 'AAAAAAAAAAAAAAAAAAAA'}},
              {text: 'Item 3', state: {selected: true}},
              {text: 'Item 4'},
              {text: 'Item 5.1', state: {disabled: true}},
              {text: 'Item 5.2', state: {selectable: false}}
            ]
          }
          // and so on ...
        ],
        treeData2: [
          {text: 'Item 1', state: {visible: false}},
          {text: 'Item 2', data: {customProp: 'AAAAAAAAAAAAAAAAAAAA'}},
          {text: 'Item 3', state: {selected: true}},
          {text: 'Item 4'},
          {text: 'Item 5.1', state: {disabled: true}},
          {text: 'Item 5.2', state: {selectable: false}}
          // and so on ...
        ],
        // 内容区
        serviceTabName: '1',
        serviceTabs: [
          { title: 'Tab 1', name: '1'},
          { title: 'Tab 2', name: '2'}
        ],
        editStatusInfoName: false,
        descriptionShow: true,
        info: {
          description: '',
          method: 'get',
          url: '',
          name: '接口名称111'
        },
        // 请求参数
        paramsData: [
          {key: 'name', value: '12', description: '姓名'}
        ],
        requestBodyType: 'form-data',
        responseResultType: 'pretty',
        activeRequestTab: 'params',
        activeResponseTab: 'body'
      }
    },
    methods: {
      activeSidebarTabClick(tab) {

      },
      removeServiceTab(removeName) {
        let tabs = this.serviceTabs;
        let activeName = this.serviceTabName;
        if (activeName === removeName) {
          tabs.forEach((tab, index) => {
            if (tab.name === removeName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }
        this.serviceTab = activeName;
        this.serviceTabs = tabs.filter(tab => tab.name !== removeName);
      },
      // 开启编辑服务名称
      openEditInfoName() {
        this.editStatusInfoName = !this.editStatusInfoName
      },
      // 编辑服务名称
      changeInfoName(name) {
        this.info.name = name
      },
      // 编辑服务名称完成, 回车事件触发
      editDoneInfoName (name, edit) {
        this.editStatusInfoName = false
      },
      // 展开收起描述
      expandDescription () {
        this.descriptionShow = !this.descriptionShow
      },
      // 保存描述
      onSaveDescription() {

      },
      // 发送请求
      onSend() {

      },
      // 保存服务
      onSave() {

      },
      activeFooterBtn() {

      },
    },
    mounted() {

    }
  }
</script>

<style>
  .data_service {
    height: 100%;
    position: relative;
  }

  .data_service .service-container {
    height: calc(100% - 26px);
  }

  /* 侧边栏 */
  .data_service .service-sidebar {
    height: 100%;
    float: left;
    width: 200px;
    border-right: 1px solid #e2e2e2;
  }

  .data_service .service-sidebar .service-sidebar-tab .el-tabs__header {
    margin-bottom: 0;
  }

  .data_service .service-sidebar .service-sidebar-tab .el-tabs__nav {
    width: 100%;
  }

  .data_service .service-sidebar .service-sidebar-tab .el-tabs__item {
    text-align: center;
    width: 50%;
    padding: 0;
  }

  .data_service .service-sidebar .service-sidebar-tab .el-tabs__active-bar {
    width: 50% !important;
  }

  .data_service .service-sidebar .service-sidebar-tab[data-active="history"] .el-tabs__active-bar {
    transform: translateX(100%) !important;
  }

  .data_service .service-sidebar .sidebar-area {
    height: calc(100% - 40px);
  }

  .data_service .service-sidebar .sidebar-toolbar {
    height: 29px;
    line-height: 29px;
    border-bottom: 1px solid #e2e2e2;
  }

  .data_service .service-sidebar .sidebar-toolbar .toolbar-btn {
    margin: 0 5px;
    cursor: pointer;
  }

  .data_service .service-sidebar .sidebar-toolbar .toolbar-left .toolbar-btn:first-child {
    margin-left: 10px;
  }

  .data_service .service-sidebar .sidebar-toolbar .toolbar-right .toolbar-btn:last-child {
    margin-right: 10px;
  }

  /* 功能区 */
  .data_service .service-content {
    height: 100%;
    float: left;
    width: calc(100% - 201px);
    overflow: auto;
    padding: 20px;
    box-sizing: border-box;
  }

  .data_service .service-content .service-tab .el-tabs__header {
    margin-bottom: 5px;
  }

  /* 部分 */
  .data_service .service-section + .service-section {
    margin-bottom: 10px;
  }

  .data_service .service-section .section-title {
    font-weight: 500;
    font-size: 14px;
    height: 40px;
    line-height: 40px;
  }

  .data_service .service-section .section-content {

  }
  /* 部分 - 描述 */
  .data_service .service-section .section-title .description-expand-btn {
    user-select: none;
    cursor: pointer;
    margin-right: 5px;
  }
  .data_service .service-section .section-title .description-expand-btn i {
    transition: all 0.3s ease;
  }
  .data_service .service-section .section-title .description-expand-btn i.collapse {
    transform: rotate(-90deg);
    transform-origin: 50% 50%;
  }
  .data_service .service-section .section-title .edit-name {
    display: inline-block;
    margin-right: 5px;
    height: 24px;
    line-height: 24px;
    padding: 0 5px;
    border-bottom: 1px solid transparent;
  }

  .data_service .service-section .section-title .edit-name.editing {
    border-bottom: 1px solid #d5d5d5;
  }

  .data_service .service-section .section-content-description > div:first-child {
    margin-bottom: 10px;
  }
  /* 部分 - 请求 */
  .data_service .service-section .section-content-request .request-send {
    margin-bottom: 10px;
  }
  .data_service .service-section .section-content-request .request-send .send-method .el-input__inner {
    text-align: center;
    width: 120px;
    font-weight: 600;
  }

  .data_service .service-section .section-content-request .request-send .send-url {
    width: calc(100% - 157px);
  }

  .data_service .service-section .section-content-request .send-url + .el-button {
    margin-left: 10px;
  }
  .data_service .section-content-request .request-config .el-tabs__header {
    margin-bottom: 0;
  }

  .data_service .section-content-request .request-config .el-tabs__item:nth-child(2) {
    padding-left: 0;
  }

  .data_service .section-content-request .request-config .request-body-type {
    height: 45px;
    line-height: 45px;
  }

  /* 部分 - 响应 */
  .data_service .section-content-response .response-result .el-tabs__header {
    margin-bottom: 0;
  }
  .data_service .section-content-response .response-result .el-tabs__item:nth-child(2) {
    padding-left: 0;
  }
  .data_service .section-content-response .response-result .response-result-type {
    height: 50px;
    line-height: 50px;
  }

    /* 页脚 */
  .data_service .service-footer {
    height: 24px;
    line-height: 24px;
    background-color: #f8f8f8;
    border-top: 1px solid #e3e3e3;
  }

  .data_service .service-footer .btn-item:first-child {
    margin-left: 20px;
  }

  .data_service .service-footer .btn-item {
    float: left;
    margin: 0 10px;
    cursor: pointer;
  }
</style>

