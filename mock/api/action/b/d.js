const Router = require("koa-router");
const router = Router();

router.post('/d', function (ctx, next) {
	ctx.set('Content-Type', 'application/json');
	var data = {
		code: 200,
		message: 'ok',
		data: {
			name: "d"
		}
	};
	ctx.body = JSON.stringify(data);
});
router.get('/d', function (ctx, next) {
	ctx.set('Content-Type', 'application/json');
	var data = {
		code: 200,
		message: 'ok',
		data: {
			name: "d-get"
		}
	};
	ctx.body = JSON.stringify(data);
});

exports = module.exports = router;
