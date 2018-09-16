import Taro from '@tarojs/taro'
import action from "../utils/action";
import { getShops } from "../service/shops"
import delay from "../utils/delay";

const defaultParams = {
	pageSize: 0,
	pageIndex: 0,
}
export default {
	namespace: 'shops',
	state: {
		shops: [],
		searchParams: defaultParams
	},
	reducers: {
		save(state, { payload }) {
			return { ...state, ...payload };
		},
		saveMore(state, { payload: shops }) {
			return { ...state, shops: [...state.shops, ...shops] };
		},
	},
	effects: {
		* search({ payload, callback }, { all, call, put }) {
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
		* load({ payload, callback }, { all, call, put }) {
			let { result, shops, resultMessage } = yield call(getShops, { ...payload });
			yield call(delay, 1000);//增加延迟测试效果
			yield put(action("save", { shops: shops || [] }))
			callback && callback()
		},
		* loadMore({ payload }, { all, call, put }) {
			let { result, shops, resultMessage } = yield call(getShops);
			yield call(delay, 1000);//增加延迟测试效果
			yield put(action("saveMore", shops || []))
		},
	},
};
