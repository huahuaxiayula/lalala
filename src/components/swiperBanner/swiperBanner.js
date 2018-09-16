
import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text, Navigator, Swiper, SwiperItem } from '@tarojs/components'
import './swiperBanner.scss'
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
			'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
			'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
			'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
		], } = this.props
		return (
			<View>
				<Swiper
					indicator-dots
					indicator-color="#FFFFFF"
					indicator-active-color="#4EB256"
					autoplay
					interval={3000}
					duration={500}
					circular
					className="sb-swiper"
				>
					{
						imgUrls.map((item, i) => <SwiperItem key={i}>
							<Image src={item} className="sb-img" />
						</SwiperItem>
						)
					}
				</Swiper>
			</View>
		)
	}
}
