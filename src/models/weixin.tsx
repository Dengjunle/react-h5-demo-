// @ts-ignore
import { getSubject,getWheel,getUserInfo,getPrize,getGoods,addScore,getClinic,addShare,getUserWheel,addGiveUp} from '@/services/weixin';

export default {
  namespace: 'weixin',
  state: {
    subject: [],
    wheel:[
     { id: 740,
openid: "ocxKb1ZVGmVC_BzndZw4NijkhLSo",
name: "君莫笑",
phone: "13229855333",
address: null,
award: "指定澳門診所優惠券（10元）",
clinic_id: null,
type: null,
clinic_name: null,
clinic_address: null,
clinic_time: null}
    ],
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
    prize:{},
    goods:{},
    clinic:[],
    userwheel:{},
    onceStart:false
  },
  effects: {
    *fetchOnceStart({ payload,callback }, { call, put }) {
      yield put({
        type: 'onceStart',
        payload,
      });
      if (callback) callback();
    },
    *fetchSubject({ payload,callback }, { call, put }) {
      const response = yield call(getSubject, payload);
      yield put({
        type: 'setSubject',
        payload: response,
      });
      if (callback) callback(response);
    },
    *fetchWheel({payload,callback},{call,put}){
      const response = yield call(getWheel,payload);
      yield put({
        type: 'setWheel',
        payload: response,
      })
      if (callback) callback(response);
    },
    *fetchUserinfo({payload,callback},{call,put}){
      const response = yield call(getUserInfo,payload);
      yield put({
        type: 'setUserinfo',
        payload: response,
      })
      if (callback) callback(response);
    },
    *fetchPrize({payload,callback},{call,put}){
      const response = yield call(getPrize,payload);
      yield put({
        type: 'setPrize',
        payload: response,
      })
      if (callback) callback(response);
    },
    *fetchGoods({payload,callback},{call,put}){
      const response = yield call(getGoods,payload);
      yield put({
        type: 'setGoods',
        payload: response,
      })
      if (callback) callback(response);
    },
    *fetchAddScore({payload,callback},{call,put}){
      const response = yield call(addScore,payload);
      if (callback) callback(response);
    },
    *fetchClinic({payload,callback},{call,put}){
      const response = yield call(getClinic,payload);
      yield put({
        type: 'getClinic',
        payload: response,
      })
      if (callback) callback(response);
    },
    *fetchAddShare({payload,callback},{call,put}){
      const response = yield call(addShare,payload);
      if (callback) callback(response);
    },
    *fetchUserWheel({payload,callback},{call,put}){
      const response = yield call(getUserWheel,payload);
      yield put({
        type: 'getUserWheel',
        payload: response,
      })
      if (callback) callback(response);
    },
    *fetchAddGiveUp({payload,callback},{call,put}){
      const response = yield call(addGiveUp,payload);
      if (callback) callback(response);
    }
  },
  reducers: {
    setSubject(state,{payload}) {
      return {
        ...state,
        subject:payload
      };
    },
    setWheel(state,{payload}) {
      return {
        ...state,
        wheel:payload
      }
    },
    setUserinfo(state,{payload}) {
      return {
        ...state,
        userinfo:payload
      }
    },
    setPrize(state,{payload}) {
      return {
        ...state,
        prize:payload
      }
    },
    setGoods(state,{payload}) {
      return {
        ...state,
        goods:payload
      }
    },
    getClinic(state,{payload}) {
      // payload.unshift({
      //   address: "僅限廣東省內",
      //   clinic_name: "郵寄到付",
      //   id: 0
      // })
      return {
        ...state,
        clinic:payload
      }
    },
    getUserWheel(state,{payload}) {
      return {
        ...state,
        userwheel:payload
      }
    },
    onceStart(state,{payload}) {
      return {
        ...state,
        onceStart:payload
      }
    },
  }
};
