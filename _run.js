
var Benchmark = require('./index.js');
var ProgressBar = require('progress');

process.on('uncaughtException', function(e){
	process.exit(1);
});

process.on('message', async function (item) {
	var bar = new ProgressBar('[:bar] :current / :total', {
		total: Benchmark.TOTAL,
		complete: '=',
		incomplete: ' ',
		width: 50
	});

	var parser = await import(item.parser);
	var bench = new Benchmark(parser.default ?? parser);

	bench.on('progress', function () {
		bar.tick();
	});

	bench.once('result', function (stat) {
		process.send({
			mean: stat.mean(),
			sd: stat.sd()
		});
		process.exit(0);
	});
});
