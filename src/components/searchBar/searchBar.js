import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text, Navigator } from '@tarojs/components'
import './searchBar.scss'
import {mainColor} from '../../constants'

export default class SearchInput extends Component {
    static options = {
        addGlobalClass: true
    }
    state = {
        inputShowed: false,
        inputVal: ""
    }
    componentDidMount(v) {
        if (this.props.focused) {
            this.setState({ inputShowed: true })
        }
    }
    hideInput() {
        this.setState({
            inputVal: "",
            inputShowed: false
        });
    }
    clearInput() {
        this.setState({
            inputVal: ""
        });
    }
    inputTyping(e) {
        console.log('inputTyping')
        this.setState({
            inputVal: e.detail.value
        });
    }
    showInput = () => {
        if (this.props.onClick) {
            this.props.onClick()
        } else {
            this.setState({
                inputShowed: true
            });
        }
    }
    com
    render() {
        const { placeholder = "搜索", hideBtn } = this.props
        return (
            <View>
                <View className="weui-search-bar">
                    <View className="weui-search-bar__form">
                        <View className="weui-search-bar__box">
                            <Icon className="weui-icon-search_in-box" type="search" size="16" color={mainColor}></Icon>
                            <Input type="text" className="weui-search-bar__input" placeholder={placeholder} value={inputVal} focus={inputShowed} onInput={this.inputTyping.bind(this)} />

                            {inputVal.length > 0 && <View className="weui-icon-clear" onClick={this.clearInput.bind(this)}>
                                <Icon type="clear" size="16" color="#666"></Icon>
                            </View>}
                        </View>
                        <Label className="weui-search-bar__label" hidden={inputShowed} onClick={this.showInput.bind(this)}>
                        </Label>
                    </View>
                    <View className="weui-search-bar__cancel-btn" hidden={hideBtn} onClick={this.hideInput.bind(this)}><Text>搜索</Text></View>
                </View>
                {
                    inputVal.length > 0 && <View className="weui-cells searchbar-result">
                        <Navigator url="" className="weui-cell" hover-className="weui-cell_active">
                            <View className="weui-cell__bd">
                                <View><Text>实时搜索文本</Text></View>
                            </View>
                        </Navigator>
                        <Navigator url="" className="weui-cell" hover-className="weui-cell_active">
                            <View className="weui-cell__bd">
                                <View><Text>实时搜索文本</Text></View>
                            </View>
                        </Navigator>
                        <Navigator url="" className="weui-cell" hover-className="weui-cell_active">
                            <View className="weui-cell__bd">
                                <View><Text>实时搜索文本</Text></View>
                            </View>
                        </Navigator>
                        <Navigator url="" className="weui-cell" hover-className="weui-cell_active">
                            <View className="weui-cell__bd">
                                <View><Text>实时搜索文本</Text></View>
                            </View>
                        </Navigator>
                    </View>
                }
            </View>
        )
    }
}
