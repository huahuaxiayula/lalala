
import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text, Navigator, Swiper, SwiperItem } from '@tarojs/components'
import './swiperNews.scss'
import { mainColor } from '../../constants'

export default class SearchInput extends Component {
	static options = {
		addGlobalClass: true
	}
	changeIndicatorDots(e) {
		this.setState({
			indicatorDots: !this.state.indicatorDots
		})
	}
	changeAutoplay(e) {
		this.setState({
			autoplay: !this.state.autoplay
		})
	}
	intervalChange(e) {
		this.setState({
			interval: e.detail.value
		})
	}
	durationChange(e) {
		this.setState({
			duration: e.detail.value
		})
	}
	render() {
		const { imgUrls = [
			'说时迟那时快，金轮法王一轮打向小龙女，杨过大急。。',
			'书接上回，张无忌拿到屠龙刀后发现里面放了一本小黄书',
			'特朗普耍小脾气，又要增加2000亿商品关税25%'
		], } = this.props
		return (
			<View className="mh_flex sp-n-box">
				<Text className="sp-mb">惠报</Text>
				<Swiper
					// indicator-dots={false}
					autoplay={true}
					interval={5000}
					duration={600}
					circular={true}
					vertical={true}
					className="sp-n-swiper"
				>
					{
						imgUrls.map((item, i) => <Navigator url="/pages/webView/webView?url=https://www.baidu.com" key={i}><SwiperItem className="mh_flex sp-n-item">

							<Text className="sp-text elips-one c333">{item}</Text>
							<Text className="icon iconfont c999">&#xe601;</Text>

						</SwiperItem></Navigator>
						)
					}
				</Swiper>
			</View>
		)
	}
}
