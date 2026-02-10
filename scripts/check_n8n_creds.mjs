import fetch from 'node-fetch';

const N8N_HOST = 'https://n8n.srv1212707.hstgr.cloud';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyNGFiMmU5Ni0zY2MwLTQ5ZDEtOGRlNi05ZTdhMzdkODljNTEiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwiaWF0IjoxNzY5Njc3NDA0LCJleHAiOjE4NjQzMzU2MDB9.Q50xAcYDExYW2cPvPeoxKHSLWQbohtY7h5a9HZ3seUM';

async function checkCredentials() {
    try {
        const response = await fetch(`${N8N_HOST}/api/v1/credentials`, {
            method: 'GET',
            headers: {
                'X-N8N-API-KEY': API_KEY,
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to list credentials: ${response.status} ${response.statusText}`);
        }

        const credentials = await response.json();
        const telegramCreds = credentials.data.filter(c => c.type === 'telegramApi');

        console.log(`Found ${telegramCreds.length} Telegram credentials.`);
        telegramCreds.forEach(c => console.log(`- ID: ${c.id}, Name: ${c.name}`));

    } catch (error) {
        console.error('Error:', error);
    }
}

checkCredentials();
