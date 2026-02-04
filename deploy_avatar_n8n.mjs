import fetch from 'node-fetch';
import fs from 'fs';

const N8N_HOST = 'https://n8n.srv1212707.hstgr.cloud';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyNGFiMmU5Ni0zY2MwLTQ5ZDEtOGRlNi05ZTdhMzdkODljNTEiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwiaWF0IjoxNzY5Njc3NDA0LCJleHAiOjE4NjQzMzU2MDB9.Q50xAcYDExYW2cPvPeoxKHSLWQbohtY7h5a9HZ3seUM';
const WORKFLOW_PATH = '/Users/hubertgrzybowski/Desktop/TEST3/avatar_reels_workflow.json';

// Placeholders - USER MUST UPDATE THESE IN N8N UI AFTER DEPLOYMENT
const HEYGEN_API_KEY = 'ENTER_HEYGEN_API_KEY';
const ELEVENLABS_API_KEY = 'ENTER_ELEVENLABS_API_KEY';

async function createHeaderAuthCredential(name, headerName, apiKey) {
    const body = {
        name: name,
        type: 'httpHeaderAuth',
        data: {
            name: headerName,
            value: apiKey,
        },
    };

    console.log(`Creating credential: ${name}...`);
    const response = await fetch(`${N8N_HOST}/api/v1/credentials`, {
        method: 'POST',
        headers: {
            'X-N8N-API-KEY': API_KEY,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        console.warn(`Failed to create credential ${name}: ${response.statusText}`);
        return null;
    }
    const cred = await response.json();
    return cred.id;
}

async function deploy() {
    try {
        // 1. Create Credentials
        const heygenId = await createHeaderAuthCredential('HeyGen API', 'X-Api-Key', HEYGEN_API_KEY);
        const elevenId = await createHeaderAuthCredential('ElevenLabs API', 'xi-api-key', ELEVENLABS_API_KEY);

        if (!heygenId || !elevenId) {
            console.error("Could not create credentials. Check logs.");
            // Proceeding anyway, but user will need to fix in UI
        }

        // 2. Read Workflow
        let workflowJsonStr = fs.readFileSync(WORKFLOW_PATH, 'utf8');

        // Parse to inject settings
        const workflowObj = JSON.parse(workflowJsonStr);
        if (!workflowObj.settings) {
            workflowObj.settings = { "executionOrder": "v1" };
        }
        workflowJsonStr = JSON.stringify(workflowObj);

        // 3. Inject Credential IDs
        if (heygenId) {
            workflowJsonStr = workflowJsonStr.replace(/"heygen_cred_id_placeholder"/g, `"${heygenId}"`);
        }
        if (elevenId) {
            workflowJsonStr = workflowJsonStr.replace(/"elevenlabs_cred_id_placeholder"/g, `"${elevenId}"`);
        }

        // 4. Create Workflow
        const response = await fetch(`${N8N_HOST}/api/v1/workflows`, {
            method: 'POST',
            headers: {
                'X-N8N-API-KEY': API_KEY,
                'Content-Type': 'application/json',
            },
            body: workflowJsonStr,
        });

        if (!response.ok) {
            throw new Error(`Failed to create workflow: ${await response.text()}`);
        }

        const createdWorkflow = await response.json();
        console.log(`Avatar Workflow created! ID: ${createdWorkflow.id}`);
        console.log(`Link: ${N8N_HOST}/workflow/${createdWorkflow.id}`);

    } catch (e) {
        console.error(e);
    }
}

deploy();
