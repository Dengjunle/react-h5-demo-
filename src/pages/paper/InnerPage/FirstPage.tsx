import React from 'react';
import LS from 'parsec-ls';
import router from 'umi/router';
const styles = require('./FirstPage.less');

interface IFirstPageState {
  isStart:boolean;
}

interface IFirstPageProps {
  swiper: any;
  onPrev: (realIndex?: number) => void;
  onStart: (isStart?:boolean) => void;
  onShowExplain:()=>void;
  onSelesctExplain:(id?:number)=>void;
  onPartakeFollow:()=>void;
  onShowNot:()=>void;
}

export default class extends React.Component<IFirstPageProps, IFirstPageState> {
  constructor(props) {
    super(props);
    this.state = {
      isStart:false,
    };
  }
 //显示说明
  onShowExplain = () =>{
    this.props.onSelesctExplain(3);
    this.props.onShowExplain();
  } 
  onSelesctExplain = () =>{
    this.props.onSelesctExplain(1);
    this.props.onShowExplain();
  }
  onShowNot =() =>{
    this.props.onShowNot()
  }

  render(): React.ReactNode {
    return (
      <div className={styles['first-page-component']}>
       {/* 说明详情 */}
       <div className={styles.titleLogo}>
         <img src={require('../../../assets/innerPage/bg0logo.png')} alt="logo" ></img>
       </div>
       <div  className={styles.logo}>
       <img src={require('../../../assets/innerPage/bg01.png')} alt="logo"/>
       </div>
        
        <div className={styles.innerContent}>
          <div 
          className={styles.startBtn}
          onClick={() => {
            this.handleStart();
            // this.onShowNot();
          }}>
            開始遊戲
          </div>
          <div 
          className={styles.startBtn}
          onClick={() => {
            this.handleLuck();
            // this.onShowNot();
          }}>
            去抽獎
          </div>
          <div 
          className={styles.startBtn}
          onClick={() => {
            this.onShowExplain();
          }}>
            澳門珍禧
          </div>
        </div>
        {/* <div className={styles.tieshi} onClick={()=>{this.onSelesctExplain()}}>
        <img 
          src={require('../../../assets/innerPage/tieshi.png')} 
          alt="logo" 
          />
        </div> */}
        
      </div>
    );
  }

  private handleLuck =()=>{
    // const userinfo = JSON.parse(LS.get('userinfo'));
    // if(userinfo.follow==0){
    //   this.props.onPartakeFollow();
    //   return;
    // }
    // if(userinfo.grade<80){
    //   this.props.onNoPartakeFollow();
    //   return;
    // }
    router.replace('/wheel')
  }

  private handleStart = ()=>{
    const { swiper, onPrev, onStart } = this.props;
    this.setState(
      {
        isStart: true,
      },
      () => {
        setTimeout(() => {
          LS.set('isStart', true);
          LS.setObj('answers', []);
          if (swiper && onPrev) {
            onPrev(swiper.realIndex - 1);
            onStart(true);
          }
        }, 500);
      }
    );
  }
}
