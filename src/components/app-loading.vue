<template>
  <div class="app-module-content">
    
    <!-- 父传子通过props拿到值 -->
    <div class="masage">
      <p>{{msgFather}}</p>
    </div>
    <!-- 子传父 -->
    <div><button @click="dealBtn">点我</button></div>
    
  </div>
</template>

<script>
export default {
  name: "app-module-content",
  computed: {},
  props: ['msgFather'],
  data() {
    return {};
  },
  methods: {
    dealBtn(){
      this.$emit("sendVal",123)
    }
  }
};
</script>

<style>
.app-module-content {
  height: calc(100% - 80px);
  padding: 20px 40px;
}
.el-row {
  /* margin-bottom: 20px; */
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
button{
  z-index: 3;
}
</style>
