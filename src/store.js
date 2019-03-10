import Vue from 'vue'
import Vuex from 'vuex'
import localStore from 'store'		// 浏览器存储

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		// sidebarShow: true,
		nav: '',
		project: null,
		projectList: null,
		userList: null,
		user: null,
		permission: null
	},
	// 计算属性
	getters:{
		// saleProducts: (state) => {
		//     let saleProducts = state.products.map( product => {
		// 	  return {
		// 		name: product.name,
		// 		price: product.price / 2
		// 	  }
		// 	})
		// 	return saleProducts;
		// }
	},
	// 方法
	mutations: {
		// sidebarShow (state, params) {
		// 	state.sidebarShow = params.sidebarShow;
		// },
		// 当前项目
		project(state, params) {
			state.project = params
			localStore.set('project', params);
		},
		// 项目列表
		projectList(state, params) {
			state.projectList = params
			localStore.set('projectList', params);
		},
		// 切换导航
		nav(state, params) {
			state.nav = params;
			localStore.set('nav', params);
		},
		user(state, params) {
			localStore.set('user', params);
			state.user = params;
		},
		permission(state, params) {
			let permission = {};
			// 转换格式
			if (Array.isArray(params)) {
				params.forEach(v => {
					if (!permission[v.module]) {
						permission[v.module] = {}
					}
					permission[v.module][v.action] = true;
				});
			}
			localStore.set('permission', permission);
			state.permission = permission;
		}
	},
	actions: {

	}
})
