import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

const N8N_HOST = 'https://n8n.srv1212707.hstgr.cloud';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyNGFiMmU5Ni0zY2MwLTQ5ZDEtOGRlNi05ZTdhMzdkODljNTEiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwiaWF0IjoxNzY5Njc3NDA0LCJleHAiOjE4NjQzMzU2MDB9.Q50xAcYDExYW2cPvPeoxKHSLWQbohtY7h5a9HZ3seUM';
const WORKFLOW_PATH = '/Users/hubertgrzybowski/Desktop/TEST3/viral_scraping_workflow.json';

// Placeholder IDs - User will need to fill these in n8n UI if they don't exist yet
// Or we could try to look them up. For now, let's just use what we might have or leave blank.
const OPENAI_CRED_ID = 'openai_cred_id_placeholder';
const ELEVENLABS_CRED_ID = 'elevenlabs_cred_id_placeholder';
const GOOGLE_SHEETS_CRED_ID = 'google_sheets_cred_id_placeholder';


async function deployWorkflow() {
    try {
        console.log('Sending Viral Scraping workflow to N8N...');

        // 1. Read Workflow
        let workflowJsonStr = fs.readFileSync(WORKFLOW_PATH, 'utf8');

        // 2. Parse to inject settings (Double check)
        const workflowObj = JSON.parse(workflowJsonStr);
        if (!workflowObj.settings) {
            workflowObj.settings = { "executionOrder": "v1" };
        }
        workflowJsonStr = JSON.stringify(workflowObj);

        // 3. Inject Credential IDs
        // Note: In a real scenario, we would lookup existing credentials. 
        // For now, we are deploying with placeholders so the user can connect them in the UI.

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
            const errorText = await response.text();
            throw new Error(`Failed to create workflow: ${response.status} ${response.statusText} - ${errorText}`);
        }

        const data = await response.json();
        console.log(`Viral Workflow created! ID: ${data.id}`);
        console.log(`Link: ${N8N_HOST}/workflow/${data.id}`);

        // 5. Activate Workflow (Optional - maybe better to leave inactive for configuration)
        // const activateResponse = await fetch(`${N8N_HOST}/api/v1/workflows/${data.id}/activate`, {
        //     method: 'POST',
        //     headers: { 'X-N8N-API-KEY': API_KEY }
        // });
        // if (activateResponse.ok) console.log('Workflow activated successfully!');

    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

deployWorkflow();
