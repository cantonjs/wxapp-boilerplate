# Changelog

## 2017-10-27

### 增加

- 增加默认采用 [webpack-dashboard](https://github.com/FormidableLabs/webpack-dashboard) 来展示 webpack 状态

### 更新

- webpack 更新至 `v3.8.1`


## 2017-10-26

### 变化

- 非 `.js` （如 `.json`, `.wxss`, `.wxml`, `.png` 等等 ）文件在编译后将保持原来的文件目录结构
- 资源文件引用也支持使用相对路径，例如 `pages/index/index.wxml` 里，可以使用相对路径 `../../templates/test.wxml` 来引用，保持小程序原生的开发行为

### 修复

- 修复最新版微信开发者工具自动检测编译时出现错误
- 修复 `Can not resolve "vertx"` 警告


## 2017-09-22

### 增加

- 支持兼容支付宝小程序

### 修复

- 修复 stylelint 错误提示
