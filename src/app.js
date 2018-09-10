import '@tarojs/async-await'
import action from './utils/action'
import Taro, {Component} from '@tarojs/taro'
import Index from './pages/index'
import dva from './dva'
import models from './model'
import {Provider} from '@tarojs/redux'


import './app.scss'


const dvaApp = dva.createApp({
  initialState: {},
  models: models,
  onError(e, dispatch) {
    dispatch(action("sys/error", e));
  },
});
const store = dvaApp.getStore();

class App extends Component {

  config = {
    pages: [
      'pages/index/index',
      'pages/find/find',
      'pages/discovery/discovery',
      'pages/more/more',
      'pages/answer/answer',
      'pages/question/question'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: "#E3212C",
      navigationBarTitleText: '美惠',
      navigationBarTextStyle: 'white',
      enablePullDownRefresh: true
    },
    mainColor:"#E3212C",
    tabBar: {
      color: "#626567",
      selectedColor: "#E3212C",
      backgroundColor: "#FBFBFB",
      borderStyle: "white",
      list: [{
        pagePath: "pages/index/index",
        text: "附近",
        iconPath: "./asset/imgs/1.png",
        selectedIconPath: "./asset/imgs/1f.png"
      }, {
        pagePath: "pages/discovery/discovery",
        text: "电商",
        iconPath: "./asset/imgs/2.png",
        selectedIconPath: "./asset/imgs/2f.png"
      },
        {
          pagePath: "pages/more/more",
          text: "我的",
          iconPath: "./asset/imgs/3.png",
          selectedIconPath: "./asset/imgs/3f.png"
        }]
    }
  }

  componentDidMount() {
    dvaApp.dispatch({type: 'sys/test'})
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  componentCatchError() {
  }

  render() {
    return (
      <Provider store={store}>
        <Index/>
      </Provider>
    )
  }
}

Taro.render(dvaApp.start(<App/>), document.getElementById('app'))
