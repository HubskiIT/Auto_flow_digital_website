#!/usr/bin/env node

/**
 * Deploy ALL v2 workflows to n8n
 * Usage: node deploy_all_v2_workflows.mjs
 */

import fs from 'fs/promises';
import path from 'path';


import { keys } from './config_keys.mjs';

const N8N_URL = 'https://n8n.srv1212707.hstgr.cloud';
const API_KEY = keys.n8n;


const WORKFLOWS = [
    { file: 'workflow_scraper_ideas.json', name: 'Viral Content Scraper v2' },
    { file: 'workflow_video_producer_v2.json', name: 'Video Producer v2' },
    { file: 'workflow_publisher_v2.json', name: 'Omni-Channel Publisher v2' }
];

async function deployWorkflow(workflowPath, workflowName) {
    console.log(`\n📤 Deploying: ${workflowName}`);

    try {
        const workflowContent = await fs.readFile(workflowPath, 'utf8');
        const workflow = JSON.parse(workflowContent);

        // Add settings if not present
        workflow.settings = workflow.settings || {};
        workflow.settings.executionOrder = workflow.settings.executionOrder || 'v1';

        const response = await fetch(`${N8N_URL}/api/v1/workflows`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-N8N-API-KEY': API_KEY
            },
            body: JSON.stringify(workflow)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP ${response.status}: ${errorText}`);
        }

        const result = await response.json();
        console.log(`✅ Deployed successfully! Workflow ID: ${result.id}`);
        return result;

    } catch (error) {
        console.error(`❌ Failed to deploy ${workflowName}:`, error.message);
        throw error;
    }
}

async function main() {
    console.log('🚀 Starting deployment of v2 workflows...\n');
    console.log(`Target n8n instance: ${N8N_URL}`);

    if (API_KEY === 'YOUR_N8N_API_KEY_HERE') {
        console.error('\n❌ ERROR: Please set N8N_API_KEY environment variable');
        console.error('   Example: export N8N_API_KEY="your-api-key"');
        process.exit(1);
    }

    const results = [];

    for (const { file, name } of WORKFLOWS) {
        const workflowPath = path.resolve(process.cwd(), file);

        try {
            const result = await deployWorkflow(workflowPath, name);
            results.push({ name, status: 'success', id: result.id });
        } catch (error) {
            results.push({ name, status: 'failed', error: error.message });
        }
    }

    console.log('\n\n📊 DEPLOYMENT SUMMARY');
    console.log('====================');
    results.forEach(({ name, status, id, error }) => {
        if (status === 'success') {
            console.log(`✅ ${name} - ID: ${id}`);
        } else {
            console.log(`❌ ${name} - Error: ${error}`);
        }
    });

    const successCount = results.filter(r => r.status === 'success').length;
    console.log(`\n${successCount}/${WORKFLOWS.length} workflows deployed successfully`);

    if (successCount === WORKFLOWS.length) {
        console.log('\n🎉 All workflows deployed! Next steps:');
        console.log('1. Open n8n and configure credentials for each workflow');
        console.log('2. Update placeholder IDs (Google Sheet ID, Telegram Chat ID, etc.)');
        console.log('3. Activate each workflow');
        console.log('4. Test the complete pipeline');
    }
}

main().catch(console.error);
