#!/usr/bin/env node

const fs = require('fs')
const inquirer = require('inquirer')
const process = require('process')
const { Command } = require('commander')
const program = new Command()
const path = require('path')

// 引入模版文件
const templates = require('../templates/index')
const promp = [
	{
		type: 'input',
		name: 'mudleName',
		message: '请输入模块名称'
	},
	{
		type: 'input',
		name: 'pageName',
		message: '请输入页面名称'
	}
]

program.version(require('../package').version, '-v --version', 'cli的最新版本')

program
	.command('newpage')
	.description('创建一个页面')
	.action(async () => {
		const res = await inquirer.prompt(promp)
		fs.mkdirSync(`${process.cwd()}/src/router/modules`, { recursive: true }, (err) => { console.err(err) })
		fs.mkdirSync(`${process.cwd()}/src/api/${res.mudleName.toLowerCase()}`, { recursive: true }, (err) => { console.err(err) })
		fs.mkdirSync(`${process.cwd()}/src/views/${res.mudleName.toLowerCase()}/${res.pageName.toLowerCase()}`, { recursive: true }, (err) => { console.err(err) })
		fs.mkdirSync(`${process.cwd()}/src/views/${res.mudleName.toLowerCase()}/${res.pageName.toLowerCase()}/components`, { recursive: true }, (err) => { console.err(err) })

		fs.writeFile(`${process.cwd()}/src/router/modules/${res.mudleName.toLowerCase()}.js`, templates.routeGenerate(res.mudleName, res.pageName), function(err) {
			if (err) {
				console.log('创建失败：', err)
			} else {
				console.log(`/src/router/modules/${res.mudleName.toLowerCase()}.js 创建成功！`)
			}
		})
		fs.writeFile(`${process.cwd()}/src/api/${res.mudleName.toLowerCase()}/${res.pageName.toLowerCase()}.js`, templates.apiGenerate(res.mudleName, res.pageName), function(err) {
			if (err) {
				console.log('创建失败：', err)
			} else {
				console.log(`/src/api/${res.mudleName.toLowerCase()}/${res.pageName.toLowerCase()}.js 创建成功！`)
			}
		})
		fs.writeFile(`${process.cwd()}/src/views/${res.mudleName.toLowerCase()}/${res.pageName.toLowerCase()}/index.vue`, templates.indexVueGenerate(res.mudleName, res.pageName), function(err) {
			if (err) {
				console.log('创建失败：', err)
			} else {
				console.log(`/src/views/${res.mudleName.toLowerCase()}/${res.pageName.toLowerCase()}/index.vue 创建成功！`)
			}
		})
		fs.writeFile(`${process.cwd()}/src/views/${res.mudleName.toLowerCase()}/${res.pageName.toLowerCase()}/components/index.js`, templates.componentsIndexGenerate(), function(err) {
			if (err) {
				console.log('创建失败：', err)
			} else {
				console.log(`/src/views/${res.mudleName.toLowerCase()}/${res.pageName.toLowerCase()}/components/index.js 创建成功！`)
			}
		})
		fs.writeFile(`${process.cwd()}/src/views/${res.mudleName.toLowerCase()}/${res.pageName.toLowerCase()}/components/MenuBar.vue`, templates.menuBarVueGenerate(), function(err) {
			if (err) {
				console.log('创建失败：', err)
			} else {
				console.log(`/src/views/${res.mudleName.toLowerCase()}/${res.pageName.toLowerCase()}/components/MenuBar.vue 创建成功！`)
			}
		})
		fs.writeFile(`${process.cwd()}/src/views/${res.mudleName.toLowerCase()}/${res.pageName.toLowerCase()}/components/Editor.vue`, templates.editorVueGenerate(res.mudleName, res.pageName), function(err) {
			if (err) {
				console.log('创建失败：', err)
			} else {
				console.log(`/src/views/${res.mudleName.toLowerCase()}/${res.pageName.toLowerCase()}/components/Editor.vue 创建成功！`)
			}
		})
	})

program
	.command('create <projectName>')
	.description('创建一个项目')
	.action((projectName) => {
		console.log(projectName)
	})

program.parse(process.argv)