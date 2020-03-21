# 问卷调查平台小程序版

#### 此项目是问卷调查平台的小程序端项目

#### API接口文档 https://www.showdoc.cc/EasyQuestionnaire

#### (web端) https://github.com/yuzhanglong/EasyQuestionnaire-web

#### 后端项目地址：https://github.com/yuzhanglong/EasyQuestionnaire-backend


## 项目结构
```
EasyQuestionnaire-MiniProgram
├─ app.js            // 项目入口
├─ app.json          // 配置
├─ app.wxss
├─ assets            // 静态文件
│  └─ image
│     ├─ GitHub.png
│     └─ shareImg.jpg    // 分享时的配图
├─ components            // 组件目录
│  ├─ baseCard           // 基础卡片组件
│  ├─ basicInfo          // 基本信息组件
│  ├─ betterTabBar       // tabbar组件
│  ├─ bottomMessage      // 底部信息组件
│  ├─ charts             // 图标相关(未启用)
│  │  └─ pieChart
│  ├─ iViewUi            // 项目所依赖的ui 作出了一些小小的修改
│  ├─ my-table           // 表格组件
│  └─ topBar             // 顶部组件
├─ models                // 模型
│  ├─ problemModel.js
│  ├─ questionnaireModel.js
│  └─ ResponseModel.js
├─ network               // 请求封装
│  ├─ analysis.js
│  ├─ complete.js
│  ├─ config.js
│  ├─ questionnaire.js
│  ├─ requests.js
│  └─ user.js
├─ pages                 // 视图文件
│  ├─ analysis           // 数据分析页面
│  ├─ basicEdition       // 问卷基本信息编辑页面
│  ├─ basicInfoEdition   // 问卷主副标题编辑页面
│  ├─ complete           // 填报页面
│  │  ├─ childCmp
│  │  │  └─ completeCard   // 填报问题卡片
│  ├─ detailedAnalysis     // 单个题目的数据分析页面
│  ├─ manage               // 问卷管理页面
│  │  ├─ childCmp
│  │  │  └─ itemCard       
│  ├─ problemEdition       // 问卷编辑页面
│  │  ├─ childCmp
│  │  │  └─ optionCard
│  ├─ profile              // 个人中心
│  ├─ questionnaire
│  │  ├─ childCmp
│  │  │  └─ problemCard
│  └─ success              // 填报成功页面
├─ project.config.json
├─ README.md               // 项目自述
├─ sitemap.json
├─ utils                   // 工具相关
│  ├─ base64.js
│  ├─ messageBox.js
│  └─ timeHelper.js
└─ wxs                     // 全局wxs
   └─ common.wxs

```