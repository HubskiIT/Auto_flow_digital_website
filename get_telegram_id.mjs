import fetch from 'node-fetch';

const TOKEN = '8557658247:AAGySTcqiGIiCxRH4eNDA_6O9LOrNxccLZs';

async function getChatId() {
    try {
        console.log('Polling for updates...');
        const response = await fetch(`https://api.telegram.org/bot${TOKEN}/getUpdates`);
        const data = await response.json();

        if (data.ok && data.result.length > 0) {
            const chatId = data.result[data.result.length - 1].message.chat.id;
            console.log(`CHAT_ID:${chatId}`);
        } else {
            console.log('No messages found. Please send /start to the bot.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

getChatId();
