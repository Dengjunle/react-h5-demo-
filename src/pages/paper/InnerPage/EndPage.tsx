import React from 'react';
import router from 'umi/router';
import LS from 'parsec-ls';
import classnames from 'classnames';
import { connect } from 'dva';
const styles = require('./EndPage.less');


interface IEndPageProps {
  swiper: any;
  onOnceMore:()=>void;
  onFollow:()=>void;
  score:Number;
  countDown:number;
  onGetUserinfo:()=>void;
  onPartakeFollow:()=>void;
}

@connect(({ weixin }) => ({
  weixin
}))
export default class extends React.Component<any,IEndPageProps> {
  constructor(props) {
    super(props);
    // this.state = {};
  }
 //显示说明
  onShowExplain = () =>{
    // this.props.onShowExplain();
  } 
  onOnceMore = () =>{
    this.props.onOnceMore();
  }
  // onSelesctExplain=()=>{
  //   this.props.onShowShare();
  // }
  
  public componentDidMount(): void {
    const {score} = this.props;
    if(score>=80){
      this.addScore(score);
      this.props.onGetUserinfo();
    }
  }

  public render(): React.ReactNode {
    const {score,countDown} = this.props;
    return (
      <div className={styles['end-page-component']}>
        <div  className={classnames(styles.logo,score>=80?styles.logohege:'')}>
            <img src={score>=80?require('../../../assets/innerPage/hege.png'):require('../../../assets/innerPage/buhege.png')} alt="logo"/>
        </div>
        <div className={styles.innerContent}>
          <div className={styles.innerAchievement}>
            <div className={styles.innerScore}>{score}</div>
            <div className={styles.innerMin} >本次用時 {180-countDown}秒</div>
          </div>
          <div 
          className={classnames(styles.startBtn,score>=80?styles.bigStartBtn:'')}
          onClick={() => {
            this.handleLuck();
          }}>
            立即抽獎
          </div>
          <div 
          className={styles.startBtn}
          onClick={() => {
            this.onOnceMore();
          }}>
            再玩一次
          </div>
          <div 
          className={styles.startBtn}
          onClick={() => {
            this.handleFollow();
          }}
          >
            關注我們
          </div>
        </div>
        {/* <div className={styles.tieshi} onClick={()=>{this.onSelesctExplain()}}>
        <img 
          src={require('../../../assets/innerPage/fenxiang.png')} 
          alt="logo" 
          />
        </div> */}
      </div>
    );
  }

  //获取用户信息
  public addScore =(grade) => {
    const userinfo = JSON.parse(LS.get('userinfo'));
    let openid = userinfo.wx_openid;
    const {dispatch} = this.props;
    dispatch({
      type:"weixin/fetchAddScore",
      payload:{openid,grade},
      callback:(res)=>{
      }
    })
  }

  private handleLuck =()=>{
    // const {score} = this.props;
    // const userinfo = JSON.parse(LS.get('userinfo'));
    // //判断有没有关注
    // if(userinfo.follow==0){
    //   this.props.onPartakeFollow();
    //   return;
    // }
    // if(score<80&&userinfo.grade<80){
    //   this.props.onNoPartakeFollow();
    //   return;
    // }
    router.replace('/wheel')
  }

  private handleFollow =()=>{
    this.props.onFollow();
  }
}
