
import Mock from "mockjs";

// JSON和图片默认暴露
import banner from './banner.json'
import floor from './floor.json'

Mock.mock('/mock/banner','get',{code:200,data:banner})

Mock.mock('/mock/floor','get',{code:200,data:floor})
