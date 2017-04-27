# wxapp-boilerplate
使用 `webpack`, `babel`, `scss` 开发的微信小程序项目脚手架


## 功能

- 支持引用 `node_modules` 模块
- 支持通过配置 `alias` 来避免 `../../../` 之类的模块引用
- 通过 `babel` 支持更丰富的 `ES6` 兼容，包括 `async/await`
- 内置 `promise` 和 `lodash`（`lodash` 按需引入相应模块，不会全部引入）
- 使用 `scss` 编写 `.wxss` 文件，内置了一些有用的 `mixins` 和 `extends`
- 提供 `__DEV__` 和 `process.env.NODE_ENV` 全局常量辅助开发
- 通过命令行快速创建微信小程序页面
- 支持在 `production` 环境下压缩代码


## 开始使用

确保安装了 [Node.js](https://nodejs.org/) (>= `v6.0`) 和 [yarn](https://yarnpkg.com)

1. `git clone` 此项目
2. 通过命令行工具 `cd` 到这个目录，执行 `yarn` 安装依赖模块
3. 执行 `yarn start` 开始开发
4. 通过微信开发者工具，添加 `dist` 目录到项目上


## 内置命令

- `yarn start` 启动 `webpack` 开发项目，能监听文件变化自动重新编译
- `yarn build` 编译生成 `production` 环境的代码到 `dist` 
- `yarn create` 快速创建微信小程序页面


## 注意

暂不支持直接引入 `app.json` 上的 `tabBar.list.iconPath` 和 `tabBar.list.selectedIconPath` 文件，需要配合 `copy-webpack-plugin` 手动引入


## 相关项目

- [react-lib-boilerplate](https://github.com/cantonjs/react-lib-boilerplate)
- [front-end-lib-boilerplate](https://github.com/cantonjs/front-end-lib-boilerplate)
- [node-cli-boilerplate](https://github.com/cantonjs/node-cli-boilerplate)

## License

MIT
