const { Telegraf } = require('telegraf');
const axios = require('axios');

const token = '7289265194:AAGIxKYuyv_1wjTN-IUKx4qQ4w78yAuMphI';

const bot = new Telegraf(token);

const ip = '91.226.254.100';
const ip2 = '91.226.254.118';
let pingsArrOn = [];
let pingsArrOff = [];

const PingRequest = async () => { 
    const url = `http://ip-api.com/json/${ip}`;
    const response = await axios.get(url);
    const stat = response.data.status;
    let data = new Date().getTime();
    let pingObj = {
        status: stat,
        date: data
    }
    if (response.data.status === 'success') {
        
        pingsArrOn.slice(1);
        pingsArrOn.push(pingObj);
        const diff = pingsArrOn[pingsArrOn.length - 1].date - pingsArrOn[0].date;
        console.log(pingsArrOn, diff);
    }
    else { 
        data = new Date().getTime();
        pingsArrOff.slice(1);
        pingsArrOff.push(pingObj);
        console.log(pingsArrOff);
    }
}
const delay = 1000;
setInterval(PingRequest, delay);
// PingRequest();


bot.start((ctx) => ctx.reply('Welcome!'));

bot.on('message', async ctx => {
    const msg = ctx.message.text;
    console.log(ctx.message);
    const chatId = ctx.message.chat.id;
    const chatName = ctx.message.from.username;
    ctx.reply(`Your message "${msg}" was sent to me from you with parameters id: ${chatId} and chatname: ${chatName}!!!!`);
})

bot.launch().then(console.log('Bot is active!'));


