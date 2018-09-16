import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView, Input, Image, Icon, Label } from '@tarojs/components'
import './index.scss'
import { connect } from '@tarojs/redux'
import action from '../../utils/action'
import ListItem from '../../components/listItem/listItem'
import { SwiperBanner, SearchBar, SwiperNews, Side, TagTabs, Fixed } from '../../components/index'

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
		this.props.dispatch({ type: "shops/load", payload: {} });
		this.fixedSearch && this.initFixed(this.fixedSearch, "#fixedTop")
		this.fixed && this.initFixed(this.fixed, "#fixedTag")
	};

	initFixed = (fd, id) => {
		let query = Taro.createSelectorQuery()
		query.select(id).boundingClientRect(fd.init).exec()
	}
	onPageScroll = (e) => {
		this.fixed && this.fixed.onPageScroll(e)
		this.fixedSearch && this.fixedSearch.onPageScroll(e)
		if (e.scrollTop > 0) {
			if (!this.state.menuFixed) {
				this.setState({ menuFixed: 'fixed' })
			}
		} else {
			if (this.state.menuFixed) {
				this.setState({ menuFixed: "" })
			}
		}
	}

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
			<View className="main">
				<Fixed ref={ref => this.fixedSearch = ref} id="fixedTop">
					<View className="topPart">
						<View className="f-h-c-b addrs pd-h">
							<View className="f-h-c">
								<Text className="icon iconfont cfff mr5">&#xe617;</Text>
								<Text className="icon iconfont cfff mr5 font-bold">东方金融广场</Text>
								<Text className="icon iconfont cfff">&#xe65e;</Text>
							</View>
							<View className="lh-1"><Text className="icon iconfont cfff map-icon">&#xe61d;</Text></View>
						</View>
						<SearchBar name="name" placeholder="输入店铺名、分类、商圈" hideBtn={1} onClick={this.onSearchFoucs.bind(this)} />
					</View>
				</Fixed>
				<SwiperNews />
				<SwiperBanner />
				<Side />
				<Fixed ref={ref => this.fixed = ref} top={82} id="fixedTag">
					<TagTabs />
				</Fixed>
				<View className="nav-bottom-space">
					{
						shops.length ?
							shops.map((item, i) => {
								return <ListItem
									key={i}
									name={item.name}
									imageUrl={item.imageUrl}
									distance={item.distance}
									tabs={item.tabs}
									sales={item.sales}
								/>
							}) :
							isLoad ? <View className="f-c-c mt5"><Text className="ft14 c999">加载中...</Text></View> : <View className="f-c-c"><Text className="ft14 c999">加载完毕!</Text></View>
					}
					{
						isLoadMore && <View className="f-c-c mt5"><Text className="ft14 c999">加载中...</Text></View>
					}
				</View>
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
