import json

# Load existing workflow
with open('social_media_workflow.json', 'r') as f:
    workflow = json.load(f)

# Update Read Binary File path
for node in workflow['nodes']:
    if node['name'] == 'Read Excel File':
        node['parameters']['filePath'] = '/Users/hubertgrzybowski/Desktop/TEST3/Content_Calendar_Feb_Advanced.xlsx'

# Add AI Polishing Node (Mock)
ai_node = {
    "parameters": {
        "model": "gpt-4",
        "prompt": "Optimize this social media caption for engagement: {{ $json[\"Copy/Caption\"] }}",
        "systemMessage": "You are a specialized social media copy editor."
    },
    "name": "AI Polish Caption",
    "type": "n8n-nodes-base.openAi",
    "typeVersion": 1,
    "position": [ 1050, 300 ]
}

# Add Telegram Notification Node (Mock)
telegram_node = {
    "parameters": {
        "chatId": "@AutoFlowDigital_Channel",
        "text": "🚀 *Approval Needed*\n\n**Topic:** {{ $json[\"Idea/Topic\"] }}\n**Platform:** {{ $json[\"Platform\"] }}\n\n**Caption:**\n{{ $json[\"Copy/Caption\"] }}\n\n**Visual:** {{ $json[\"Visual Directive\"] }}",
        "additionalFields": {
            "parse_mode": "Markdown"
        }
    },
    "name": "Telegram Approval",
    "type": "n8n-nodes-base.telegram",
    "typeVersion": 1,
    "position": [ 1250, 300 ]
}

# Shift existing router and downstream nodes
# We need to re-link nodes. This is getting complex to do programmatically without a graph lib.
# Instead, I will just INSERT the nodes into the list and rely on the user to connect them in the UI, 
# OR I can try to update the `connections` object.

# Let's try to update connections.
# Current flow: Trigger -> Read -> Parse -> Filter -> Route -> [Posts]
# New flow: Trigger -> Read -> Parse -> Filter -> AI Polish -> Telegram Approval -> Route -> [Posts]

# 1. Remove connection from Filter to Route
if "Filter Today's Posts" in workflow['connections']:
    del workflow['connections']["Filter Today's Posts"]

# 2. Connect Filter -> AI Polish
workflow['connections']["Filter Today's Posts"] = {
    "main": [
        [
            {
                "node": "AI Polish Caption",
                "type": "main",
                "index": 0
            }
        ]
    ]
}

# 3. Connect AI Polish -> Telegram Approval
workflow['connections']["AI Polish Caption"] = {
    "main": [
        [
            {
                "node": "Telegram Approval",
                "type": "main",
                "index": 0
            }
        ]
    ]
}

# 4. Connect Telegram Approval -> Route
workflow['connections']["Telegram Approval"] = {
    "main": [
        [
            {
                "node": "Route by Platform",
                "type": "main",
                "index": 0
            }
        ]
    ]
}

# Add new nodes to list
workflow['nodes'].append(ai_node)
workflow['nodes'].append(telegram_node)

# Update positions of downstream nodes for visual clarity
for node in workflow['nodes']:
    if node['name'] == 'Route by Platform':
        node['position'] = [1450, 300]
    elif node['name'].startswith('Post to'):
        node['position'][0] += 400

# Save updated workflow
with open('social_media_workflow_advanced.json', 'w') as f:
    json.dump(workflow, f, indent=4)

print("Updated workflow saved to social_media_workflow_advanced.json")
