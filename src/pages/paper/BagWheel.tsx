// @ts-ignore
import Constants from '@/utils/constants';
import classnames from 'classnames';
import { connect } from 'dva';
import LS from 'parsec-ls';
import React, { Component, RefObject } from 'react';
import router from 'umi/router';
import request from '@/utils/request';
import initWx from '@/utils/wx';

//關注圖
import codeImg from '../../assets/innerPage/qrcode2.jpg';
import shield from '../../assets/innerPage/shield.png';
import emoji0 from '../../assets/innerPage/emoji0.png';
import emoji1 from '../../assets/innerPage/emoji1.png';

import { Modal,List, InputItem, Radio,TextareaItem,Toast } from 'antd-mobile';
const styles = require('./BagWheel.less');
const alert = Modal.alert;
const shareIcon = require('@/assets/share-icon.jpeg');
export type GiftType = {
  type: string;
  key: number;
  id: number;
  name: string;
  title: string;
};

interface IBagWheelState {
  userinfo:any;
  wheelGoods: GiftType[];
  btnEnable: boolean;
  modalVisible: boolean;
  prizeType: boolean;
  errorMsg?: string;
  successMsg?: string;
  gift: any;
  formData: {
    rcvrAddress: string;
    rcvrName: string;
    rcvrPhone: string;
  };
  showExplain:boolean;
  isShowNoPartakeFollow:boolean;
  isShowWheeled:boolean;
  isShowDelivery:boolean;
  selectAddress:number;
  username:string;
  phone:string;
  delivery:string;
  deliveryAddress:string;
  isShowMsg:boolean;
  isShowShare:boolean;
  isShowPartakeFollow:boolean;
  isShowNoScore:boolean;
  isShowAlert:boolean;
  isGiveUpe:boolean;
}

function isWeixn() {
  const ua = navigator.userAgent.toLowerCase();
  return ua.includes('micromessenger');
}


@connect(({ weixin }) => ({
  weixin
}))
class BagWheel extends Component<any, IBagWheelState> {
  private timer: any;
  private loops: RefObject<HTMLDivElement> = React.createRef();
  private wheelPanel: RefObject<HTMLDivElement> = React.createRef();
  private wheelBtn: RefObject<HTMLDivElement> = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      userinfo:{
        id: 142,
        top_img: "http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKZmewFkdvEyjW1hXicg096SjVzBbzqPWVqowretdbKcjiaicAia1vaJia5mLXoagia1y3ibewMEhhiaOicBFg/132",
        wx_name: "水往低处流",
        grade: 80,
        draw: 1,
        share_num: 6,
        wx_openid: "ocxKb1ZVGmVC_BzndZw4NijkhLSo",
        frequency: 9,
        unionid: "oHiOPw7Z77VYWHIbulRccLs44kSc",
        follow: 1,
        createtime: 1584081500
      },
      modalVisible: false,
      prizeType: false,
      successMsg: '',
      errorMsg: '',
      formData: {
        rcvrName: '',
        rcvrPhone: '',
        rcvrAddress: '',
      },
      gift: {
          id: 20,
          name: '謝謝惠顧',
      },
      wheelGoods: [{"key":0,"id":11,"name":"兒童口罩（KF80）","title":"兒童口罩（KF80）","type":"REAL"},{"key":1,"id":20,"name":"再來一次","title":"再來一次","type":"REAL"},{"key":2,"id":13,"name":"夏桑菊植物飲料","title":"夏桑菊植物飲料","type":"REAL"},{"key":3,"id":16,"name":"廣藥靈芝孢子油","title":"廣藥靈芝孢子油","type":"REAL"},{"key":4,"id":12,"name":"成人一次性口罩","title":"成人一次性口罩","type":"REAL"},{"key":5,"id":17,"name":"指定澳門診所優惠券（10元）","title":"指定澳門診所優惠券（10元）","type":"REAL"},{"key":6,"id":18,"name":"指定澳門診所優惠券（20元）","title":"指定澳門診所優惠券（20元）","type":"REAL"},{"key":7,"id":14,"name":"消毒液","title":"消毒液","type":"REAL"},{"key":8,"id":19,"name":"謝謝參與","title":"謝謝參與","type":"REAL"},{"key":9,"id":15,"name":"額溫槍","title":"額溫槍","type":"REAL"}], // 大转盘物品列表
      btnEnable: true, // 防止用户频繁点击
      showExplain:false,//是否显示说明
      isShowNoPartakeFollow:false,//抽獎次數不足頁面
      isShowWheeled:false,//抽中的獎品頁面
      isShowDelivery:false,//收貨信息頁面
      selectAddress:-1,//選擇的地址id
      username:'',//收貨人姓名
      phone:'',//手機號
      delivery:'自領',//配送方式
      deliveryAddress:"",//配送地址
      isShowMsg:false,//信息提交後不可更改
      isShowShare:false,//分享指导页
      isShowPartakeFollow:false,//關注參與抽獎頁面
      isShowNoScore:false,//不夠80分的頁面
      isShowAlert:true,
      isGiveUpe:true,//是否已經放棄獎品
    };
  }

  public componentDidMount =async()=>{
    // //ios平台解决方案
    // window.addEventListener('pagehide', async()=> {
    // });
    //   //安卓处理解决方案
    // window.onunload = async()=> {
    // }
    // @ts-ignore
    // if (isWeixn()) {
    //   await initWx({
    //      title: '澳門珍禧守護您，暴擊病毒贏大禮！',
    //      imgUrl: shareIcon,
    //      isNeedLogin: true,
    //      desc: '口罩、消毒液、體溫槍、靈芝孢子油等您贏',
    //      callback:(res)=>{
    //       if(res=='userinfo'){
    //         this.getUserinfo();
    //       }else if(res=='share'){
    //         this.setState({isShowShare:false})
    //       }
    //      }
    //    })
    //  }
    // let getLocation = JSON.parse(LS.get('getLocation'));
    this.getUserinfo(true);

    let getLocation:any = {};
    getLocation.longitude = 114.23075;
    getLocation.latitude = 29.57;
    //百度地图api定位 结合微信公众号权限定位进行
    // 百度地图的key=
    //定位
    // await request(`http://www.xxxx.com/baiduapi/geocode/regeo?key=xxxxxxxxxxxxxxxxxxxxxxxxxxx&location=${getLocation.longitude},${getLocation.latitude}`,
    //     {
    //         method: 'POST',
    //     }
    //     ).then((res)=>{
    //       if(res.status == 1){
    //         let city = res.regeocode.addressComponent.city;
    //         let province = res.regeocode.addressComponent.province;
    //         if(city.indexOf('澳門')!=-1||city.indexOf('澳门')!=-1||province.indexOf('广东')!=-1||province.indexOf('廣東')!=-1||province.indexOf('澳門')!=-1||province.indexOf('澳门')!=-1){
    //           // alert('提示', '您在'+province+city, [
    //           //   { text: '確定', onPress: () => console.log('cancel') }
    //           // ]);
    //         }else{
    //           alert('提示', '您在'+province+city+'，此活動僅限廣東/澳門地區用戶參加', [
    //             { text: '確定', onPress: () => router.replace('/') }
    //           ]);
    //         }
    //       }
    //       console.log('定位',res)
    //     }).catch((res)=>{
    //       console.log('定位失敗',res.status);
    //     }); 
  }


  public getUserinfo =(isShowAlert=false) => {
    let {userinfo} = this.state;
    //判斷是否已抽獎
    // if(userinfo.draw){
    //   if(isShowAlert){
    //     alert('提示', '您已經領獎了', [
    //       { text: '確定', onPress: () => console.log('cancel') }
    //     ]);
    //   }
    // }
  }

  public setPrize =() => {
    // let openid = LS.get(Constants.openid);
    this.setState({ btnEnable: false});
          let gift = [{"key":0,"id":11,"name":"兒童口罩（KF80）","title":"兒童口罩（KF80）","type":"REAL"}]
          this.setState({gift:gift[0],isGiveUpe:false})
            //获取抽中的奖品接口
            this.animation((this.state.wheelGoods.length - gift[0].key) * 36);
            // 动画结束后提示用户获取的奖励
            // @ts-ignore
            const goalSectorEle: React.HTMLAttributes = this.refs[`sector${gift[0].id}`];
            // 删除样式
            setTimeout(() => {
              // TODO 跳转到 奖品显示也面
              this.setState({ btnEnable: true });
              this.onWheeled();
            }, 7000);
  }


  public render() {
    const { 
      successMsg, 
      errorMsg, 
      wheelGoods,
      showExplain,
      isShowNoPartakeFollow,
      isShowWheeled,
      gift,
      selectAddress,
      delivery,
      isShowDelivery,
      isShowMsg,
      isShowShare,
      isShowPartakeFollow,
      isShowNoScore} = this.state;
      // console.log('userinfo',JSON.parse(LS.get('userinfo')),JSON.parse(sessionStorage.getItem('userinfo')))
    // const userinfo = JSON.parse(sessionStorage.getItem('userinfo'))||JSON.parse(LS.get('userinfo'));
    const {clinic,userinfo} = this.props.weixin;
    return (
      <div className={styles['bag-wheel-component']}>
        {successMsg && <div className={styles['alert-box']}>{successMsg}</div>}
        {errorMsg && (
          <div className={classnames(styles['alert-box'], styles.error)}>{errorMsg}</div>
        )}
         <div className={styles.titleLogo} >
         <img src={require('../../assets/innerPage/logo.png')} alt="logo" ></img>
       </div>
       <div className={styles.codeLogo} >
         <img src={require('../../assets/innerPage/qrcode.png')} alt="logo" ></img>
       </div>
        <div className={styles['wheel-wrapper']}>
          <div className={styles['wheel-box']}>
            {/* 转盘闪环 */}
            <div className={styles['wheel-loop']} ref={this.loops}>
              {[...Array(18)].map(this.setLoopEle)}
            </div>
            {/* 转盘物品 */}
            <div className={styles['wheel-goods-box']} ref={this.wheelPanel}>
              {wheelGoods.map(this.wheelItemsEle)}
            </div>
            {/* 转盘按钮 */}
            <div className={classnames(styles['wheel-btn-box'], styles['flex-center'])}>
              <div className={classnames(styles.btn, styles['wheel-btnTop'])}/>
              <div className={classnames(styles.btn, styles['wheel-btn'])} ref={this.wheelBtn}>
                <div className={classnames(styles['wheel-yuan'])}>
                  {/* <div></div> */}
                  {/* <img src={require('../../assets/activity/wheel/wheel_btn.png')} ></img> */}
                </div>
                <div className={classnames(styles['wheel-jiantou'])}></div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.wheelBtn} onClick={this.getPrize}>
          開始抽獎{userinfo.grade>=80?`(${userinfo.frequency})`:''}
        </div>
        <div className={styles.wheelBtn} onClick={this.goBack}>
          返回
        </div>
        {/* <div className={styles.wheelBtn} onClick={this.onShowExplain}>
          说明
        </div>
         */}
         {/* 抽獎次數不足 */}
         <div className={classnames(styles.follow,'animate')} style={{display:isShowNoPartakeFollow?'block':'none'}} onClick={this.onNoPartakeFollow}>
          <div onClick={(e)=>{e.stopPropagation();e.nativeEvent.stopImmediatePropagation();}} className={styles.code}>
            <img className={styles['follow-emoji']} src={emoji1} ></img>
            <div className={styles.line}></div>
            <div className={styles['follow-conent']}>您的抽獎機會不足</div>
            <div 
              className={styles.startBtn}
              onClick={()=>{this.onOnceMorerouter()}}
              >
                再玩一次
              </div>
              <div 
              className={styles.startBtn}
              onClick={() => {
                this.onShowShare();
              }}
              >
                分享有禮
              </div>
              <div>(分享可增加抽獎次數)</div>
          </div>
        </div>
        {/* 抽中的獎品 */}
        <div className={classnames(styles.follow,'animate')} style={{display:isShowWheeled?'block':'none'}}>
          <div onClick={(e)=>{e.stopPropagation();e.nativeEvent.stopImmediatePropagation();}} className={styles.code}>
            <div className={classnames(styles['wheel-gift'])}>
              <img src={require( `../../assets/activity/${gift.id}.png`)} ></img>
            </div>
            <div className={styles['follow-conent1']}>您抽中了 {gift.name}</div>
            {gift.id!=19&&gift.id!=20?
              <div>
                <div 
                className={styles.startBtn}
                onClick={this.onShowExplain}
                >
                  立即領取
                </div>
                <div 
                className={styles.startBtn}
                onClick={()=>{this.onWheeled();}}
                >
                  放棄獎品
                </div>
              </div>
              :
              <div>
                <div 
                className={styles.startBtn}
                onClick={()=>{this.getPrize();}}
                >
                再抽一次
              </div>
              <div 
                className={styles.startBtn}
                onClick={()=>{this.setState({isShowWheeled:false})}}
                >
                關閉
              </div>
              </div>
              }
          </div>
        </div>
        
        {/* 说明详情 */}
        <div className={classnames(styles.explain,'animate',showExplain?styles['showExplain']:'')} style={{display:showExplain?'block':'none'}} >
          <div className={styles['explain-content']}>
            <div className={styles['explain-nav']}>
            郵寄到付：
            </div>
            <div className={styles['explain-item1']}>
              <div className={styles['explain-srcoll']}>
                <div className={styles['explain-items']}>
                  <div className={styles['explain-dian']}>·</div>
                  <div  
                  className={classnames(styles['explain-address'],selectAddress==0?styles['explain-address-active']:'')} 
                  onClick={()=>this.onSelectAddress(0)}>
                      <div>郵寄到付</div>
                      <div>僅限廣東省內</div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles['explain-nav']}>
              請於下列領取地點選擇：
            </div>
            <div className={styles['explain-item2']}>
              <div className={styles['explain-srcoll']}>
                {clinic.map((item)=>(
                  <div className={styles['explain-items']} key={item.id}>
                    <div className={styles['explain-dian']}>·</div>
                    <div  
                    className={classnames(styles['explain-address'],selectAddress==item.id?styles['explain-address-active']:'')} 
                    onClick={()=>this.onSelectAddress(item.id)}>
                       <div>{item.clinic_name}</div>
                       <div>{item.address}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles['explain-close']} >
              <div className={classnames(styles['explain-close-enter'],selectAddress>=0?styles['explain-close-back']:styles['explain-noclose'])} onClick={this.onSetUserAddress} >確認</div>
              <div className={styles['explain-close-back']} onClick={this.onShowExplainBack} >返回</div>
            </div>
          </div>
        </div>
        {/* 添加收貨信息 */}
        <div 
        className={classnames(styles.explain,'animate',isShowDelivery?styles['showExplain']:'')} 
        style={{display:isShowDelivery?'block':'none'}} 
        >
          <div className={styles['explain-content']}>
            <div className={styles['explain-nav']}>
              請填寫以下領獎信息：
            </div>
            <div className={styles['explain-item']}>
              <div className={styles['explain-srcoll']}>
              <List >
              <InputItem
                clear
                placeholder={'請填寫收貨人姓名'}
                onChange={e => {
                  this.setState({
                    username: e
                  });
                }}
              >領獎人</InputItem>
              <InputItem
                clear
                placeholder={'請填寫手機號'}
                onChange={e => {
                    this.setState({
                      phone: e
                    });
                }}
              >手機號</InputItem>
              </List>
              {/* {gift.id!=17&&gift.id!=18?<List renderHeader={() => '領取方式'}>
                {distribution.map(i => (
                  <RadioItem key={i.value} checked={delivery === i.value} onChange={() => this.setState({delivery:i.value})}>
                    {i.label}
                  </RadioItem>
                ))}
              </List>:''} */}
              {selectAddress==0?<List renderHeader={() => '收貨地址(貨到付款，僅支持廣東省內)'} >
                <TextareaItem
                  onChange={(value) => this.setState({deliveryAddress:value})}
                  rows={3}
                  placeholder="請填寫收貨地址"
                />
              </List>:''}
              
              </div>
            </div>
            <div className={styles['explain-close']} >
              <div className={classnames(styles['explain-close-back'])} onClick={this.onDelivery} >確認</div>
              <div className={styles['explain-close-back']} onClick={this.onDeliveryClose} >放棄獎品</div>
            </div>
          </div>
        </div>
        {/* 信息提交後不可更改 */}
        <div className={classnames(styles.follow,'animate')} style={{display:isShowMsg?'block':'none'}} onClick={this.onMsg}>
          <div onClick={(e)=>{e.stopPropagation();e.nativeEvent.stopImmediatePropagation();}} className={styles.code}>
            <div className={styles['follow-conent1']}>信息提交後不可更改，是否確認？</div>
            <div 
              className={styles.startBtn}
              onClick={this.onSubmit}
              >
                確認
              </div>
              <div 
              className={styles.startBtn}
              onClick={this.onMsg}
              >
                返回
              </div>
          </div>
        </div>
        {/* 关注平台参与平台 */}
        <div className={classnames(styles.follow,'animate')} style={{display:isShowPartakeFollow?'block':'none'}} onClick={this.onPartakeFollow}>
          <div onClick={(e)=>{e.stopPropagation();e.nativeEvent.stopImmediatePropagation();}} className={styles.code}>
            <img className={styles['follow-emoji']} src={emoji0} ></img>
            <div className={styles.line}></div>
            <div className={styles['follow-conent']}>關注平台參與抽獎</div>
            <img className={styles['follow-code']} src={codeImg} ></img>
          </div>
        </div>
        {/* 关注平台後分數不夠80分 */}
        <div className={classnames(styles.follow,'animate')} style={{display:isShowNoScore?'block':'none'}} onClick={this.onShowNoScore}>
          <div onClick={(e)=>{e.stopPropagation();e.nativeEvent.stopImmediatePropagation();}} className={styles.code}>
            <img className={styles['follow-emoji']} src={emoji0} ></img>
            <div className={styles.line}></div>
            <div className={styles['follow-conent']}>答題超過80分才可以抽獎</div>
            <div 
              className={styles.startBtn}
              onClick={()=>{this.onOnceMorerouter()}}
              >
                去答題
              </div>
          </div>
        </div>
         {/* 分享指導頁 */}
         <div className={classnames(styles.share,'animate')} style={{display:isShowShare?'block':'none'}} onClick={this.onShowShare}>
        </div>
      </div>
    );
  }
  //再玩一次答題直接進入答題頁
  private onOnceMorerouter() {
    const {dispatch} = this.props;
    dispatch({
      type:"weixin/fetchOnceStart",
      payload:true,
      callback:()=>{
        router.replace('/')
      }
    })
    
  }
  //顯示不夠80分的提示
  private onShowNoScore = () =>{
    let {isShowNoScore} = this.state;
    this.setState({isShowNoScore:!isShowNoScore})
  }
  //顯示參與抽獎關注公眾號
  private onPartakeFollow =()=>{
    let {isShowPartakeFollow} = this.state;
    if(isShowPartakeFollow){
      this.getUserinfo();
    }
    this.setState({isShowPartakeFollow:!isShowPartakeFollow})
  }
  //分享指導頁面
  private onShowShare = ()=>{
    let {isShowShare} = this.state;
    this.setState({isShowShare:!isShowShare,isShowNoPartakeFollow:false})
  }

  private setLoopEle = (datas, index) => {
    if (index % 2 === 0) {
      return (
        <i
          className={classnames(styles.loop, styles.dot2)}
          key={index}
          style={{ transform: `rotate(${index * 20}deg)` }}
        />
      );
    } else {
      return (
        <i
          className={classnames(styles.loop, styles.dot1)}
          key={index}
          style={{ transform: `rotate(${index * 20}deg)` }}
        />
      );
    }
  };

  //显示说明
  private onShowExplain = () =>{
    let {showExplain,gift} = this.state;
    if(gift.id==17||gift.id==18){
      this.setState({isShowWheeled:false,isShowDelivery:true})
    }else{
      this.setState({showExplain:!showExplain,isShowWheeled:false})
    }
  }
  //返回選填地址到領取頁面
  private onShowExplainBack =()=>{
    this.setState({isShowWheeled:true,showExplain:false})
    
  }
  //返回首页
  private goBack = () => {
    router.replace('/')
  }

  //抽獎次數不足
  private onNoPartakeFollow = () =>{
    let {isShowNoPartakeFollow} = this.state;
    this.setState({isShowNoPartakeFollow:!isShowNoPartakeFollow})
  }
  //抽中的獎品頁面
  private onWheeled = () => {
    let {isShowWheeled,gift} = this.state;
    if(isShowWheeled){
      alert('提示', (<div>您確定要放棄此獎品嗎？</div>), [
        { text: '取消', onPress: () => this.setState({isShowWheeled:true,btnEnable: true}) },
        { text: '確定', onPress: () => { 
            this.setState({isGiveUpe:true,btnEnable: true})
            return
          } }
      ]);
    }
    this.setState({isShowWheeled:!isShowWheeled,btnEnable: true})
  }
  //選擇地址
  private onSelectAddress = (id) => {
    this.setState({selectAddress:id})
  }
  //填寫收貨頁面
  private onSetUserAddress = () =>{
    const {selectAddress} = this.state;
    if(selectAddress<0) return;
    this.onShowExplain();
    this.setState({isShowDelivery:true});
  }
  //確認收貨信息填寫
  private onDelivery = () =>{
    const{username,phone,deliveryAddress,selectAddress} = this.state;
    if(!username){
      Toast.info('請填寫收貨人姓名', 1);
      return;
    }
    if(!phone){
      Toast.info('請填寫手機號', 1);
      return;
    }
    let test = /^[0-9]*$/;
    if(phone.search(test)==-1){
      Toast.info('手機號只能是数字组成', 1);
      return;
    }
    if(selectAddress==0&&!deliveryAddress){
      Toast.info('請填寫收貨地址', 1);
      return;
    }else if(selectAddress>0){
      this.setState({deliveryAddress:''})
    }
    this.onMsg();
  }
  //關閉收貨信息填寫
  private onDeliveryClose = () =>{
    let {isShowDelivery,gift} = this.state;
    if(isShowDelivery){
      alert('提示', (<div><div>您確定要放棄此獎品嗎？</div><div>確認放棄后該獎品不能再領取</div></div>), [
        { text: '取消', onPress: () => {return} },
        { text: '確定', onPress: () =>{
          this.setState({isShowDelivery:!isShowDelivery}) 
          this.setState({isGiveUpe:true})
          return
        }}
      ]);
      return;
    }
    this.setState({isShowDelivery:!isShowDelivery});
  }
  //返回信息確認頁
  private onMsg = () => {
    let {isShowMsg} = this.state;
    this.setState({isShowMsg:!isShowMsg});
  }
  private onSubmit = () =>{
        Toast.success('領取成功!', 1);
        router.replace('/')
        this.setState({
          isShowMsg:false,
          isShowDelivery:false,
          isShowWheeled:false,
          showExplain:false
        })
  }

  /**
   * 点击抽奖
   */
  private getPrize = async() => {

    // alert('提示', '抽獎活動已結束', [
    //   { text: '確定', onPress: () => router.replace('/') }
    // ]);



    console.log(this.state.btnEnable)
    await this.getUserinfo();
    // clearTimeout(this.timer);
    this.setState({isShowWheeled:false})
    const userinfo = this.state.userinfo;
    //判断有没有关注
    if(userinfo.follow==0){
      this.onPartakeFollow();
      return;
    }
    //判斷是否夠80分
    if(userinfo.grade<80){
      this.onShowNoScore();
      return;
    }
    // //判斷是否已抽獎
    // if(userinfo.draw){
    //   alert('提示', '您已經領獎了', [
    //     { text: '確定', onPress: () => console.log('cancel') }
    //   ]);
    //   return;
    // }
    //判斷是否有抽獎次數
    if(userinfo.frequency<1){
      this.onNoPartakeFollow();
      return;
    }
    
    if (this.state.btnEnable) {
      // this.setState({ btnEnable: false}); // 禁止用户连续点击
      this.setPrize();
    }
    this.timer = setTimeout(() => {
      this.setState({ btnEnable: true });
    }, 2000);
  };

  /**
   * 获取到奖品后执行动画
   * @param circle
   */
  private animation = circle => {
    // 周围小球交换显示
    // const loopTime = setInterval(() => {
    //   const loopEle = this.loops.current.children;
    //   for (let i = 0; i < loopEle.length; i++) {
    //     if (/(dot1)/.test(loopEle[i].className)) {
    //       setTimeout(() => {
    //         loopEle[i].className = `${styles.loop} ${styles.dot2}`;
    //       }, 100);
    //     } else {
    //       loopEle[i].className = `${styles.loop} ${styles.dot1}`;
    //     }
    //   }
    // }, 300);
    // setTimeout(() => {
    //   clearInterval(loopTime);
    // }, 6000);
    // @ts-ignore
    const wheelPanel: React.HTMLAttributes = this.wheelPanel.current;
    let initDeg = 0;
    if (wheelPanel.style.transform) {
      initDeg = wheelPanel.style.transform.replace(/[^0-9]/gi, '') * 1;
    }
    // 缓冲为6圈
    wheelPanel.style.transform = `rotate(${3600 + circle + initDeg - (initDeg % 360)}deg)`;
  };

  /******************生成标签层*********************/

  /**
   * 初始化标签方法
   * @param datas
   */
  private wheelItemsEle = (item, index) => {
    const sectorRef: string = `sector${item.id}`;
    return (
      <div className={styles['wheel-item']} key={index}>
        <div className={styles.sector}>
          <div
            className={classnames(styles.sectorCss,styles['sectorCss'+item.id])}
            ref={sectorRef}
            style={{
              transform: `rotate(${item.key * 36 -18}deg) skewY(-54deg)`,
            }}
          />
        </div>
        <div className={styles['wheel-goods']} style={{ transform: `rotate(${item.key * 36}deg)` }}>
          <div className={styles['wg-icon']}>
            <div className={styles['wg-icon-bg'+item.id]}></div>
          </div>
        </div>
      </div>
    );
  };
}

export default BagWheel;
