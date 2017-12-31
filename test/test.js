
import { resolve } from 'path';
import { execSync } from 'child_process';
import rimraf from 'rimraf';
import glob from 'glob';

const inDist = (...args) => resolve('dist', ...args);
const exist = (...paths) => !!glob.sync(inDist('wechat', ...paths))[0];
const clear = () => rimraf.sync(inDist());

beforeEach(clear);
afterEach(clear);

test('development', () => {
	console.log(execSync('npm run webpack').toString());
	expect(exist('app.js')).toBe(true);
	expect(exist('app.json')).toBe(true);
	expect(exist('app.wxss')).toBe(true);
	expect(exist('common.js')).toBe(true);
	expect(exist('wxml/motto/motto.wxml')).toBe(true);
	expect(exist('pages/index/index.js')).toBe(true);
	expect(exist('pages/index/index.wxml')).toBe(true);
	expect(exist('pages/index/index.wxss')).toBe(true);
	expect(exist('pages/logs/logs.js')).toBe(true);
	expect(exist('pages/logs/logs.wxml')).toBe(true);
	expect(exist('pages/logs/logs.wxss')).toBe(true);
});
