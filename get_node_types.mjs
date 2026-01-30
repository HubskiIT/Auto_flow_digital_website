import fetch from 'node-fetch';

const N8N_HOST = 'https://n8n.srv1212707.hstgr.cloud';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyNGFiMmU5Ni0zY2MwLTQ5ZDEtOGRlNi05ZTdhMzdkODljNTEiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwiaWF0IjoxNzY5Njc3NDA0LCJleHAiOjE4NjQzMzU2MDB9.Q50xAcYDExYW2cPvPeoxKHSLWQbohtY7h5a9HZ3seUM';

async function getNodeTypes() {
    try {
        const response = await fetch(`${N8N_HOST}/api/v1/node-types`, {
            headers: {
                'X-N8N-API-KEY': API_KEY
            }
        });

        if (!response.ok) {
            console.error('Failed to fetch node types:', response.status);
            console.log(await response.text());
            return;
        }

        const data = await response.json();

        // Filter for email related nodes
        const emailNodes = data.data.filter(node =>
            node.name.toLowerCase().includes('email') ||
            node.displayName.toLowerCase().includes('email')
        );

        console.log('Found Email Nodes:', JSON.stringify(emailNodes, null, 2));

    } catch (error) {
        console.error('Error:', error);
    }
}

getNodeTypes();
