// https://api.telegram.org/bot6609079782:AAFAxMO4ZDDo5BhAWpghH52zPQB_CzBNUmE/getUpdates

// https://api.telegram.org/bot6609079782:AAFAxMO4ZDDo5BhAWpghH52zPQB_CzBNUmE/sendMessage?chat_id=-1002234504060&text=hi_i_am_a_bot


const { Telegraf } = require('telegraf');
const { message } = require('telegraf/filters');
const axios = require('axios');

const bot = new Telegraf('6609079782:AAFAxMO4ZDDo5BhAWpghH52zPQB_CzBNUmE');
const ip = '91.226.254.100';
const token = '6609079782:AAFAxMO4ZDDo5BhAWpghH52zPQB_CzBNUmE';
const chatIdChannel = -1002234504060;
bot.on('message', async (ctx) => {
const url = `http://ip-api.com/json/${ip}`;
    const response = await axios.get(url);
    const lightOn = 'Світло є';
    const lightOff = 'Світло відсутнє';
    const sendToChannelOn = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatIdChannel}&text=${lightOn}`;
    const sendToChannelOff = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatIdChannel}&text=${lightOff}`;
    if (response.data.status === 'success') {
            //  ctx.reply('Світло є');

        await axios.get(sendToChannelOn);
        }
        else {
        // ctx.reply('Світло відсутнє');
        await axios.get(sendToChannelOff);
        }
})
bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))