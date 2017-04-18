
import { flow } from 'lodash';

const delay = (t = 0) => new Promise((resolve) => setTimeout(resolve, t));

// 获取应用实例
const app = getApp(); //  eslint-disable-line no-undef

Page({
	data: {
		motto: 'Hello World',
		userInfo: {},
	},
	// 事件处理函数
	bindViewTap() {
		wx.navigateTo({
			url: '../logs/logs',
		});
	},
	async onLoad() {

		await delay();

		const log = flow(() => {
			console.log('DEV: ', __DEV__);
		});

		log();

		// 调用应用实例的方法获取全局数据
		app.getUserInfo((userInfo) => {
			// 更新数据
			this.setData({ userInfo });
		});
	},
});
