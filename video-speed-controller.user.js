// ==UserScript==
// @name         全网页视频倍速控制器
// @namespace    https://tampermonkey.net/
// @version      1.1
// @description  让所有网页视频支持自定义播放速度，支持 8 倍速
// @author       Augestermini@chatgpt
// @match        *://*/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function () {
    'use strict';

    let currentSpeed = Number(localStorage.getItem('global_video_speed')) || 8;

    function applySpeed() {
        const videos = document.querySelectorAll('video');

        videos.forEach(video => {
            video.playbackRate = currentSpeed;
        });
    }

    function createPanel() {
        if (document.getElementById('video-speed-controller')) {
            return;
        }

        const panel = document.createElement('div');
        panel.id = 'video-speed-controller';

    panel.innerHTML = `
    <div style="
        font-weight: bold;
        margin-bottom: 6px;
        color: #ffffff;
        font-size: 16px;
        text-shadow: 1px 1px 2px #000000;
    ">
        视频倍速
    </div>

    <input
        id="video-speed-input"
        type="number"
        min="0.1"
        max="16"
        step="0.1"
        value="${currentSpeed}"
        style="
            width: 80px;
            height: 26px;
            margin-right: 5px;
            background: #ffffff;
            color: #000000;
            border: 1px solid #ffffff;
            border-radius: 4px;
            padding: 2px 4px;
            font-size: 14px;
            font-weight: bold;
        "
    >

    <button
        id="video-speed-apply"
        style="
            height: 30px;
            background: #222222;
            color: #ffffff;
            border: 1px solid #ffffff;
            border-radius: 4px;
            padding: 2px 7px;
            cursor: pointer;
            font-size: 14px;
            font-weight: bold;
        "
    >
        应用
    </button>

    <div style="margin-top: 7px;">
        <button data-speed="1" style="background:#222222;color:#ffffff;border:1px solid #ffffff;border-radius:4px;padding:4px 6px;cursor:pointer;font-size:14px;font-weight:bold;">1x</button>
        <button data-speed="2" style="background:#222222;color:#ffffff;border:1px solid #ffffff;border-radius:4px;padding:4px 6px;cursor:pointer;font-size:14px;font-weight:bold;">2x</button>
        <button data-speed="3" style="background:#222222;color:#ffffff;border:1px solid #ffffff;border-radius:4px;padding:4px 6px;cursor:pointer;font-size:14px;font-weight:bold;">3x</button>
        <button data-speed="5" style="background:#222222;color:#ffffff;border:1px solid #ffffff;border-radius:4px;padding:4px 6px;cursor:pointer;font-size:14px;font-weight:bold;">5x</button>
        <button data-speed="8" style="background:#222222;color:#ffffff;border:1px solid #ffffff;border-radius:4px;padding:4px 6px;cursor:pointer;font-size:14px;font-weight:bold;">8x</button>
    </div>
`;
panel.style.position = 'fixed';

const savedLeft = localStorage.getItem('video_speed_panel_left');
const savedTop = localStorage.getItem('video_speed_panel_top');

if (savedLeft && savedTop) {
    panel.style.left = savedLeft;
    panel.style.top = savedTop;
} else {
    panel.style.right = '20px';
    panel.style.bottom = '20px';
}
        panel.style.zIndex = '999999';
        panel.style.background = '#000000';
        panel.style.color = 'white';
        panel.style.padding = '7px';
        panel.style.borderRadius = '6px';
        panel.style.fontSize = '13px';
        panel.style.fontFamily = 'Arial, sans-serif';
        panel.style.boxShadow = '0 2px 10px rgba(0,0,0,0.4)';

        document.body.appendChild(panel);
        makePanelDraggable(panel);

        const input = document.getElementById('video-speed-input');
        const applyButton = document.getElementById('video-speed-apply');

        applyButton.addEventListener('click', () => {
            const speed = Number(input.value);

            if (speed > 0 && speed <= 16) {
                currentSpeed = speed;
                localStorage.setItem('global_video_speed', currentSpeed);
                applySpeed();
            } else {
                alert('请输入 0.1 到 16 之间的倍速');
            }
        });

        panel.querySelectorAll('button[data-speed]').forEach(button => {
            button.addEventListener('click', () => {
                currentSpeed = Number(button.dataset.speed);
                input.value = currentSpeed;
                localStorage.setItem('global_video_speed', currentSpeed);
                applySpeed();
            });
        });
    }

    function observeVideos() {
        const observer = new MutationObserver(() => {
            applySpeed();
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    function init() {
        createPanel();
        applySpeed();
        observeVideos();

        setInterval(applySpeed, 2000);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
function makePanelDraggable(panel) {
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    panel.addEventListener('mousedown', function (e) {
        // 避免点击输入框和按钮时触发拖动
        if (
            e.target.tagName === 'INPUT' ||
            e.target.tagName === 'BUTTON'
        ) {
            return;
        }

        isDragging = true;

        const rect = panel.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;

        panel.style.cursor = 'grabbing';
        e.preventDefault();
    });

    document.addEventListener('mousemove', function (e) {
        if (!isDragging) {
            return;
        }

        panel.style.left = e.clientX - offsetX + 'px';
        panel.style.top = e.clientY - offsetY + 'px';

        // 拖动后取消 right 和 bottom，避免位置冲突
        panel.style.right = 'auto';
        panel.style.bottom = 'auto';
    });

    document.addEventListener('mouseup', function () {
        if (isDragging) {
            isDragging = false;
            panel.style.cursor = 'move';

            localStorage.setItem('video_speed_panel_left', panel.style.left);
            localStorage.setItem('video_speed_panel_top', panel.style.top);
        }
    });

    panel.style.cursor = 'move';
}
