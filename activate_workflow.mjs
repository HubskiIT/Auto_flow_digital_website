import fetch from 'node-fetch';

const N8N_HOST = 'https://n8n.srv1212707.hstgr.cloud';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyNGFiMmU5Ni0zY2MwLTQ5ZDEtOGRlNi05ZTdhMzdkODljNTEiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwiaWF0IjoxNzY5Njc3NDA0LCJleHAiOjE4NjQzMzU2MDB9.Q50xAcYDExYW2cPvPeoxKHSLWQbohtY7h5a9HZ3seUM';
const WORKFLOW_ID = 'XZrViGEJszAGJCkw';

async function activate() {
    console.log(`Attempting to activate workflow ${WORKFLOW_ID}...`);
    try {
        const response = await fetch(`${N8N_HOST}/api/v1/workflows/${WORKFLOW_ID}/activate`, {
            method: 'POST',
            headers: {
                'X-N8N-API-KEY': API_KEY,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const text = await response.text();
            console.error(`Failed to activate: ${response.status} ${text}`);
            return;
        }

        const data = await response.json();
        console.log('✅ Workflow activated successfully!', data);
    } catch (error) {
        console.error('Error activating workflow:', error);
    }
}

activate();
