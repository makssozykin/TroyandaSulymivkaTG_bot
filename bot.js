// https://api.telegram.org/bot7289265194:AAGIxKYuyv_1wjTN-IUKx4qQ4w78yAuMphI/getUpdates

// https://api.telegram.org/bot7289265194:AAGIxKYuyv_1wjTN-IUKx4qQ4w78yAuMphI/sendMessage?chat_id=-1002234504060&text=hi_i_am_a_bot

const { Telegraf } = require('telegraf');
const axios = require('axios');

const token = '7289265194:AAGIxKYuyv_1wjTN-IUKx4qQ4w78yAuMphI';
const chatIdChannel = -1002234504060;
const chatIgTestGroup = -1002215119359;

const bot = new Telegraf(token);

const ip = '91.226.254.100';
const ip2 = '91.226.254.118';
const ip3 = '192.168.0.196';
let pingsArrOn = [];
let pingsArrOff = [];

const PingRequest = async () => {
    const url = `http://ip-api.com/json/${ip}`;
    try {
        const response = await axios.get(url);
        const stat = response.data.status;
        let data = new Date().getTime();
        let pingObj = {
            status: stat,
            date: data
        }
        const lightOn = 'Світло є';
        const lightOff = 'Світло відсутнє';
        const sendToChannelOn = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatIgTestGroup}&text=${lightOn}`;
        const sendToChannelOff = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatIgTestGroup}&text=${lightOff}`;
        if (response.data.status === 'success') {
        
            pingsArrOn.slice(1);
            pingsArrOn.push(pingObj);
            const diff = pingsArrOn[pingsArrOn.length - 1].date - pingsArrOn[0].date;
            await axios.get(sendToChannelOn);
            console.log(pingsArrOn, diff);
        }
        else {
            data = new Date().getTime();
            pingsArrOff.slice(1);
            pingsArrOff.push(pingObj);
            await axios.get(sendToChannelOff);
            console.log(pingsArrOff);
        }
    } catch (e) { 
        data = new Date().getTime();
        pingsArrOff.slice(1);
        let pingObj = {
            status: 'fail',
            date: data
        }
            pingsArrOff.push(pingObj);
            await axios.get(sendToChannelOff);
            console.log(pingsArrOff);
    }
}
// const delay = 10000;
// setInterval(PingRequest, delay);
PingRequest();


bot.start((ctx) => ctx.reply('Welcome!'));

bot.on('message', async ctx => {
    const msg = ctx.message.text;
    console.log(ctx.message);
    const chatId = ctx.message.chat.id;
    const chatName = ctx.message.from.username;
    ctx.reply(`Your message "${msg}" was sent to me from you with parameters id: ${chatId} and chatname: ${chatName}!!!!`);
})

bot.launch().then(console.log('Bot is active!'));


