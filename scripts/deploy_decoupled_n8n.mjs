import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

const N8N_HOST = 'https://n8n.srv1212707.hstgr.cloud';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyNGFiMmU5Ni0zY2MwLTQ5ZDEtOGRlNi05ZTdhMzdkODljNTEiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwiaWF0IjoxNzY5Njc3NDA0LCJleHAiOjE4NjQzMzU2MDB9.Q50xAcYDExYW2cPvPeoxKHSLWQbohtY7h5a9HZ3seUM';

const SCRAPER_PATH = '/Users/hubertgrzybowski/Desktop/TEST3/workflows/workflow_scraper_ideas.json';
const PRODUCER_PATH = '/Users/hubertgrzybowski/Desktop/TEST3/workflows/workflow_video_producer.json';
const SALES_BOT_PATH = '/Users/hubertgrzybowski/Desktop/TEST3/workflows/sales_bot_workflow.json';

async function deployWorkflow(filePath, name) {
    try {
        console.log(`Deploying ${name}...`);

        let workflowJsonStr = fs.readFileSync(filePath, 'utf8');
        const workflowObj = JSON.parse(workflowJsonStr);
        if (!workflowObj.settings) {
            workflowObj.settings = { "executionOrder": "v1" };
        }
        workflowJsonStr = JSON.stringify(workflowObj);

        // Inject global credentials if we had them, or just rely on user adding them.
        // For production, extracting credential checks here would be smart.

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
            throw new Error(`Failed to create ${name}: ${response.status} ${response.statusText} - ${errorText}`);
        }

        const data = await response.json();
        console.log(`${name} Created! ID: ${data.id}`);
        console.log(`Link: ${N8N_HOST}/workflow/${data.id}`);

    } catch (error) {
        console.error(`Error deploying ${name}:`, error);
    }
}

async function main() {
    await deployWorkflow(SCRAPER_PATH, "Scraper Workflow");
    await deployWorkflow(PRODUCER_PATH, "Producer Workflow");
    await deployWorkflow(SALES_BOT_PATH, "Sales Bot Workflow");
}

main();
