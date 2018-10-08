# Changelog

## 2018-10-08

- [FIXED] 修复了 `unhandled promise rejection` 没有提示的问题

## 2018-09-22

- [UPGRADE][wxapp-webpack-plugin](https://github.com/Cap32/wxapp-webpack-plugin) 更新至 `v0.19.0`，支持分包 `subPackages`

## 2018-07-03

- [UPGRADE][create-wxapp-page](https://github.com/cantonjs/create-wxapp-page) 更新至 `v2.0.8`
- [UPGRADE][wxapp-webpack-plugin](https://github.com/Cap32/wxapp-webpack-plugin) 更新至 `v0.18.0`
- [UPGRADE][wxml-loader](https://github.com/Cap32/wxml-loader) 更新至 `v0.2.2`

## 2018-05-24

- [NEW] 内置 [copy-webpack-plugin](https://github.com/webpack-contrib/copy-webpack-plugin)
- [FIXED] 修复支付宝小程序兼容问题 (8fafb9c86b9eb2f71bedd8e6b640e26e6c950b3d)
- [REMOVED] 移除 `utils/bomPolyfill.js`，新版微信小程序已经支持 (a53c86e4ce9bfdffeda87328a24ed12ec593e6e3)
- [REMOVED] 移除装逼但不实用的 webpack-dashboard (021da972b22db84e1989df792b15b84a9df758bb)
- [UPGRADE] 更新 [eslint](https://github.com/eslint/eslint) 版本 (dff76f1f36bc5018a3c65e8cdbb9f5a755ba473f)
- [UPGRADE] 更新 [jest](https://github.com/facebook/jest) 至 v21 (0c3a20bfd2e7eb31e66fc7e1a74ab5b80f6d4e21)

## 2018-03-06

- [FIXED] 修复 Windows 下路径问题 ([#21](https://github.com/cantonjs/wxapp-boilerplate/issues/21))
- [UPGRADE][wxml-loader](https://github.com/Cap32/wxml-loader) 更新至 `v0.2.1`

## 2018-03-02

- [UPGRADE][wxml-loader](https://github.com/Cap32/wxml-loader) 更新至 `v0.2.0`

## 2018-02-28

- [UPGRADE][wxml-loader](https://github.com/Cap32/wxml-loader) 更新至 `v0.1.2`

## 2017-12-31

- [FIXED] 修复打包压缩代码时 `<inline><block/></inline>` 的问题
- [UPGRADE][create-wxapp-page](https://github.com/cantonjs/create-wxapp-page) 更新至 `v2.0.2`
- [NEW] 增加 `create-component` script, 支持创建 `Component`

## 2017-12-2

- [NEW] 支持自动打包 `tabbar` 图标，无需 `copy-webpack-plugin` 等额外配置
- [UPGRADE][wxapp-webpack-plugin](https://github.com/Cap32/wxapp-webpack-plugin) 更新至 `v0.17.1`

## 2017-11-30

- [FIXED] 修复 `yarn build` 提示 ['Component' is not defined](https://github.com/cantonjs/wxapp-boilerplate/issues/15) 问题 (@julytian)

## 2017-11-18

- [NEW] 支持微信小程序 [Components](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/custom-component/)
- [UPGRADE][wxapp-webpack-plugin](https://github.com/Cap32/wxapp-webpack-plugin) 更新至 `v0.16.0`
- [UPGRADE][node-sass](https://github.com/sass/node-sass) 更新至 `v4.6.1`
- [UPGRADE][sass-loader](https://github.com/webpack-contrib/sass-loader) 更新至 `v6.0.6`

## 2017-10-27

- [NEW] 增加默认采用 [webpack-dashboard](https://github.com/FormidableLabs/webpack-dashboard) 来展示 webpack 状态
- [UPGRADE] webpack 更新至 `v3.8.1`
- [UPGRADE][create-wxapp-page](https://github.com/cantonjs/create-wxapp-page) 更新至 `v1.2.0`

## 2017-10-26

- [BREAKING] 非 `.js` （如 `.json`, `.wxss`, `.wxml`, `.png` 等等 ）文件在编译后将保持原来的文件目录结构
- [BREAKING] 资源文件引用也支持使用相对路径，例如 `pages/index/index.wxml` 里，可以使用相对路径 `../../templates/test.wxml` 来引用，保持小程序原生的开发行为
- [FIXED] 修复最新版微信开发者工具自动检测编译时出现错误
- [FIXED] 修复 `Can not resolve "vertx"` 警告

## 2017-09-22

- [NEW] 支持兼容支付宝小程序
- [FIXED] 修复 stylelint 错误提示
