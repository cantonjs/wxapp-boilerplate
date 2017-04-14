# wxapp-boilerplate
微信小程序项目开发 boilerplate


## 功能

- 支持引用 `node_modules` 模块
- 支持通过配置 `alias` 来避免 `../../../` 之类的模块引用
- 通过 `babel` 支持更丰富的 `ES6` 兼容，包括 `async/await`
- 内置 `promise` 和 `lodash`（`lodash` 按需引入相应模块，不会全部引入）
- 使用 `scss` 编写 `.wxss` 文件，内置了一些有用的 `mixins` 和 `extends`
- 提供 `__DEV__` 和 `process.env.NODE_ENV` 全局常量辅助开发
- 支持在 `production` 环境下压缩代码


## 使用方法

确保安装了 [Node.js](https://nodejs.org/) (>= `v6.0`) 和 [yarn](https://yarnpkg.com)

1. `git clone` 此项目
2. 通过命令行工具 `cd` 到这个目录，执行 `yarn` 安装依赖模块
3. 执行 `yarn start` 开始开发


## 相关项目

- [react-lib-boilerplate](https://github.com/cantonjs/react-lib-boilerplate)
- [front-end-lib-boilerplate](https://github.com/cantonjs/front-end-lib-boilerplate)
- [node-cli-boilerplate](https://github.com/cantonjs/node-cli-boilerplate)

## License

MIT
