
import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import './listItem.scss'
import { distanceRx } from '../../utils'
const defaultSales = {
	"name": "肯德基",
	"imageUrl": "",
	"distance": 200,
	"tabs": [
		0
	],
	"sales": [
		{
			"type": 0,
			"title": "交行",
			"desc": "周四满20减10"
		},
		{
			"type": 1,
			"title": "银联",
			"desc": "银联二维码五折，5元封顶"
		},
		{
			"type": 2,
			"title": "建行",
			"desc": "满10元送5元券"
		},
		{
			"type": 1,
			"title": "银联",
			"desc": "银联二维码五折，5元封顶"
		},
		{
			"type": 2,
			"title": "建行",
			"desc": "满10元送5元券"
		},
		{
			"type": 1,
			"title": "银联",
			"desc": "银联二维码五折，5元封顶"
		},
		{
			"type": 2,
			"title": "建行",
			"desc": "满10元送5元券"
		},
		{
			"type": 1,
			"title": "银联",
			"desc": "银联二维码五折，5元封顶"
		},
		{
			"type": 2,
			"title": "建行",
			"desc": "满10元送5元券"
		},
		{
			"type": 1,
			"title": "银联",
			"desc": "银联二维码五折，5元封顶"
		},
		{
			"type": 2,
			"title": "建行",
			"desc": "满10元送5元券"
		}
	]
}
const saleType = {
	0: { className: "blue", label: "减" },
	1: { className: "red", label: "折" },
	2: { className: "orange", label: "券" },
}
export default class SearchInput extends Component {
	static options = {
		addGlobalClass: true
	}
	state = {
		firstShow: false,
		secondShow: false,
		firstNum: 3,
		secondNum: 8
	}
	render() {
		// {
		// 	"name": "肯德基",
		// 	"imageUrl": "",
		// 	"distance": 200,
		// 	"tabs": [
		// 	  0
		// 	],
		// 	"sales": [
		// 	  {
		// 		"type": 0,
		// 		"title": "交行",
		// 		"desc": "周四满20减10"
		// 	  },
		// 	  {
		// 		"type": 1,
		// 		"title": "银联",
		// 		"desc": "银联二维码五折，5元封顶"
		// 	  },
		// 	  {
		// 		"type": 2,
		// 		"title": "建行",
		// 		"desc": "满10元送5元券"
		// 	  }
		// 	]
		//   },
		const { firstShow, secondShow, firstNum, secondNum } = this.state;
		let { name, imageUrl, distance, tabs, sales = [] } = this.props;
		imageUrl = imageUrl || "https://dummyimage.com/250x250"
		// console.log(this.props)
		const showLang = sales.length > firstNum
		let showSales = sales
		if (showLang && !secondShow) {
			showSales = firstShow ? sales.filter((el, i) => i < secondNum) : sales.filter((el, i) => i < firstNum)
		}
		console.log("firstShow:" + firstShow, "secondShow:" + secondShow, showSales.length)
		return (
			<View className="l-i-outer">
				<View className="l-i-box">
					<View className="f-h-s-b">
						<View className="l-i-cover">
							<Image className="img100" src={imageUrl} />
						</View>
						<View className="l-i-content">
							<View className="l-i-title">
								<View className="f-h-e-b">
									<Text className="ft16 c333 font-bold elips-one mh_flex1">{name || "未知"}</Text>
									<Text className="ft12 c666 ml5">{distanceRx(distance)}</Text>
								</View>
								<View className="f-h-s-b tags">
									<Text className="ft12 c666">快餐</Text>
								</View>
							</View>
							{
								sales.length ? <View className="sales">
									{
										sales.length > secondNum ? <View className="more-r" onClick={this.onToggleFirstExpand.bind(this)}>
											{
												firstShow ? <Text className="icon iconfont c999">&#xe624;</Text>
													: <Text className="icon iconfont c999">&#xe632;</Text>
											}
										</View>
											: null
									}
									{
										showSales.map((el, i) => {
											return (<View key={i} className="f-h-c sale-item">
												<Text className={`sale-icon ${saleType[el.type].className}`}>{saleType[el.type].label}</Text>
												<Text className="ft12 c666 elips-one mh_flex1 sale-text">
													{el.title?<Text className="mr5">{el.title}</Text>:null}{el.desc}
												</Text>
											</View>)
										})
									}

									{
										firstShow && sales.length > secondNum ?
											<View onClick={this.onToggleSecondExpand} className="f-c-c l-i-b-more">
												{
													secondShow ?
														<View>
															<Text className="ft12 c666 mr5">收起</Text><Text className="icon ft12 iconfont c999">&#xe624;</Text>
														</View>
														:
														<View>
															<Text className="ft12 c666 mr5">显示全部优惠 (剩余{sales.length - secondNum}条)</Text>
															<Text className="icon ft12 iconfont c999">&#xe632;</Text>
														</View>
												}
											</View>
											: null
									}
								</View>
									: null
							}
						</View>
					</View>
				</View>
			</View>
		)
	}
	onToggleFirstExpand = () => {
		this.setState({ firstShow: !this.state.firstShow, secondShow: false })
	}
	onToggleSecondExpand = () => {
		let firstShow = this.state.secondShow ? false : true
		this.setState({ secondShow: !this.state.secondShow, firstShow })
	}
}
