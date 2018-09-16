
import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text, Navigator, Swiper, SwiperItem } from '@tarojs/components'
import './fixed.scss'
export default class Index extends Component {
	static options = {
		addGlobalClass: true
	}
	state = {
		menuTop: 0,
		menuFixed: "",
		boxHeight: ''
	}
	componentDidMount() {

	}
	init = (res) => {
		this.webapp(res)
	}
	webapp = (res) => {
		const { top = 0 } = this.props;
		this.setState({
			boxHeight: res.height * 2,
			menuTop: res.top - top
		})
	}
	onPageScroll = (e) => {
		if (e.scrollTop > this.state.menuTop) {
			if (!this.state.menuFixed) {
				this.setState({ menuFixed: 'fixed' })
			}
		} else {
			if (this.state.menuFixed) {
				this.setState({ menuFixed: "" })
			}
		}
	}
	onff() {
		this.setState({ menuFixed: !this.state.menuFixed })
	}
	render() {
		const { menuFixed, boxHeight } = this.state;
		const { zIndex = 10, top = 0, fixedKey = "affix", children } = this.props;
		return (<View>
			<View className={menuFixed} style={{top: top * 2 + 'rpx' }} id={fixedKey} >
				{this.props.children}
			</View >
			{menuFixed ? <View style={{ height: boxHeight + "rpx" }}></View> : null}
		</View>
		)
	}
}
