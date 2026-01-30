import fetch from 'node-fetch';

const N8N_HOST = 'https://n8n.srv1212707.hstgr.cloud';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyNGFiMmU5Ni0zY2MwLTQ5ZDEtOGRlNi05ZTdhMzdkODljNTEiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwiaWF0IjoxNzY5Njc3NDA0LCJleHAiOjE4NjQzMzU2MDB9.Q50xAcYDExYW2cPvPeoxKHSLWQbohtY7h5a9HZ3seUM';

const CREDENTIAL_DATA = {
    name: "AutoFlow Mail",
    type: "smtp",
    data: {
        host: "smtp.hostinger.com",
        port: 465,
        user: "contact@autoflowdigital.pl",
        password: "@Ghubert2002@",
        secure: true
    }
};

async function createCredentials() {
    try {
        console.log('Creating SMTP credentials...');

        const response = await fetch(`${N8N_HOST}/api/v1/credentials`, {
            method: 'POST',
            headers: {
                'X-N8N-API-KEY': API_KEY,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(CREDENTIAL_DATA),
        });

        if (!response.ok) {
            const text = await response.text();
            throw new Error(`Failed: ${response.status} - ${text}`);
        }

        const result = await response.json();
        console.log(`CREDENTIAL_ID:${result.id}`);

    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

createCredentials();
