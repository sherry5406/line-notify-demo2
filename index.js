const axios = require('axios');
const https = require('https');
const express = require('express');
const app = express();
const schedule = require('node-schedule');
require('dotenv').config();
// const agent = new https.Agent({
//     rejectUnauthorized: false
// });

const LINE_NOTIFY_TOKEN = process.env.LINE_NOTIFY_TOKEN;
const PORT = process.env.PORT || 3000; // 這裡可以設置預設端口

function sendLineNotify(message) {
    axios.post('https://notify-api.line.me/api/notify',
        `message=${message}`,
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${LINE_NOTIFY_TOKEN}`,
            },
            //  httpsAgent: agent
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

// const testJob = schedule.scheduleJob('*/1 * * * *', () => {
//     sendLineNotify('測試：這是一條測試訊息！');
// });


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});