# i61-webpack
对webpack配置进行了封装，方便统一管理

### 内置环境变量
PROCESS_ENV：标识当前的环境，本地、开发、测试、预发布、生产

标识 | 描述
---|---
LOCAL | 本地环境
DEV | 开发环境
TEST | 测试环境
PRE | 预发布环境
PROD | 生产环境
GRAY | 灰度环境


### i61-webpack run XXX

`dev`:开发模式

`build`:打包模式

|  配置项   | 描述  |
| :-----| :---- |
| -envAll  | 设置业务配置和webpack配置的环境
| -envService  | 只设置业务配置环境
| -page  | 打包指定页面

修改环境常用于本地加载webpack配置，同时业务配置使用测试环境的

```
npm run dev -envService test
```

### i61-webpack template xxx

`webpack`:生成webpack配置

`config`:生成业务环境配置

配置文件自动生成到`projectFolder/config`目录下

### 使用说明

#### 启动命令
```
"scripts": {
    "dev": "cross-env PROCESS_ENV='LOCAL' i61-webpack run dev",
    "build": "cross-env PROCESS_ENV='LOCAL' i61-webpack run build"
}

/*** or ***/

"scripts": {
    "dev": "i61-webpack run dev -envAll local",
    "build": "i61-webpack run build -envAll test"
}
```
#### 自定义配置文件

通过`i61-webpack template config` 生成配置文件，文件约定位于项目根目录的config文件夹下

env.config.js 存放业务逻辑相关的配置，称为业务配置

pack.config.js 存放webpack打包相关的配置，目前主要有如下：

|  字段   | 默认值  | 描述  |
| :-----| :---- | :---- |
| outputPath  | resolvePath('../dist') | 打包后的文件输出位置
| publicPath  | '/' | 文件的基础路径
| htmlTemplatePath  | resolvePath('src/index.html') | html模板位置
| isShowAnalyzer  | false| 是否显示包分析
| sassVariateFile  | [] | 公共的sass变量

#### 自定义webpack逻辑

通过`i61-webpack template webpack` 生成webpack配置文件，文件约定位于项目根目录的config文件夹下

可以通过webpack-merge合并配置项，也暴露了一个webpackChain的函数修改配置

https://github.com/Yatoo2018/webpack-chain/tree/zh-cmn-Hans

可以复用已有配置，也可以自定义

基础配置请看：http://gitlab.61info.com/i61/i61-common-webpack/tree/master/lib
```javascript
// webpack.dev.js
module.exports = {
	...webpackConfig,
	webpackChain(config) {
		// to add custom webpack config
	}
}
```




