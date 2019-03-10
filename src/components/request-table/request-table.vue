<template>
  <div class="request-table">
    <el-table
      border
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="key"
        label="Key"
        width="350px">
        <template slot-scope="scope">
          <span class="empty-text" v-show="scope.row.isNew && !scope.row.key">新键</span>
          <app-edit-element
            :class="{'is-new': scope.row.isNew}"
            :data="scope.row"
            name="key"
            :value="scope.row.key"
            @input="changeEditValue"></app-edit-element>
        </template>
      </el-table-column>
      <el-table-column
        prop="value"
        label="Value">
        <template slot-scope="scope">
          <span class="empty-text" v-show="scope.row.isNew && !scope.row.value">新值</span>
          <app-edit-element
            :class="{'is-new': scope.row.isNew}"
            :data="scope.row"
            name="value"
            :value="scope.row.value"
            @input="changeEditValue"></app-edit-element>
        </template>
      </el-table-column>
      <el-table-column
        prop="description"
        label="描述">
        <template slot-scope="scope">
          <span class="empty-text" v-show="scope.row.isNew && !scope.row.description">描述</span>
          <app-edit-element
            :class="{'is-new': scope.row.isNew}"
            :data="scope.row"
            name="description"
            :value="scope.row.description"
            @input="changeEditValue"></app-edit-element>
        </template>
      </el-table-column>
      <el-table-column
        prop="description"
        label=""
        width="45"
        align="center">
        <template slot-scope="scope">
          <span class="app-hover" @click="removeRow(scope)">
            <i class="icon iconfont icon-remove"></i>
          </span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "request-table",
    computed: {
      tableData: function() {
        this.data.forEach(d => {
        })
        // @特殊处理, 初始渲染需要添加新节点
        if (!this.init) {
          this.insertNewRow(this.data)
        }
        return this.data
      }
    },
    props: {
      data: {
        type: Array,
        default: []
      }
    },
    data() {
      return {
        init: false,
      };
    },
    methods: {
      // 编辑字段
      changeEditValue(value, self) {
        let data = self.data;
        if (value) {
          // @特殊处理, 如果点击最后一行, 则需要新增新行
          if (data.isNew) {
            // 修改当前行的数据
            data.isNew = undefined
            this.insertNewRow(this.data)
          }
          data[self.key] = value
        }
      },
      // 删除条目
      removeRow(scope) {
        console.log(scope)
      },
      // 新增新行
      insertNewRow(data) {
        data.push({
          isNew: true,
          key: '',
          value: '',
          description: ''
        })
      }
    },
    mounted() {
      this.init = true
    }
  };
</script>

<style>
  .request-table {

  }
  .request-table .edit-element {
    border: 1px solid transparent;
  }
  .request-table .edit-element.focused {
    border: 1px solid #d5d5d5;
    background-color: #fff;
  }
  .request-table .empty-text {
    position: absolute;
    color: #a3a4a7;
    height: 28px;
    line-height: 28px;
  }
  .request-table .el-table__row > td {
    padding: 2px 0;
  }
  .request-table .el-table__row > td > .cell {
    padding-left: 4px !important;
    padding-right: 4px;
  }
</style>
