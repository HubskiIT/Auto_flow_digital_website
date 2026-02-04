import fetch from 'node-fetch';

const N8N_HOST = 'https://n8n.srv1212707.hstgr.cloud';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyNGFiMmU5Ni0zY2MwLTQ5ZDEtOGRlNi05ZTdhMzdkODljNTEiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwiaWF0IjoxNzY5Njc3NDA0LCJleHAiOjE4NjQzMzU2MDB9.Q50xAcYDExYW2cPvPeoxKHSLWQbohtY7h5a9HZ3seUM';
const BOT_TOKEN = '8215119500:AAGHUwzMpze-211EK2n54tH_g8t6K8z9msc';

async function createCredentials() {
    try {
        const body = {
            name: 'Telegram Bot Content Calendar',
            type: 'telegramApi',
            data: {
                accessToken: BOT_TOKEN,
            },
        };

        console.log('Creating Telegram credentials...');

        const response = await fetch(`${N8N_HOST}/api/v1/credentials`, {
            method: 'POST',
            headers: {
                'X-N8N-API-KEY': API_KEY,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            const text = await response.text();
            throw new Error(`Failed to create credentials: ${response.status} ${response.statusText} - ${text}`);
        }

        const credential = await response.json();
        console.log(`Credential created! ID: ${credential.id}, Name: ${credential.name}`);

    } catch (error) {
        console.error('Error:', error);
    }
}

createCredentials();
