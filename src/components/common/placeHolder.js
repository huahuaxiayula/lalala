
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './fixed.scss'
export default class Index extends Component {
	static options = {
		addGlobalClass: true
	}
	render() {
		const { className="" } = this.props;
		return (
			<View className={`place-h ${className}`}></View>
		)
	}
}
