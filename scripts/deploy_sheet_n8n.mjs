import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

const N8N_HOST = 'https://n8n.srv1212707.hstgr.cloud';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyNGFiMmU5Ni0zY2MwLTQ5ZDEtOGRlNi05ZTdhMzdkODljNTEiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwiaWF0IjoxNzY5Njc3NDA0LCJleHAiOjE4NjQzMzU2MDB9.Q50xAcYDExYW2cPvPeoxKHSLWQbohtY7h5a9HZ3seUM';
const WORKFLOW_PATH = '/Users/hubertgrzybowski/Desktop/TEST3/social_media_workflow_sheets.json';

async function deployWorkflow() {
    try {
        const workflowJson = JSON.parse(fs.readFileSync(WORKFLOW_PATH, 'utf8'));

        // Inject missing settings
        if (!workflowJson.settings) {
            workflowJson.settings = { "executionOrder": "v1" };
        }

        console.log('Sending Google Sheets workflow to N8N...');

        // Create Workflow
        const response = await fetch(`${N8N_HOST}/api/v1/workflows`, {
            method: 'POST',
            headers: {
                'X-N8N-API-KEY': API_KEY,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(workflowJson),
        });

        if (!response.ok) {
            const text = await response.text();
            throw new Error(`Failed to create workflow: ${response.status} ${response.statusText} - ${text}`);
        }

        const createdWorkflow = await response.json();
        console.log(`Workflow created! ID: ${createdWorkflow.id}`);
        console.log(`Open in Browser: ${N8N_HOST}/workflow/${createdWorkflow.id}`);

        // Activate Workflow
        const activateResponse = await fetch(`${N8N_HOST}/api/v1/workflows/${createdWorkflow.id}/activate`, {
            method: 'POST',
            headers: {
                'X-N8N-API-KEY': API_KEY,
                'Content-Type': 'application/json',
            }
        });

        if (!activateResponse.ok) {
            console.warn('Could not activate workflow (credentials likely missing):', await activateResponse.text());
            console.log('Creating credentials next...');
        } else {
            console.log('Workflow activated successfully!');
        }

    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

deployWorkflow();
