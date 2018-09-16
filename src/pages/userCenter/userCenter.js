import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView, Input, Image, Icon, Label } from '@tarojs/components'
import './userCenter.scss'
import { connect } from '@tarojs/redux'
import action from '../../utils/action'

class IndexScreen extends Component {
	config = {
		enablePullDownRefresh: true,
		backgroundTextStyle: "dark",
	};

	constructor() {
		super(...arguments);
		this.state = {
			menuFixed: ""
		}
	}
	componentDidMount = () => {
		// this.props.dispatch({ type: "shops/load", payload: {} });
	};

	onPullDownRefresh = () => {
		this.props.dispatch({
			type: "shops/load",
			payload: {},
			callback: v => Taro.stopPullDownRefresh()
		});
	};

	onReachBottom = () => {
		console.log('loadingBtootom')
		this.props.dispatch(action("shops/loadMore"));
	};

	updateList = () => {
		this.props.dispatch(action("shops/search", true));
	};
	onSearchFoucs = () => {
		console.log('onclicka....')
	}
	render() {
		const { shops = [], isLoad, isLoadMore } = this.props;
		console.log(shops)
		return (
			<View className="main f-c-c">
			<Text className="ft20 c666">我的（用户中心）</Text>
			</View>
		)
	}
}

// 链接 model
export default connect(({ shops, loading }) => ({
	...shops,
	isLoad: loading.effects["shops/load"],
	isLoadMore: loading.effects["shops/loadMore"],
}))(IndexScreen);
