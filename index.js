// !!! Sharing the dependencies of caz
module.paths = require.main.paths

const path = require('path')
const chalk = require('chalk')
const { name, version } = require('./package.json')

const date = new Date()

module.exports = {
  name,
  version,
  metadata: {
    year: date.getFullYear(),
    month: ('0' + (date.getMonth() + 1)).substr(-2),
    day: ('0' + date.getDate()).substr(-2)
  },
  prompts: [
    {
      name: 'name',
      type: 'text',
      message: '项目名称：'
    },
    {
      name: 'version',
      type: 'text',
      message: '项目初始版本：'
    },
    {
      name: 'description',
      type: 'text',
      message: '项目描述：',
      initial: '维权骑士主站项目'
    },
    {
      name: 'author',
      type: 'text',
      message: '作者：'
    },
    {
      name: 'email',
      type: 'text',
      message: '作者邮箱：'
    },
    {
      name: 'url',
      type: 'text',
      message: '作者主页（github或掘金）：'
    },
    {
      name: 'license',
      type: 'select',
      message: '项目的license：',
      hint: ' ',
      choices: [
        { value: 'MIT' },
        { value: 'BSD-3-Clause' },
        { value: 'Apache' },
        { value: 'Unlicense' }
      ]
    },
    {
      name: 'github',
      type: 'text',
      message: 'Github账号或者Github组织名称：',
      initial: 'saltire'
    },
    {
      name: 'install',
      type: 'confirm',
      message: '是否立即安装依赖：',
      initial: true
    },
    {
      name: 'pm',
      type: prev => process.env.NODE_ENV === 'test' || prev ? 'select' : null,
      message: '请选择npm包管理工具：',
      hint: ' ',
      choices: [
        { title: 'npm', value: 'npm' },
        { title: 'yarn', value: 'yarn' }
      ]
    }
  ],
  install: 'npm',
  init: true,
  setup: async ctx => {
    ctx.config.install = ctx.answers.install && ctx.answers.pm
  },
  complete: async ctx => {
    console.clear()
    console.log(chalk`使用\`${ctx.template}\`模板成功创建了项目，项目地址： \`${ctx.project}\`.\n`)
    if (ctx.dest !== process.cwd()) {
      console.log(chalk`  $ {cyan cd ${path.relative(process.cwd(), ctx.dest)}}`)
    }
    if (ctx.config.install === false) {
      console.log(chalk`  $ {cyan npm install} {gray # or yarn}`)
    }
    console.log(chalk`  $ {cyan ${ctx.config.install ? ctx.config.install : 'npm'} test}`)
    console.log(chalk`\n现在你可以使用它了)`)
  }
}
