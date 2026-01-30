import fetch from 'node-fetch';

const N8N_HOST = 'https://n8n.srv1212707.hstgr.cloud';

async function checkVersion() {
    try {
        const response = await fetch(`${N8N_HOST}/healthz`);
        console.log('Health Check:', response.status);

        // Sometimes version is in headers or body
        console.log('Headers:', response.headers.raw());

        const text = await response.text();
        console.log('Body:', text);

    } catch (error) {
        console.error('Error:', error);
    }
}

checkVersion();
