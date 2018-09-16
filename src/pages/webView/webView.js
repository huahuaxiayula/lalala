import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './webView.scss'

export default class Index extends Component {
	state = {
		url:null
	}
	componentDidMount(){
		this.setState({url:this.$router.params.url || null})
	}
	render() {
		return (
			<web-view src={this.$router.params.url}></web-view>
		)
	}
}

