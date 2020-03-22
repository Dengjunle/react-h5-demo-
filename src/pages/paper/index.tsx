import classnames from 'classnames';
import React from 'react';
import Swiper from 'swiper';
import Constants from '@/utils/constants';
import FirstPage from './InnerPage/FirstPage';
import SecondPage from './InnerPage/SecondPage';
import EndPage from './InnerPage/EndPage';
import initWx from '@/utils/wx';

import LS from 'parsec-ls';
import { connect } from 'dva';

//關注圖
import codeImg from '../../assets/innerPage/qrcode2.jpg';
import shield from '../../assets/innerPage/shield.png';
import emoji0 from '../../assets/innerPage/emoji0.png';
import emoji1 from '../../assets/innerPage/emoji1.png';
//背景圖
import homebg0 from '../../assets/innerPage/bg0.png';
import homebg1 from '../../assets/innerPage/bg.png';
import homebg2 from '../../assets/innerPage/bg1.png';
import homebg3 from '../../assets/innerPage/bg2.png';
import homebg4 from '../../assets/innerPage/bg3.png';
//獎品圖
import wheel11 from '../../assets/activity/11.png';
import wheel12 from '../../assets/activity/12.png';
import wheel13 from '../../assets/activity/13.png';
import wheel14 from '../../assets/activity/14.png';
import wheel15 from '../../assets/activity/15.png';
import wheel16 from '../../assets/activity/16.png';
import wheel17 from '../../assets/activity/17.png';
import wheel18 from '../../assets/activity/18.png';

import { Modal } from 'antd-mobile';
const alert = Modal.alert;

const shareIcon = require('@/assets/share-icon.jpeg');
const styles = require('./index.less');

const bgimglist = [
  {
    img:homebg0,
    isShow:'none'
  },
  {
    img:homebg1,
    isShow:'none'
  },
  {
    img:homebg2,
    isShow:'none'
  },
  {
    img:homebg3,
    isShow:'none'
  },
  {
    img:homebg4,
    isShow:'none'
  }
];

const STARTTIME = 3*60;//答题倒计时
function isWeixn() {
  const ua = navigator.userAgent.toLowerCase();
  return ua.includes('micromessenger');
}
interface IState {
  userinfo:Object;
  mySwiper: any;
  pageIndex: number;
  questions: Array<{
    title: { value: number; label: string };
    options: Array<{ value: number | string; label: string; score: number }>;
  }>;
  countDown: number;
  isStart:boolean;
  isEnd:boolean;
  score:number;
  showExplain:boolean;
  explainContent:Array<{
    id:number;
    value:String;
    content:String
  }>;
  selesctExplainIndex:Number;
  isShowFollow:boolean;
  isShowPartakeFollow:boolean;
  isShowShare:boolean;
  isShowNot:boolean;
}

@connect(({ weixin }) => ({
  weixin
}))
export default class extends React.Component<any, IState> {
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
      pageIndex: 11,
      mySwiper: {},
      questions: [{"title":{"value":31,"label":"目前，世界衛生組織對新冠病毒的命名是"},"options":[{"value":"A","label":"MERSr-CoV","score":0},{"value":"B","label":"SARS-Cov","score":0},{"value":"C","label":"COVID-19","score":10}]},{"title":{"value":3,"label":"手衛生可預防疾病傳播，當手部髒污，應當:"},"options":[{"value":"A","label":"不洗手","score":0},{"value":"B","label":"紙巾毛巾擦拭","score":0},{"value":"C","label":"使用肥皂和流動水洗手","score":10}]},{"title":{"value":57,"label":"洗熱水澡可以預防新冠病毒"},"options":[{"value":"A","label":"對","score":0},{"value":"B","label":"錯","score":10}]},{"title":{"value":87,"label":"水痘可以通過飛沫傳播"},"options":[{"value":"A","label":"對","score":10},{"value":"B","label":"錯","score":0}]},{"title":{"value":22,"label":"外出時，以下做法錯誤的是"},"options":[{"value":"A","label":"接觸欄杆、扶手后洗手","score":0},{"value":"B","label":"隨地吐痰","score":10},{"value":"C","label":"出入量體溫","score":0}]},{"title":{"value":33,"label":"關於飛沫傳播不正確的是"},"options":[{"value":"A","label":"顆粒較大，不會長時間在空氣中懸浮","score":10},{"value":"B","label":"說話咳嗽等可造成飛沫傳播","score":0},{"value":"C","label":"醫用口罩不能阻擋飛沫傳播","score":0}]},{"title":{"value":80,"label":"多喝水可以預防咽喉炎"},"options":[{"value":"A","label":"對","score":10},{"value":"B","label":"錯","score":0}]},{"title":{"value":73,"label":"在危機下，感到悲傷不安或暴躁都是正常的"},"options":[{"value":"A","label":"對","score":10},{"value":"B","label":"錯","score":0}]},{"title":{"value":18,"label":"對病毒沒有阻擋作用的是"},"options":[{"value":"A","label":"醫用外科口罩","score":0},{"value":"B","label":"棉布口罩","score":10},{"value":"C","label":"N95口罩","score":0}]},{"title":{"value":5,"label":"烹飪食物時，做法正確的是"},"options":[{"value":"A","label":"處理生食和熟食的廚具分開","score":10},{"value":"B","label":"處理食物前不洗手","score":0},{"value":"C","label":"食用變質的肉","score":0}]}],
      countDown:STARTTIME,
      isStart:false,
      score:0,
      isEnd:false,
      showExplain:false,//是否显示说明
      explainContent:[
        {
          id:1,
          value:'遊戲規則',
          content:'遊戲規則'
        },
        {
          id:2,
          value:'我的獎品',
          content:'我的獎品'
        },
        {
          id:3,
          value:'關於珍禧',
          content:'關於珍禧'
        }
      ],
      selesctExplainIndex:1,
      isShowFollow:false,//是否顯示關注彈框
      isShowPartakeFollow:false,//是否显示参与活动关注
      isShowShare:false,//分享指导页
      isShowNot:true,
    };
  }
  //倒计时
  public settime=():void=>{
    let {countDown,isEnd} = this.state;
    if(isEnd){
      return;
    }
    setTimeout(()=> { 
        //设置一个定时器，每秒刷新一次
        if(countDown>0){
          this.setState({
            countDown:--countDown
          })
          this.settime();
        }else {
          alert('提示', '你已超時了喲', [
            { text: '確定', onPress: () => this.toGoOut()}
          ]);
          
          return;
        }
    },1000);
  }
  //分数
  public changeScore=(score)=>{
    let oldScore = this.state.score;
    this.setState({score:oldScore+score});
  }

  //直接開始答題頁面
  private start() {
    // this.handlePrev(10)
    let {mySwiper} = this.state;
    this.setState(
      {
        pageIndex:10
      },()=>{
        mySwiper.slideTo(10)
      }
    )
    this.handleStart(true);
  }

  
  //显示说明
  private onShowExplain = () =>{
    let {showExplain} = this.state;
    this.setState({showExplain:!showExplain})
  }

  public async componentDidMount(){
    this.initPage();
    
    // @ts-ignore
    // if (isWeixn()) {
    //  await initWx({
    //     title: '澳門珍禧守護您，暴擊病毒贏大禮！',
    //     imgUrl: shareIcon,
    //     isNeedLogin: true,
    //     desc: '口罩、消毒液、體溫槍、靈芝孢子油等您贏',
    //     isFirst:true,
    //     callback:(res)=>{
    //       if(res=='userinfo'){
    //       }else if(res=='share'){
    //         this.setState({isShowShare:false})
    //       }
    //     }
    //   })
    // }
    
  }

  //改变背景图
  public changeImg=()=>{
    bgimglist.forEach((item)=>{
      item.isShow = 'none';
    })
  }

  

  public render() {
    
    // @ts-ignore
    const { 
      pageIndex, 
      mySwiper, 
      questions,
      countDown,
      isStart,
      score,
      isEnd,
      showExplain,
      explainContent,
      selesctExplainIndex,
      isShowFollow,
      isShowPartakeFollow,
      isShowShare,
      isShowNot
       } = this.state;
      const {userwheel} = this.props.weixin;
    //倒计时
    let M = Math.floor(countDown/60);
    let m = M>=10?M:'0'+M;
    let S = Math.floor(countDown%60);
    let s = S>=10?S:'0'+S;
    //背景图
    if(pageIndex==11){
      this.changeImg();
      bgimglist[0].isShow = 'block';
    }else if(pageIndex<=10&&pageIndex>7){
      this.changeImg();
      bgimglist[1].isShow = 'block';
    }else if(pageIndex<=7&&pageIndex>4){
      this.changeImg();
      bgimglist[2].isShow = 'block';
    }else if(pageIndex<=4&&pageIndex>0){
      this.changeImg();
      bgimglist[3].isShow = 'block';
    }else if(pageIndex==0){
      this.changeImg();
      bgimglist[4].isShow = 'block';
    }
    return (
      <div className={classnames('index-component', styles.home)}   
      onTouchStart={() => {
        return false;
      }}>
        <div className={classnames(styles.bgimg)}>
          {
            bgimglist.map((item,index)=>(
              <img key={index} src={item.img} style={{display:item.isShow}}/>
            ))
          }
        </div>
        <div className={classnames(styles.bgimg)} style={{display:pageIndex<10&&pageIndex>7?'block':'none'}}>
              <img  src={require('../../assets/innerPage/page1.png')} />
        </div>
        <div className={classnames(styles.bgimg)} style={{display:pageIndex<7&&pageIndex>4?'block':'none'}}>
              <img  src={require('../../assets/innerPage/page2.png')} />
        </div>
        <div className={classnames(styles.bgimg)} style={{display:pageIndex<4&&pageIndex>0?'block':'none'}}>
              <img  src={require('../../assets/innerPage/page3.png')} />
        </div>
        <div className={styles.titleLogo} style={{display:pageIndex!=11?'block':'none'}} >
         <img src={require('../../assets/innerPage/logo.png')} alt="logo" ></img>
       </div>
       <div className={styles.codeLogo} style={{display:pageIndex!=11?'block':'none'}} >
         <img src={require('../../assets/innerPage/qrcode.png')} alt="logo" ></img>
       </div>
       <div className={styles.tieshiLogo} style={{display:pageIndex!=0?'block':'none'}} onClick={()=>{this.onSelesctExplain(1);this.onShowExplain();}} >
         <img src={require('../../assets/innerPage/tieshi.png')} alt="logo" ></img>
       </div>
       <div className={styles.shareLogo}  style={{display:pageIndex==0?'block':'none'}}  onClick={()=>{this.onShowShare();}} >
         <img src={require('../../assets/innerPage/fenxiang.png')} alt="logo" ></img>
       </div>
       <div 
          className={styles.startBtn}
          onClick={() => {
            this.goOut();
          }}
          style={{display:pageIndex!=11&&pageIndex!=0?'block':'none'}}
        >
            退出答題
          </div>
        <div className="swiper-container swiper-no-swiping">
        {isStart&&!isEnd?
        <div className={styles.isStart}>
          {/* <div className={styles.score}>分数：{score}</div> */}
          <div className={styles.countDown}>
            <div className={styles.time}></div>
            <div>{m}:{s}</div>
          </div>
        <div className={styles.last}>{10-pageIndex+1}/10</div>
        </div>
          :''} 
          <div className="swiper-wrapper">
            <div className={pageIndex === 0 ? 'swiper-slide animate' : 'swiper-slide'}>
            {pageIndex === 0 && <EndPage 
            score={score} 
            countDown={countDown}  
            onOnceMore={()=>{this.onOnceMore()}} 
            swiper={mySwiper}
            onFollow={()=>{this.onFollow()}}
            onPartakeFollow={()=>{this.onPartakeFollow()}}
             />}
            </div>
            <div className={pageIndex === 1 ? 'swiper-slide animate' : 'swiper-slide'}>
              {pageIndex === 1 && (
               <SecondPage
               swiper={mySwiper}
               pageIndex={pageIndex}
               data={questions[9]}
               onPrev={realIndex => {
                 this.handlePrev(realIndex);
                 
               }}
             />
              )}
            </div>
            <div className={pageIndex === 2 ? 'swiper-slide animate' : 'swiper-slide'}>
              {pageIndex === 2 && (
               <SecondPage
               swiper={mySwiper}
               pageIndex={pageIndex}
               data={questions[8]}
               onPrev={realIndex => {
                 this.handlePrev(realIndex);
               }}
             />
              )}
            </div>
            <div className={pageIndex === 3 ? 'swiper-slide animate' : 'swiper-slide'}>
              {pageIndex === 3 && (
               <SecondPage
               swiper={mySwiper}
               pageIndex={pageIndex}
               data={questions[7]}
               onPrev={realIndex => {
                 this.handlePrev(realIndex);
               }}
             />
              )}
            </div>
            <div className={pageIndex === 4 ? 'swiper-slide animate' : 'swiper-slide'}>
              {pageIndex === 4 && (
                <SecondPage
                swiper={mySwiper}
                pageIndex={pageIndex}
                data={questions[6]}
                onPrev={realIndex => {
                  this.handlePrev(realIndex);
                }}
              />
              )}
            </div>
            <div className={pageIndex === 5 ? 'swiper-slide animate' : 'swiper-slide'}>
              {pageIndex === 5 && (
                <SecondPage
                  swiper={mySwiper}
                  pageIndex={pageIndex}
                  data={questions[5]}
                  onPrev={realIndex => {
                    this.handlePrev(realIndex);
                  }}
                />
              )}
            </div>
            <div className={pageIndex === 6 ? 'swiper-slide animate' : 'swiper-slide'}>
              {pageIndex === 6 && (
                <SecondPage
                  swiper={mySwiper}
                  pageIndex={pageIndex}
                  data={questions[4]}
                  onPrev={realIndex => {
                    this.handlePrev(realIndex);
                  }}
                />
              )}
            </div>
            <div className={pageIndex === 7 ? 'swiper-slide animate' : 'swiper-slide'}>
              {pageIndex === 7 && (
                <SecondPage
                  swiper={mySwiper}
                  pageIndex={pageIndex}
                  data={questions[3]}
                  onPrev={realIndex => {
                    this.handlePrev(realIndex);
                  }}
                />
              )}
            </div>
            <div className={pageIndex === 8 ? 'swiper-slide animate' : 'swiper-slide'}>
              {pageIndex === 8 && (
                <SecondPage
                  swiper={mySwiper}
                  pageIndex={pageIndex}
                  data={questions[2]}
                  onPrev={realIndex => {
                    this.handlePrev(realIndex);
                  }}
                />
              )}
            </div>
            <div className={pageIndex === 9 ? 'swiper-slide animate' : 'swiper-slide'}>
              {pageIndex === 9 && (
                <SecondPage
                  swiper={mySwiper}
                  pageIndex={pageIndex}
                  data={questions[1]}
                  onPrev={realIndex => {
                    this.handlePrev(realIndex);
                  }}
                />
              )}
            </div>
            <div className={pageIndex === 10 ? 'swiper-slide animate' : 'swiper-slide'}>
              {pageIndex === 10 && (
                <SecondPage
                  swiper={mySwiper}
                  pageIndex={pageIndex}
                  data={questions[0]}
                  onPrev={realIndex => {
                    this.handlePrev(realIndex);
                  }}
                />
              )}
            </div>
            <div className={pageIndex === 11 ? 'swiper-slide animate' : 'swiper-slide'}>
              {pageIndex === 11 && (
                <FirstPage
                  swiper={mySwiper}
                  onPrev={realIndex => {
                    this.handlePrev(realIndex);
                  }}
                  onStart={isStart =>{
                    this.handleStart(isStart)
                  }}
                  onShowExplain={()=>{this.onShowExplain()}}
                  onSelesctExplain={(id)=>{this.onSelesctExplain(id)}}
                  onPartakeFollow={()=>{this.onPartakeFollow()}}
                  onShowNot={()=>{this.onShowNot()}}
                />
              )}
            </div>
          </div>
        </div>
        {/* 说明详情 */}
        <div className={classnames(styles.explain,'animate')} style={{display:showExplain?'block':'none'}} >
          <div className={styles['explain-content']}>
            <div className={styles['explain-nav']}>
              {explainContent.map((item)=>(
                <div 
                className={classnames(selesctExplainIndex===item.id?styles['explain-nav-active']:'')} 
                onClick={()=>{this.onSelesctExplain(item.id)}}
                key={item.id}
                ><div>{item.value}</div></div>
              ))}
            </div>
            <div className={styles['explain-item']}>
            {explainContent.map((item)=>(
               <div 
               className={classnames(styles['explain-item'+item.id],selesctExplainIndex===item.id?styles['explain-item-active']:'')}
               key={item.id}
               >
                 {item.id==1?<div className={styles['explain-item1-content']}>
                   <div>1. 參賽人點擊進入遊戲界面，在限定時間內回答10個健康防護知識問題，答對一題得10分；</div>
                   <div>2. 每名參賽人于答題遊戲初次達到80分並關注平台公眾號，即可獲得三次抽獎機會；</div>
                   <div>3. 遊戲推廣期內，參賽人每日進入遊戲可獲得三次機會，分享活動鏈接給好友或朋友圈可再得兩次。每日分享最多可獲得六次抽獎機會，機會不限當日使用；</div>
                   <div>4. 參賽人可以對抽中的獎品選擇放棄，並繼續抽獎直至抽獎機會用完；</div>
                   <div>5. 參賽人在獲得一次有效獎品後，可以繼續參加答題活動，但不能再參加抽獎；</div>
                   <div>6. 參賽人選擇實體獎品後，須依據獎品領取點列表選擇獎品領取地點，并于活動領獎時間內到選擇的地點領取；若得獎人填寫的資料有誤，或無法于領獎時間內領獎，主辦方有權取消其得獎資格；</div>
                   <div>7. 中獎情況以電腦數據為準，以任何駭客或其它非法行為破壞活動規則者，其參加及得獎資格將作廢，且主辦單位對有關參加者或得獎者保留法律追訴權；</div>
                   <div>8. 珍禧健康舉辦本活動而收集及處理參加者的個人資料；是次活動所收集之個人資料均根據第8／2005號法律《個人資料保護法》處理，並只作為是次抽奬活動之用；</div>
                   <div>9. 參加者之個人資料僅用作是次活動記錄參加者身份及聯絡用途；在活動結束後，主辦單位會將參加者之個人資料有關資料銷毀；</div>
                   <div>10. 主辦單位有權更改此活動條款及細則而無須事前通知或負上責任；條款及細則如有任何爭議，主辦單位保留是次活動之最終解釋及決定權；</div>
                   <div>11. 如有其他咨詢或投訴，請聯繫微信公眾號：Trendyicareu。</div>
                 </div>:''}
                 {item.id==2?<div className={styles['explain-item2-content']}>
                   {userwheel.id? <div>
                    <div className={styles['explain-item2-top']}>
                     <div><img src={this.getWheelUrl(userwheel.award)} ></img></div>
                   <div>
                     <div>{userwheel.award}</div>
                     {/* <div>NO.xxxxx</div> */}
                   </div>
                   </div>
                    <div className={styles['explain-item2-center']}>

                      {userwheel.type=='快遞領取'?<div>
                        <div>您已選擇郵寄到付方式領取獎品，請耐心等待。</div>
                      </div>:''}
                      {userwheel.type=='快遞領取'?<div>
                        <div>發貨時間</div>
                        <div>2020.3.19-2020.4.1</div>
                      </div>:''}

                      {userwheel.type=='自領'?<div>
                        <div>領取時間</div>
                        <div>2020.3.19-2020.4.1</div>
                        <div>{userwheel.clinic_time}</div>
                      </div>:''}
                      {userwheel.type=='自領'?<div>
                        <div>領取地點</div>
                        <div>{userwheel.clinic_name}</div>
                        <div>{userwheel.clinic_address}</div>
                      </div>:''}

                      {userwheel.type!='自領'&&userwheel.type!='快遞領取'&&userwheel.id?<div>
                        <div>有效期</div>
                        <div>2020.12.30</div>
                      </div>:''}

                      {userwheel.type!='自領'&&userwheel.type!='快遞領取'&&userwheel.id?<div>
                        <div>在珍禧平台上的診所就診，結賬時可出示使用。</div>
                      </div>:''}

                      <div>
                        <div>客服電話</div>
                        <div>66896602</div>
                      </div>
                    </div>
                   </div>:<div className={styles['item2-center']}>趕緊去答題抽獎吧！</div>}
                 </div>:''}
                 {item.id==3?<div className={styles['explain-item3-content']}>
                   <div>珍禧健康雲平台連接澳門線下診所，開展線上診所預約服務，為用户提供便捷化專業醫療服務。創憶健康科技有限公司專注健康領域發展，主要包括健康產品研發銷售，提供健康管理服務，健康產業投資，著重於協助政府、企業及個人建立健康生活方式。</div>
                   <div>目前珍禧健康雲平台已與澳門8家診所達成合作意向，並開通線上預約服務。如果線上預約不到診所，可以通過我們的珍禧健康的客服爲你預約，揾到你身邊的診所。</div>
                   <div className={styles['explain-item3-img']}>
                     <img src={require('../../assets/innerPage/gongsi.jpg')} ></img>
                     <div>（掃碼添加，珍禧健康人工客服）</div>
                   </div>
                 </div>:''}
               {/* <div>{item.content}</div> */}
               </div>
              ))}
            </div>
            <div className={styles['explain-close']}>
            <div style={{display:selesctExplainIndex==2?'block':'none'}} className={classnames(styles['explain-close-back'])} onClick={this.onShowShare} >分享</div>
              <div className={styles['explain-close-back']} onClick={this.onShowExplain} >返回</div>
            </div>
          </div>
        </div>
        {/* 關注我們 */}
        <div className={classnames(styles.follow,'animate')} style={{display:isShowFollow?'block':'none'}} onClick={this.onFollow}>
          <div onClick={(e)=>{e.stopPropagation();e.nativeEvent.stopImmediatePropagation();}} className={styles.code}>
            <img className={styles['follow-header']} src={shield} ></img>
            <div className={styles.line}></div>
            <img className={styles['follow-code']} src={codeImg} ></img>
            <div className={styles['follow-conent']}>掃碼關注</div>
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
        {/* 分享指導頁 */}
        <div className={classnames(styles.share,'animate')} style={{display:isShowShare?'block':'none'}} onClick={this.onShowShare}>
        </div>
        {/* 关注平台参与平台 */}
        {/* 信息提交後不可更改 */}
        {/* <div className={classnames(styles.follow,'animate')} style={{display:isShowNot?'block':'none'}} onClick={this.onShowNot}>
          <div onClick={(e)=>{e.stopPropagation();e.nativeEvent.stopImmediatePropagation();}} className={styles.code}>
            <div className={styles['follow-conent1']}>活動已結束</div>
            <div className={styles['follow-conent1']}>關注公衆號有更多驚喜等著您</div>
            <img className={styles['follow-code']} src={codeImg} ></img>
            <div 
              className={styles.startBtn}
              onClick={this.onShowNot}
              >
                確認
              </div>
          </div>
        </div> */}
       </div>
    );
  }
  onShowNot= ()=>{
    let {isShowNot} = this.state;
    this.setState({isShowNot:!isShowNot})
  }

  //分享指導頁面
  private onShowShare = ()=>{
    let {isShowShare} = this.state;
    this.setState({isShowShare:!isShowShare,showExplain:false})
  }

  private onSelesctExplain = (id) => {
    this.setState({selesctExplainIndex:id})
  }

  private initPage = () => {
    const mySwiper = new Swiper('.index-component >.swiper-container', {
      direction: 'vertical',
      loop: false,
      resistanceRatio: 0,
      initialSlide: 12,
      speed: 400,

      // 如果需要分页器
      pagination: {
        el: '.swiper-pagination',
      },

      // 如果需要前进后退按钮
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      // 如果需要滚动条
      scrollbar: {
        el: '.swiper-scrollbar',
      },
      on: {
        slideChange: () => {
          // console.log('realIndex', mySwiper.realIndex);
          // this.setState({ pageIndex: mySwiper.realIndex });
        },
      },
    });

    this.setState({
      mySwiper,
    },()=>{
      const {onceStart} = this.props.weixin;
      if(onceStart){
            LS.set('isStart', true);
            LS.setObj('answers', []);
            this.start();
      }
    });
      
  };

  private handlePrev = realIndex => {
    let { mySwiper,isEnd } = this.state;
    let answers = JSON.parse(LS.get('answers'));
    let score = answers.reduce((old,news)=>{
      return old+news.score
    },0);
    if(realIndex===0){
      isEnd = true;
    }
    this.setState(
      {
        pageIndex: realIndex,
        score,
        isEnd
      },
      () => {
        if(realIndex!==11){
          mySwiper.slidePrev();
        }
      },
    );
  };
  //开始答题
  private handleStart = isStart =>{
    this.setState({
      isStart,
      isEnd:false,
      countDown:STARTTIME
    },()=>{
      this.settime();
    })
  }

  private toGoOut = () =>{
    this.initPage();
    let realIndex = 11;
    this.setState(
      {
        pageIndex: realIndex,
        score:0,
        isEnd:true,
        isShowFollow:false,
        isShowPartakeFollow:false,
      }
    );
  }

  //退出答題
  private goOut = ()=>{
    alert('提示', (<div>確定要退出嗎？</div>), [
      { text: '取消', onPress: () => {return} },
      { text: '確定', onPress: () => {this.toGoOut()} }
    ]);
  }

  //重新開始
  private onOnceMore = ()=>{
        this.setState(
          {
            score:0,
            isEnd:true,
            isShowFollow:false,
            isShowPartakeFollow:false,
          }
        );
        this.initPage();
        // let realIndex = 11;
  }

  //显示公众号二维码
  private onFollow = () =>{
    let {isShowFollow} = this.state;
    this.setState({isShowFollow:!isShowFollow})
  }
  //顯示參與抽獎關注公眾號
  private onPartakeFollow =()=>{
    let {isShowPartakeFollow} = this.state;
    this.setState({isShowPartakeFollow:!isShowPartakeFollow})
  }

  private getWheelUrl=(name)=>{
    switch(name.replace(/\s/g, "")){
      case '兒童口罩（KF80）':
        return wheel11;
      case '成人一次性口罩':
        return wheel12;
      case '夏桑菊植物飲料':
        return wheel13;
      case '消毒液':
        return wheel14;
      case '額溫槍':
        return wheel15;
      case '廣藥靈芝孢子油':
        return wheel16;
      case '指定澳門診所優惠券（10元）':
        return wheel17;
      case '指定澳門診所優惠券（20元）':
        return wheel18;
      default:return shield;
    }
  }
}
