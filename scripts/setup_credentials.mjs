
import { keys } from './config_keys.mjs';
import fs from 'fs/promises';
import path from 'path';

const N8N_URL = 'https://n8n.srv1212707.hstgr.cloud';
const N8N_API_KEY = keys.n8n;

if (!N8N_API_KEY) {
    console.error('❌ Missing n8n API key in config_keys.mjs');
    process.exit(1);
}

async function createCredential(name, type, data) {
    console.log(`Creating credential: ${name} (${type})...`);
    try {
        const response = await fetch(`${N8N_URL}/api/v1/credentials`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-N8N-API-KEY': N8N_API_KEY
            },
            body: JSON.stringify({
                name,
                type,
                data
            })
        });

        if (!response.ok) {
            const text = await response.text();
            throw new Error(`HTTP ${response.status}: ${text}`);
        }

        const result = await response.json();
        console.log(`✅ Created ${name} - ID: ${result.id}`);
        return result.id;
    } catch (error) {
        console.error(`❌ Failed to create ${name}:`, error.message);
        return null;
    }
}

async function updateWorkflowFile(filePath, replacements) {
    console.log(`Updating workflow file: ${filePath}...`);
    let content = await fs.readFile(filePath, 'utf8');

    for (const [placeholder, newId] of Object.entries(replacements)) {
        if (!newId) continue;
        console.log(`   Replacing ${placeholder} -> ${newId}`);
        content = content.replaceAll(placeholder, newId);
    }

    await fs.writeFile(filePath, content);
    console.log(`✅ Updated ${filePath}`);
}

async function main() {
    console.log('🚀 Starting Automated Credential Setup...');

    // 1. Create Credentials in n8n
    const credIds = {};

    // HeyGen (Header Auth)
    if (keys.heygen) {
        credIds.heygen = await createCredential('HeyGen API (Auto)', 'httpHeaderAuth', {
            name: 'X-Api-Key',
            value: keys.heygen
        });
    }

    // ElevenLabs (Nodes Base)
    if (keys.elevenlabs) {
        // Try 'elevenLabsApi' first
        credIds.elevenlabs = await createCredential('ElevenLabs API (Auto)', 'elevenLabsApi', {
            apiKey: keys.elevenlabs
        });
    }

    // Creatomate (Header Auth)
    if (keys.creatomate) {
        credIds.creatomate = await createCredential('Creatomate API (Auto)', 'httpHeaderAuth', {
            name: 'Authorization',
            value: `Bearer ${keys.creatomate}`
        });
    }

    // Perplexity (Header Auth)
    if (keys.perplexity) {
        credIds.perplexity = await createCredential('Perplexity API (Auto)', 'httpHeaderAuth', {
            name: 'Authorization',
            value: `Bearer ${keys.perplexity}`
        });
    }

    // Blotato (Header Auth)
    if (keys.blotato) {
        credIds.blotato = await createCredential('Blotato API (Auto)', 'httpHeaderAuth', {
            name: 'Authorization',
            value: `Bearer ${keys.blotato}`
        });
    }

    console.log('\n🔄 Injecting Credential IDs into Workflows...');

    // 2. Update Producer Workflow
    await updateWorkflowFile('workflow_video_producer_v2.json', {
        'heygen_cred_id_placeholder': credIds.heygen,
        'elevenlabs_cred_id_placeholder': credIds.elevenlabs,
        'creatomate_cred_id_placeholder': credIds.creatomate,
        // Also update placeholders if perpexity used there (it is)
        'perplexity_cred_id_placeholder': credIds.perplexity
    });

    // 3. Update Publisher Workflow
    await updateWorkflowFile('workflow_publisher_v2.json', {
        'perplexity_cred_id_placeholder': credIds.perplexity,
        'blotato_cred_id_placeholder': credIds.blotato
    });

    console.log('\n🎉 Setup Complete! Now run deploy_all_v2_workflows.mjs again to push changes.');
}

main().catch(console.error);
