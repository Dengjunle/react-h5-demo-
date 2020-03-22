// @ts-ignore
import Constants from '@/utils/constants';
// @ts-ignore
import request from '@/utils/request';
import LS from 'parsec-ls';
import { parse, stringify } from 'qs';
import wx from 'weixin-js-sdk';
import URI from 'urijs';
import { Toast } from 'antd-mobile';
const shareIcon = require('@/assets/share.png');
let ready;
const readyFn = (() => new Promise(resolve => (ready = resolve)))();
//你微信公众号绑定的域名
const httpUrl = "http://www.xxxx.com";
/*
* 判断是否IOS环境
* */
export function isIOS () {
  let isIphone = navigator.userAgent.includes('iPhone')
  let isIpad = navigator.userAgent.includes('iPad')
  return isIphone || isIpad
}

export default async ({
  title = document.title,
  desc = title,
  link = document.location.href,
  imgUrl = '',
  openid = localStorage.getItem('trendyihealth_openid'),
  appId = 'wxc3beb5e5f86f5095',
  isNeedLogin = true,
  isFirst= false,
  scope=localStorage.getItem('trendyihealthtest_scopetype')||'snsapi_userinfo',
  callback
} = {}) => {
  const getUserinfo =(type) => {
    if(callback) return callback(type)
  }
  //授权地址
  //1静默授权
  //用户第一次进入页面，先使用静默授权，调后端接口看看是否能拿到用户信息，如果拿不到就执行下面2的非静默授权进行弹框授权，后端可以拿到用户信息并注册
  //2非静默授权
  let redirect_uri = httpUrl;
  // let scope = 'snsapi_userinfo';
  // let scope = 'snsapi_base';
  let { href } = window.location;
  const uri = new URI(href);
  const query = uri.query(true);
  let code = sessionStorage.getItem('code');
  if(localStorage.getItem('trendyihealth_openid')){
    const wx_openid = localStorage.getItem('trendyihealth_openid');
    const formdata = new FormData();
    formdata.append('openid', wx_openid);
    await request(
      `${httpUrl}/api/index/index/user_info`,
      {
        method: 'POST',
        body: formdata,
      },
      {
        headers: { 'Content-Type': 'multipart/form-data;' },
      }
    ).then(async(res) => {
      if(!res){
        // alert('用户被删了,进入非静默授权')
        // scope = 'snsapi_base';
        // localStorage.setItem('trendyihealthtest_scopetype','snsapi_base');
        scope = 'snsapi_userinfo';
        localStorage.setItem('trendyihealthtest_scopetype','snsapi_userinfo');
        openid=null;
        localStorage.removeItem('trendyihealth_openid')
        sessionStorage.removeItem('code')
        document.location.replace(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirect_uri}&response_type=code&scope=${scope}&state=STATE&connect_redirect=1#wechat_redirect`);
      }
    });
  }else{
    if(!code&&!query.code&&!openid) {
      // alert('第一次进入页面，进行非静默授权')
      //第一次进入页面，进行非静默授权
      scope = 'snsapi_userinfo';
      localStorage.setItem('trendyihealthtest_scopetype','snsapi_userinfo');
      openid=null;
      localStorage.removeItem('trendyihealth_openid')
      sessionStorage.removeItem('code')
      document.location.replace(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirect_uri}&response_type=code&scope=${scope}&state=STATE&connect_redirect=1#wechat_redirect`);
    }else if(!code&&!openid&&query.code){
      sessionStorage.setItem('code',query.code);
      history.go(-(history.length -1))
  }else{
    if ((openid===null||openid === undefined||openid==='null'||openid==='') && isNeedLogin&&code&&isFirst) {
      const doLogin = async () => {
        const formdata = new FormData();
        formdata.append('code', code);
        let url = '';
        if(scope == 'snsapi_userinfo'){
          url = `${httpUrl}/api/index/index/authorize`
        }else{
          url = `${httpUrl}/api/index/index/silence`
        }
        //调code接口
        await request(
          url,
          {
            method: 'POST',
            body: formdata,
          },
          {
            headers: { 'Content-Type': 'multipart/form-data;' },
          }
        ).then(async(res) => {
          // alert('获取openid'+res.openid)
          //拿到了用户信息，进行保存
          if(res.openid){
            LS.set(Constants.openid, res.openid);
            localStorage.setItem('trendyihealth_openid',res.openid);
            await getUserinfo('userinfo');
          }
        });
      };
      await doLogin();
    }
  }
  
  }


  
  // console.log('调取jssdk参数的接口')
  let sdkNum = 0;
  //调取jssdk参数的接口
  const getSdk= async()=>{
    const formdata = new FormData();
  formdata.append('url', encodeURIComponent(location.href.split('#')[0]));
  await request(
    `${httpUrl}/api/index/index/suanfa`,
    {
      method: 'POST',
      body: formdata,
    },
    {
      headers: { 'Content-Type': 'multipart/form-data;' },
    }
  ).then(async(res) => {
    if(res.code===1){
      wx.config({
        debug: false,
        appId: appId, // 必填，公众号的唯一标识
        // jsApiList: Object.keys(wx),
        jsApiList:[
          'onMenuShareTimeline',  // 分享给朋友
          'onMenuShareAppMessage',  // 朋友圈
          'getLocation',//獲取經緯度
        ],
        timestamp:res.timestamp,
        nonceStr:res.nonceStr,
        signature:res.signature
      });
      if(localStorage.getItem('trendyihealth_openid')){
        await getUserinfo('userinfo');
      }
    }else if(res.code===0){
      if(sdkNum>=5){
        return
      }
      sdkNum++;
      await getSdk();
    }
    
  });
  }
  await getSdk();
  wx.error(e => {
    console.log('wx sdk errors:', e);
  });
  wx.ready(() => {
    wx.onMenuShareTimeline({
      title: '澳門珍禧守護您，暴擊病毒贏大禮！', // 分享标题
      link: httpUrl, // 分享链接
      imgUrl: shareIcon, // 分享图标
      success: function () { 
          addShare()
          setTimeout(()=>{
            getUserinfo('share');
          },100)
          // 用户确认分享后执行的回调函数
      }
  });
  wx.onMenuShareAppMessage({
    title: '澳門珍禧守護您，暴擊病毒贏大禮！', // 分享标题
    desc: '口罩、消毒液、體溫槍、靈芝孢子油等您贏', // 分享描述
    link: httpUrl, // 分享链接
    imgUrl: shareIcon, // 分享图标
    type: 'link', // 分享类型,music、video或link，不填默认为link
    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
    success: function () { 
        addShare()
        setTimeout(()=>{
          getUserinfo('share');
        },100)
        // 用户确认分享后执行的回调函数
    }
});
wx.getLocation({
  type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
  success: function (res) {
    LS.set('getLocation',JSON.stringify(res))
  }
})

//调取jssdk参数的接口
const addShare= async()=>{
    sessionStorage.setItem('isShare','0')
    LS.set('isShare','0');
    const userinfo = JSON.parse(sessionStorage.getItem('userinfo'))||JSON.parse(LS.get('userinfo'))
    if(userinfo.share_num>=6) return;
    const formdata = new FormData();
    formdata.append('openid', userinfo.wx_openid);
    formdata.append('share_num', userinfo.share_num);
    formdata.append('frequency', userinfo.frequency);
    await request(
      `${httpUrl}/api/index/index/share`,
      {
        method: 'POST',
        body: formdata,
      },
      {
        headers: { 'Content-Type': 'multipart/form-data;' },
      }
    ).then(async(res) => {
      if(res.code===1){
        Toast.success('分享成功+2 !!!', 1);
        await getUserinfo('userinfo');
        // const userinfo = JSON.parse(sessionStorage.getItem('userinfo'))||JSON.parse(LS.get('userinfo'))
        // const formdata = new FormData();
        // formdata.append('openid', userinfo.wx_openid);
        // await request(
        //   `${httpUrl}/api/index/index/user_info`,
        //   {
        //     method: 'POST',
        //     body: formdata,
        //   },
        //   {
        //     headers: { 'Content-Type': 'multipart/form-data;' },
        //   }
        // ).then(async(res) => {
        //   sessionStorage.setItem('userinfo',JSON.stringify(res))
        //   LS.set('userinfo',JSON.stringify(res));
        // });
      }else if(res.code===0){
    
      }
    });
}
  });
  return true;
};
