import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView, Input, Image, Icon, Label } from '@tarojs/components'
import './index.scss'
import Feed from '../../components/feed/feed'
import searchPng from '../../asset/images/search.png'
import lightingPng from '../../asset/images/lighting.png'
import { create } from 'dva-core';
import { connect } from '@tarojs/redux'
import action from '../../utils/action'
import SearchBar from '../../components/searchBar/searchBar'

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
	onSearchFoucs = () =>{
		console.log('onclicka....')
	}
	render() {
		const { list = [], isLoad, isLoadMore } = this.props;
		return (
			<View>
				<View className="topPart">
					<SearchBar name="name" placeholder="输入店铺名、分类、商圈" hideBtn={1} onClick={this.onSearchFoucs.bind(this)}/>
				</View>
				
<View className="weui-panel">
            <View className="weui-panel__hd"><Text>文字列表附来源</Text></View>
            <View className="weui-panel__bd">
                <View className="weui-media-box weui-media-box_text">
                    <View className="weui-media-box__title"><Text>标题一</Text></View>
                    <View className="weui-media-box__desc"><Text>由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。</Text></View>
                    <View className="weui-media-box__info">
                        <View className="weui-media-box__info__meta"><Text>文字来源</Text></View>
                        <View className="weui-media-box__info__meta"><Text>时间</Text></View>
                        <View className="weui-media-box__info__meta weui-media-box__info__meta_extra"><Text>其它信息</Text></View>
                    </View>
                </View>
            </View>
        </View>

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

