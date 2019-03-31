const Router = require("koa-router");
const router = Router();

const c = require('./b/c')
const d = require('./b/d')

router.get('/b', function (ctx, next) {
	ctx.set('Content-Type', 'application/json');
	var data = {
		code: 200,
		message: 'ok',
		data: {
			name: "b-get"
		}
	};
	ctx.body = JSON.stringify(data);
});

// 路由a
router.use('/b', c.routes());
router.use('/b', d.routes());
exports = module.exports = router;
