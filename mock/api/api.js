const Router = require("koa-router");
const router = Router();
// const action = require('../security/alarm/alarmProcess')

// 引入外部js
// const a = require('./action/a')

router.post('/action', function (ctx, next) {
	ctx.set('Content-Type', 'application/json');
	var data = {
		code: 200,
		message: 'ok',
		data: {
			
		}
	};
	ctx.body = JSON.stringify(data);
});

// router.use('/alarm', alarmProcess.routes());
//路由 action
// router.use('/action', a.routes());
exports = module.exports = router;

// {
// 	id: 'node1',  //id唯一
// 	color: '#333',           // 颜色
// 	x: 100,  //距离左侧距离
// 	y: 200   //距离右侧距离
//  },{
// 	id: 'node2',
// 	x: 300,
// 	y: 200
//  }