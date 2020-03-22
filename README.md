# umi-dva-antd-mobile

该项目主要以 [UMI](https://umijs.org/zh/) + [DVA](https://dvajs.com/) 为底层框架，以[Ant Design Mobile](https://mobile.ant.design/)为 UI 组件库，包含完整的前端工程化实践。

部分代码及功能参考于 [Ant Design pro](https://pro.ant.design/)

## 目录结构

    |-- config                                # umi 配置，包含路由，构建等配置
    |-- mock                                  # 本地模拟数据
    |-- public                                
    |   |-- favicon.png                       # favicon
    |-- src                                   # 
    |   |-- assets                            # 本地静态资源
    |   |-- components                        # 业务通用组件
    |   |-- layout                            # 通用布局
    |   |-- models                            # 全局 dva model
    |   |-- services                          # 后台接口服务
    |   |-- pages                             # 业务页面入口和常用模板
    |   |-- e2e                               # 集成测试用例
    |   |-- global.less                       # 全局样式
    |   |-- global.tsx                         # 全局 JS
    |   |-- theme.js                          
    |-- tests                                 # 测试工具
    |-- .gitignore                            # git忽略文件
    |-- .editorconfig                         # 编辑器代码风格配置
    |-- .eslintignore                         # eslint忽略文件
    |-- .eslintrc                             # eslint规则
    |-- .prettierignore                       # 代码风格配置忽略文件
    |-- .prettierrc                           # 代码风格配置文件
    |-- .stylelintrc                          # 样式风格配置文件
    |-- package.json                          
    |-- README.md                              

## 快速开始

```javascript

// 安装项目
$ git clone --depth=1 https://github.com/Dengjunle/react-h5-demo-.git

$ cd my-project

// 安装依赖
$ yarn or npm install

// 运行
$ yarn start or npm run start # 访问 http://localhost:8080

// 打包
$ yarn build or npm run build

```
更多命令可在[package.json](./package.json)中查看


## DEMO
预览效果。

http://weixin.junguile.top/

