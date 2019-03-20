import Vue from 'vue'
import store from './store'
import Router from 'vue-router'

Vue.use(Router);

// 根页面
import main from '@/views/main.vue'
import demo from '@/views/demo.vue'
import empty from '@/views/empty.vue'

// 登录
const login = resolve => require(['@/views/login/login.vue'], resolve);

// 项目管理
const project_manage = resolve => require(['@/views/project_manage/project_manage.vue'], resolve);

// 项目管理子模块的父页面
const project = resolve => require(['@/views/project/project.vue'], resolve);
// 分析
const data_analysis = resolve => require(['@/views/project/data_analysis/data_analysis.vue'], resolve);
// 数据源
const data_source = resolve => require(['@/views/project/data_source/data_source.vue'], resolve);
// 数据服务
const data_service = resolve => require(['@/views/project/data_service/data_service.vue'], resolve);
// 数据模型
const data_model = resolve => require(['@/views/project/data_model/data_model.vue'], resolve);
// 设置
const setting = resolve => require(['@/views/project/setting/setting.vue'], resolve);

// 设置 - 时区设置
const time_zone = resolve => require(['@/views/project/setting/server/time_zone.vue'], resolve);
// 设置 - 重启
const restart = resolve => require(['@/views/project/setting/server/restart.vue'], resolve);
// 设置 - 版本更新
const version = resolve => require(['@/views/project/setting/system/version.vue'], resolve);
// 设置 - 语言设置
const language = resolve => require(['@/views/project/setting/system/language.vue'], resolve);
// 设置 - 数据库备份
const db_backup = resolve => require(['@/views/project/setting/system/db_backup.vue'], resolve);
// 设置 - 远程FTP
const ftp = resolve => require(['@/views/project/setting/system/ftp.vue'], resolve);

//demo
const quanju = resolve => require(['@/views/demo/quanju.vue'], resolve); 


// 错误页面
const page404 = resolve => require(['@/views/common/page-404.vue'], resolve);
const page403 = resolve => require(['@/views/common/page-403.vue'], resolve);
const page500 = resolve => require(['@/views/common/page-500.vue'], resolve);

// 测试
const test = resolve => require(['@/views/test.vue'], resolve);

const router = new Router({
	routes: [
		// {
		// 	path: '/', redirect: '/login', name: '/' //@fixme 需要全局判断用户是否已经登录
		// },
		{
			path: '/main', name: 'main', component: main,
			children: [
				// {
				// 	path: '/', redirect: 'asset_manage', @fixme 需要业务区分来跳转具体哪个页面
				// },
				{
					path: 'project_manage', name: 'project_manage', component: project_manage, meta: {name: '项目管理'}
				},
				{
					path: 'project/:project_id', name: 'project', component: project,
					children: [
						// {
						// 	path: '/', redirect: 'asset_manage', @fixme 需要业务区分来跳转具体哪个页面
						// },
						{
							path: 'data_analysis', name: 'data_analysis', component: data_analysis, meta: {name: '分析'}
						},
						{
							path: 'data_source', name: 'data_source', component: data_source, meta: {name: '数据源'}
						},
						{
							path: 'data_service', name: 'data_service', component: data_service, meta: {name: '数据服务'}
						},
						{
							path: 'data_model', name: 'data_model', component: data_model, meta: {name: '数据模型'}
						},
						{
							path: 'setting', name: 'setting', component: setting, meta: {name: '设置'},
							children: [
								// {
								// 	path: '/', redirect: 'asset_manage', @fixme 需要业务区分来跳转具体哪个页面
								// },
								{
									path: 'time_zone', name: 'time_zone', component: time_zone, meta: {name: '时区'}
								},
								{
									path: 'restart', name: 'restart', component: restart, meta: {name: '重启'}
								},
								{
									path: 'version', name: 'version', component: version, meta: {name: '版本更新'}
								},
								{
									path: 'language', name: 'language', component: language, meta: {name: '语言设置'}
								},
								{
									path: 'db_backup', name: 'db_backup', component: db_backup, meta: {name: '数据库备份'}
								},
								{
									path: 'ftp', name: 'ftp', component: ftp, meta: {name: '远程FTP'}
								}
							]
						}
					]
				},
				{
					path: 'quanju', name: 'quanju', component: quanju, meta: {name: 'demo'}
				}
			]
		}
		// ,
		// {
		// 	path:'/demo',name:'demo', component: demo,
		// 	children:[
		// 		{
		// 			path: 'quanju', name: 'quanju', component: quanju, meta: {name: 'demo'}
		// 		}
		// 	]
		// }
		,
		{
			path: '*', component: page404
		},
		{
			path: '/login', name: 'login', component: login
		},
		{
			path: '/404', name: 'page-404', component: page404
		},
		{
			path: '/403', name: 'page-403', component: page403
		},
		{
			path: '/500', name: 'page-500', component: page500
		},
		{
			path: '/test', name: 'test', component: test
		},
	]
});

// 被忽略的路由地址
const ignore = [
	'/', 'login', 'page-404', 'page-403', 'page-500'
]

/**
 * 主要用来拦截路由的钩子
 * @param to Route: 即将要进入的目标 路由对象
 * @param from: Route: 当前导航正要离开的路由
 * @param next: Function: 一定要调用该方法来 resolve 这个钩子
 */
router.beforeEach((to, from, next) => {
	// let path = to.path === '/' ? to.path : to.path.substring(1);
	// let index = path.indexOf('/');
	// // 控制菜单显示
	// store.commit('sidebarShow', {sidebarShow: true});
	// 控制导航菜单
	// store.commit('navName', {navName: index === -1 ? path : path.substring(0, index)});

	next()
	// // 控制页面权限
	// // @特殊处理, 过滤无关路由, 可以显示的路由, 权限内的路由
	// let permission = Vue.prototype.localStore.get("permission") || store.state.permission;
	// let per = permission[to.name]
	// if (ignore.indexOf(to.name) !== -1 || to.meta.show || per && per.query) {
	// 	next();
	// } else {
	// 	if (!to.name) {
	// 		router.push({name: 'page-404'});
	// 	} else {
	// 		router.push({name: 'page-403'});
	// 	}
	// }
});

export default router
