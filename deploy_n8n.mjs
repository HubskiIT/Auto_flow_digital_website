import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

const N8N_HOST = 'https://n8n.srv1212707.hstgr.cloud';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyNGFiMmU5Ni0zY2MwLTQ5ZDEtOGRlNi05ZTdhMzdkODljNTEiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwiaWF0IjoxNzY5Njc3NDA0LCJleHAiOjE4NjQzMzU2MDB9.Q50xAcYDExYW2cPvPeoxKHSLWQbohtY7h5a9HZ3seUM';
const WORKFLOW_PATH = '/Users/hubertgrzybowski/.gemini/antigravity/brain/99671667-dd91-4102-a384-e425543146d4/n8n_workflow.json';

async function deployWorkflow() {
    try {
        const workflowJson = JSON.parse(fs.readFileSync(WORKFLOW_PATH, 'utf8'));

        console.log('Sending workflow to N8N...');

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

        // Activate Workflow
        const activateResponse = await fetch(`${N8N_HOST}/api/v1/workflows/${createdWorkflow.id}/activate`, {
            method: 'POST',
            headers: {
                'X-N8N-API-KEY': API_KEY,
                'Content-Type': 'application/json',
            }
        });

        if (!activateResponse.ok) {
            // Warning only, might fail if nodes are not configured (credentials missing)
            console.warn('Could not activate workflow (credentials likely missing):', await activateResponse.text());
        } else {
            console.log('Workflow activated successfully!');
        }

        // Construct Webhook URL
        // Standard N8N webhook path: /webhook/{workflow_id}/{path}
        // But for production webhooks, the ID is usually part of the URL or the node path is used directly depending on configuration.
        // However, N8N usually uses /webhook/NODE_ID or /webhook/PATH
        // Let's look at the created workflow nodes to find the webhook node.

        const webhookNode = createdWorkflow.nodes.find((node) => node.type === 'n8n-nodes-base.webhook');
        if (webhookNode) {
            const webhookPath = webhookNode.parameters?.path || 'contact-form';
            // Connect hook normally doesn't require ID in path if using standard setup, but let's verify.
            // Usually: https://instance.com/webhook/path
            // Or unique: https://instance.com/webhook/{uuid}

            // Actually, the safest bet for now is assuming standard path based
            const prodUrl = `${N8N_HOST}/webhook/${webhookPath}`;
            console.log(`Assuming Production Webhook URL: ${prodUrl}`);

            // Write result to file for next step
            fs.writeFileSync('n8n_result.json', JSON.stringify({
                workflowId: createdWorkflow.id,
                webhookUrl: prodUrl
            }, null, 2));
        }

    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

deployWorkflow();
