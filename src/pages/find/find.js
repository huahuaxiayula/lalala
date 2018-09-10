import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView, Input, Image, Icon, Label } from '@tarojs/components'
import './find.scss'
import Feed from '../../components/feed/feed'
import searchPng from '../../asset/images/search.png'
import lightingPng from '../../asset/images/lighting.png'
import { create } from 'dva-core';
import { connect } from '@tarojs/redux'
import action from '../../utils/action'

@connect(({ feeds, loading }) => ({
	...feeds,
	isLoad: loading.effects["feeds/load"],
	isLoadMore: loading.effects["feeds/loadMore"],
}))
export default class Index extends Component {
	config = {
		navigationBarTitleText: '首页',
		enablePullDownRefresh: true,
		backgroundTextStyle: "dark",
	};

	constructor() {
		super(...arguments);
	}

	componentDidMount = () => {
		this.props.dispatch(action("feeds/load"));
	};

	onPullDownRefresh = () => {
		this.props.dispatch(action("feeds/load"));
	};

	onReachBottom = () => {
		this.props.dispatch(action("feeds/loadMore"));
	};

	updateList = () => {
		this.props.dispatch(action("feeds/search", true));
	};

	render() {
		const { list = [], isLoad, isLoadMore } = this.props;
		return (
			<View>
				<View className='search flex-wrp'>
					<View className='search-left flex-item'>
						<View className='flex-wrp'>
							<View className='flex1'><Text className="icon iconfont">&#xe610;</Text></View>
							<View className='flex6'>
								<Input type='text' placeholder={'搜索话题, 问题或人'}
									placeholderClass='search-placeholder' /></View>
						</View>
					</View>
					<View className='search-right flex-item'>
						<Image onClick={this.updateList} src={lightingPng}></Image>
					</View>
				</View>
				<View className="weui-search-bar">
					<View className="weui-search-bar__form">
						<View className="weui-search-bar__box">
							<Icon className="weui-Icon-search_in-box" type="search" size="14"></Icon>
							<Input type="text" className="weui-search-bar__input" placeholder="搜索" />
							<View className="weui-Icon-clear">
								<Text><Icon type="clear" size="14"></Icon></Text>
							</View>
						</View>
						<Label className="weui-search-bar__label">
							<Icon className="weui-Icon-search" type="search" size="14"></Icon>
							<View className="weui-search-bar__text"><Text>搜索</Text></View>
						</Label>
					</View>
					<View className="weui-search-bar__cancel-btn">取消</View>
				</View>
				<Text className="icon iconfont">&#xe610;</Text>
				<View className='container'>
					{
						list.length ?
							list.map(item => {
								return <Feed
									key={item}
									feed_source_img={item.feed_source_img}
									feed_source_name={item.feed_source_name}
									feed_source_txt={item.feed_source_txt}
									question={item.question}
									answer_ctnt={item.answer_ctnt}
									good_num={item.good_num}
									comment_num={item.comment_num}
								/>
							}) :
							isLoad ? <View>加载中...</View> : <View>没有数据</View>
					}
					{
						isLoadMore && <View>加载中...</View>
					}
				</View>
			</View>
		)
	}
}

