const axios = require('axios');
const https = require('https');
const express = require('express');
const app = express();
const schedule = require('node-schedule');
require('dotenv').config();

const LINE_NOTIFY_TOKEN = process.env.LINE_NOTIFY_TOKEN;
const PORT = process.env.PORT || 3000;

function sendLineNotify(message) {
    axios.post('https://notify-api.line.me/api/notify',
        `message=${message}`,
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${LINE_NOTIFY_TOKEN}`,
            },
        }
    ).then(response => {
        console.log('通知發送成功:', response.data);
    }).catch(error => {
        console.error('通知發送失敗:', error);
    });
}

// 設定每月的 15 號和 20 號上午 9 點發送通知
const job1 = schedule.scheduleJob('0 9 15 * *', () => {
    sendLineNotify('提醒：今天是信用卡繳費日！');
});

const job2 = schedule.scheduleJob('0 9 20 * *', () => {
    sendLineNotify('提醒：今天是信用卡繳費日！');
});

// 新增的每週課程提醒
const mondayReminder = schedule.scheduleJob('0 8 * * 1', () => {
    sendLineNotify('今天有遊戲課');
});

const tuesdayReminder = schedule.scheduleJob('0 12 * * 2', () => {
    sendLineNotify('今天有體操課');
});

const wednesdayReminder = schedule.scheduleJob('0 8 * * 3', () => {
    sendLineNotify('今天有繪畫課');
});

const thursdayReminder = schedule.scheduleJob('0 12 * * 4', () => {
    sendLineNotify('今天有科學課');
});

const fridayReminder = schedule.scheduleJob('0 8 * * 5', () => {
    sendLineNotify('今天有早療課');
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});