
import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text, Navigator, Swiper, SwiperItem } from '@tarojs/components'
import './side.scss'

export default class Index extends Component {
	render() {
		return (
			<View className="sd-box">
				<Text className="sd-text">附近优惠</Text>
				<View className="sd-line"></View>
			</View>
		)
	}
}
