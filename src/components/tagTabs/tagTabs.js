
import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView, Image, Text, Navigator, Swiper, SwiperItem, Icon } from '@tarojs/components'
import './tagTabs.scss'

export default class SearchInput extends Component {
	static options = {
		addGlobalClass: true
	}
	state = {
		activeTagKey : 0
	}
	changeIndicatorDots(e) {
		this.setState({
			indicatorDots: !this.state.indicatorDots
		})
	}
	onTapTab (activeTagKey) {
		this.setState({activeTagKey})
	}
	render() {
		const { activeTagKey } = this.state;
		const { tags = [
			'全部',
			'快餐',
			'电影',
			'KTV',
			'滑冰',
			'药片',
			'电影',
			'KTV',
			'滑冰',
			'药片',
			'咖啡'
		], } = this.props
		return (
			<View className="tt-n">
				<ScrollView scroll-x className="tt-n-box">
					{
						tags.map((el, i) => <View onClick={this.onTapTab.bind(this,i)} key={i} className={`tt-n-item ${activeTagKey==i?"tt-n-active":""}`}><Text className="tt-n-text">{el}</Text></View>)
					}
				</ScrollView>
			</View>
		)
	}
}
