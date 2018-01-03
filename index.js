const TelegramBot = require('node-telegram-bot-api')
const request = require ('request')
const cam = require('camaro')
const fs = require('fs')
const TOKEN = '407431377:AAGOvgVNmbzP6ne4jZNXmVdfaM6f3fnIZj0'
const bot = new TelegramBot(TOKEN, {
    polling: true
})

const KB = {
    currency: 'Курс валют'
}


bot.onText(/\/start/, msg => {
    send(msg)
})

bot.on('message', msg => {
    const name = msg.from.first_name
    bot.sendMessage(msg.chat.id, 'Приветсвую Вас, '+name, {
    })
    sendCurrencyScreen(msg.chat.id)

    switch (msg.text) {
        case KB.currency:{msg.data
            const symbol = '960'
            request(`http://nbt.tj/ru/kurs/rss.php`, (error, response, body) => {
                if (error) throw new Error(error)
                if (response.statusCode == 200) {
                    const currencyData = ('body:', body)
                    const curdate = {
                        data: '//description'
                    }

                    const t= cam(currencyData, curdate)
                    const rd = currencyData.indexOf('CODE: 810 | UNIT: 1 | RATE: ')
                    const r = currencyData.substr(rd+28,6)
                    const ud = currencyData.indexOf('CODE: 840 | UNIT: 1 | RATE: ')
                    const u = currencyData.substr(ud+28,6)
                    const ed = currencyData.indexOf('CODE: 978 | UNIT: 1 | RATE: ')
                    const e = currencyData.substr(ed+28,6)



                    const RUB =  `1 RUB - ${r} TJS`
                    const USD =  `1 USD - ${u} TJS`
                    const EUR =  `1 EUR - ${e} TJS`

                    bot.sendMessage(msg.chat.id, RUB)
                    bot.sendMessage(msg.chat.id, USD)
                    bot.sendMessage(msg.chat.id, EUR)

                }
            })

        }

            break
        }


})



function sendCurrencyScreen(chatId) {
    bot.sendMessage(chatId, 'Курс сомони на сегодня:', {
    })
}
