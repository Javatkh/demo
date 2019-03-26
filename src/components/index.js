/**
 * 所有的组件统一全局注册
 */

import appHeader from './app-header'
import appSidebar from './app-sidebar'
import appContent from './app-content'
import appModuleTitle from './app-module-title'
import appModuleContent from './app-module-content'


import editElement from './edit-element/edit-element'
import requestTable from './request-table/request-table'

import apploading from './app-loading'


import g2_demo from './g2_demo'

const Components = {
	install: function(Vue) {
		Vue.component('app-header', appHeader)
		Vue.component('app-sidebar', appSidebar)
		Vue.component('app-content', appContent)
		Vue.component('app-module-title', appModuleTitle)
		Vue.component('app-module-content', appModuleContent)
		Vue.component('app-g2-demo', g2_demo)

		// 可以编辑的元素
		Vue.component('app-edit-element', editElement)
		// 数据服务的请求列表
		Vue.component('app-request-table', requestTable)

		// 自己的全局组件		
		Vue.component('apploading', apploading)
	}
}

export default Components
