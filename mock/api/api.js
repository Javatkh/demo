const Router = require("koa-router");
const router = Router();
// const action = require('../security/alarm/alarmProcess')

// 引入外部js
const a = require('./action/a')
const b = require('./action/b')
router.post('/action', function (ctx, next) {
	ctx.set('Content-Type', 'application/json');
	var data = {
		code: 200,
		message: 'ok',
		data:{
			
		}
	};
	ctx.body = JSON.stringify(data);
	console.log("");
});

// router.use('/alarm', alarmProcess.routes());
//路由 action
router.use('/action', a.routes());
router.use('/action', b.routes());
exports = module.exports = router;
