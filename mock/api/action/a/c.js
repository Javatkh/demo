const Router = require("koa-router");
const router = Router();

router.post('/c', function (ctx, next) {
	ctx.set('Content-Type', 'application/json');
	var data = {
		code: 200,
		message: 'ok',
		data: {
			name: "c"
		}
	};
	ctx.body = JSON.stringify(data);
});

exports = module.exports = router;
