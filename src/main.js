import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import localStore from 'store'									// 浏览器存储
import moment from 'moment'											// 日期处理类库
import store from './store' 									  // vuex
import LiquorTree from 'liquor-tree'						// 树UI组件 https://amsik.github.io/liquor-tree
import router from './router'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/zh-CN'

import Filter from './plugin/filter'
import Request from './plugin/request'
import Components from './components'

import '@/assets/styles/reset.css'							// 重置样式
import '@/assets/styles/media.css'							// 媒体查询
import '@/assets/fonts/iconfont.css'						// 图标字体
import 'element-ui/lib/theme-chalk/index.css' 	// element-ui
import '@/assets/styles/theme.css'							// 定制element-ui
import '@/assets/styles/main.css'								// 主样式文件

Vue.use(ElementUI, { locale, size: 'small' });
Vue.use(Filter);
Vue.use(Request);
Vue.use(Components);
Vue.use(LiquorTree);

moment.locale('zh-cn');													// 设置日期国际化

// Vue.use(ElementUI, { size: 'small'}); // size用于改变组件的默认尺寸，zIndex设置弹框的初始 z-index（默认值:2000）

// 添加实例方法, 使用基于Promise的HTTP请求插件
Vue.prototype.axios = axios;
// 添加实例方法, 使用本地存储插件
Vue.prototype.localStore = localStore;
// 添加实例方法, 日期处理类库
Vue.prototype.moment = moment;

// 权限指令
let permission = '';
Vue.directive('permission', {
	bind: function (el, binding, vnode) {
		!permission && (permission = localStore.get("permission"));
		let [module, ... action] = binding.value.split('.');
		// 具备模块的权限, 并具备模块的动作权限
		// let per = permission[module];
		// if (!per || !action.some(v => per[v]) ) {
		// 	el.style = 'display:none !important';
		// }
	}
});

// 阻止 vue 在启动时生成生产提示
Vue.config.productionTip = false;

let app = new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');

export default app;
