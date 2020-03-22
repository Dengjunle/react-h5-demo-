// @ts-ignore
import TestPaper from '@/components/TestPaper';
import React from 'react';
import classnames from 'classnames';

const styles = require('./SecondPage.less');

interface IProps {
  swiper: any;
  onPrev: (realIndex?: number) => void;
  data: {
    title: { value: number; label: string };
    options: Array<{ value: number | string; label: string; score: number }>;
  };
  pageIndex:number;
}

interface IState {
  toggle: number;
}

export default class extends React.Component<IProps, IState> {
  render(): React.ReactNode {
    const { data, swiper, onPrev,pageIndex } = this.props;
    let pagebg='';
    if(pageIndex==10){
      pagebg=styles['second-page-component']
    }else if(pageIndex==7){
      pagebg=styles['second-page-component1']
    }else if(pageIndex==4){
      pagebg=styles['second-page-component2']
    }
    return (
      <div className={classnames([pagebg,styles['second-page']])}>
        <TestPaper
          data={data}
          callback={() => {
            if (swiper && onPrev) {
              onPrev(swiper.realIndex - 1);
            }
          }}
        />
      </div>
    );
  }
}
