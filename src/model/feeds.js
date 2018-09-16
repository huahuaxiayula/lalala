import Taro from '@tarojs/taro'
import action from "../utils/action";
import {getShops} from "../service/feeds"
import delay from "../utils/delay";

export default {
  namespace: 'feeds',
  state: {list: []},
  reducers: {
    save(state, {payload}) {
      return {...state, ...payload};
    },
    saveMore(state, {payload: list}) {
      return {...state, list: [...state.list, ...list]};
    },
  },
  effects: {
    * search(_, {all, call, put}) {
      Taro.showLoading({
        title: '搜索中...',
      });
      try {
        let loadPro = yield put(action("load"));
        yield call(() => loadPro);
      } finally {
        Taro.hideLoading();
      }
    },
    * load({payload}, {all, call, put}) {
      let {result,shops,resultMessage} = yield call(getShops);
      // let {shops,code} = yield call(s.postRequest, {
      //   url: 'https://gateway.imeihui.top/home/shoplist'
      // });
      // console.log('loaddddd:',shops)
      yield call(delay, 1000);//增加延迟测试效果
      yield put(action("save", {shops,list:[]}))
    },
    * loadMore({payload}, {all, call, put}) {
      let {data} = yield call(getShops);
      yield call(delay, 1000);//增加延迟测试效果
      yield put(action("saveMore", data))
    },
  },
};
