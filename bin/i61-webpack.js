#!/usr/bin/env node
const program = require('commander')

program
	.name("i61-webpack")
	.description('i61 webpack tool，for dev or build mode')
	.version(require('../package').version)

program
	.command('run <mode>')
	.description('you can start by: run dev or run build')
	.option('--envAll <env>', 'set env for webpack config and service config')
	.option('--envService <envConf>', 'set service config only')
	.option('--entry <entry>', 'set entry file')
	.action((mode, conf) => {
		process.env.PROCESS_MODE = mode.toLocaleUpperCase();
		conf.envConf && (process.env.PROCESS_ENV = envConf.toLocaleUpperCase());
		conf.env && (process.env.PROCESS_ENV_CONF = env.toLocaleUpperCase());
		conf.entry && (process.env.PROCESS_PAGE = conf.entry);
		require('../config/env.config')
		require('../config/pack.config')
		require('../lib/pack-cli')(mode, conf)
	})

program
	.command('template <type>')
	.description('you can create template file by: template config or template webpack')
	.action((type) => {
		require('../lib/template-cli')(type)
	})


program.parse(process.argv)
