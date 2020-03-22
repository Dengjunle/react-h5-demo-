// @ts-ignore
import request from '@/utils/request';
import { stringify } from 'qs';

//获取题目
export async function getSubject() {
  return request(`/api/index/index/subject`);
}

//奖品列表
export async function getWheel() {
  return request('/api/index/index/prize_list')
}

//用户信息
export async function getUserInfo(params) {
  return request('/api/index/index/user_info',{
        method: 'POST',
        body: {
          ...params,  
        },
  })
}

//抽中的奖品
export async function getPrize(params) {
  return request('/api/index/index/prize',{
        method: 'POST',
        body: {
          ...params,  
        },
  })
}

//领取奖品
export async function getGoods(params) {
  return request('/api/index/index/goods',{
        method: 'POST',
        body: {
          ...params,  
        },
  })
}

//添加分数进入用户
export async function addScore(params) {
  return request('/api/index/index/grade',{
        method: 'POST',
        body: {
          ...params,  
        },
  })
}

//诊所信息
export async function getClinic() {
  return request('/api/index/index/clinic')
}

//添加分享次数
export async function addShare(params) {
  return request('/api/index/index/share',{
        method: 'POST',
        body: {
          ...params,  
        },
  })
}

//用户奖品信息
export async function getUserWheel(params) {
  return request('/api/index/index/show',{
    method: 'POST',
    body: {
      ...params,  
    },
})
}

//添加放棄獎品
export async function addGiveUp(params) {
  return request('/api/index/index/give_up',{
        method: 'POST',
        body: {
          ...params,  
        },
  })
}

// export async function saveTestResult(params) {
//   return request('/api/test/result', {
//     method: 'POST',
//     body: {
//       ...params,
//       method: 'post',
//     },
//   });
// }
