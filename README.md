# video-speed-controller-视频速度控制器
-- A Tampermonkey userscript for controlling video playback speed on all websites. 
-- All created by ai-Chatgpt
-- 一个视频速度控制器
-- gpt生成，我只是搬运工--因为有一个要刷视频的网页，其他我能搜到的加速都用不了了，太老了T.T
-- 使用后的后果自负 和我无关
## 使用方法

### 1. 安装 Tampermonkey

请先在浏览器中安装 Tampermonkey 插件：

- Chrome / Edge：在扩展商店搜索 `Tampermonkey`
- Firefox：在 Add-ons 商店搜索 `Tampermonkey`

### 2. 安装脚本

1. 打开本仓库中的 `video-speed-controller.user.js` 文件
2. 点击右上角的 `Raw`
3. Tampermonkey 会自动打开安装页面
4. 点击 `Install / 安装`

### 3. 使用脚本

安装完成后，打开任意带有视频的网页。

页面右下角会出现一个视频倍速控制面板，你可以：

- 输入自定义倍速，例如 `1.25`、`2`、`5`、`8`
- 点击快捷按钮：`1x`、`2x`、`3x`、`5x`、`8x`
- 用鼠标拖动面板到合适的位置

### 4. 注意事项

部分网站可能会限制视频倍速，或者自动把倍速改回 `1x`。  
本脚本会定时重新应用倍速，但不能保证对所有网站都完全有效。
## Usage

### 1. Install Tampermonkey

First, install the Tampermonkey browser extension.

- Chrome / Edge: search for `Tampermonkey` in the extension store
- Firefox: search for `Tampermonkey` in Firefox Add-ons

### 2. Install the userscript

1. Open the `video-speed-controller.user.js` file in this repository
2. Click the `Raw` button
3. Tampermonkey should open the installation page automatically
4. Click `Install`

### 3. Use the script

After installation, open any webpage that contains a video.

A small video speed control panel will appear on the page. You can:

- Enter a custom playback speed, such as `1.25`, `2`, `5`, or `8`
- Click quick speed buttons: `1x`, `2x`, `3x`, `5x`, `8x`
- Drag the panel to any position you like

### 4. Notes

Some websites may limit playback speed or reset it back to `1x`.  
This script will periodically reapply the selected speed, but it may not work perfectly on every website.
