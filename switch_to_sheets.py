import pandas as pd
import json

# 1. Convert Excel to CSV
excel_path = 'Content_Calendar_Feb_Advanced.xlsx'
csv_path = 'Content_Calendar_Feb_Advanced.csv'

try:
    df = pd.read_excel(excel_path)
    df.to_csv(csv_path, index=False)
    print(f"Successfully converted {excel_path} to {csv_path}")
except Exception as e:
    print(f"Error converting Excel to CSV: {e}")

# 2. Update Workflow to use Google Sheets
workflow_path = 'social_media_workflow_advanced.json'
new_workflow_path = 'social_media_workflow_sheets.json'

with open(workflow_path, 'r') as f:
    workflow = json.load(f)

# Find trigger node to update connection
trigger_node_name = "Schedule Trigger"

# Create Google Sheets Node
gs_node = {
    "parameters": {
        "authentication": "predefinedCredentialType",
        "nodeCredentialType": "googleSheetsOAuth2",
        "documentId": {
            "__rl": True,
            "value": "PASTE_YOUR_GOOGLE_SHEET_ID_HERE",
            "mode": "id"
        },
        "sheetName": {
            "__rl": True,
            "value": "Arkusz1",
            "mode": "name"
        },
        "options": {}
    },
    "name": "Read Google Sheet",
    "type": "n8n-nodes-base.googleSheets",
    "typeVersion": 4.5,
    "position": [ 450, 300 ],
    "notes": "Action: Read All Rows"
}

# Remove old "Read Excel" and "Parse Spreadsheet" nodes
nodes_to_remove = ["Read Excel File", "Parse Spreadsheet"]
workflow['nodes'] = [n for n in workflow['nodes'] if n['name'] not in nodes_to_remove]

# Add new node
workflow['nodes'].append(gs_node)

# Update Connections
# 1. Trigger -> Google Sheets
workflow['connections'][trigger_node_name] = {
    "main": [
        [
            {
                "node": "Read Google Sheet",
                "type": "main",
                "index": 0
            }
        ]
    ]
}

# 2. Google Sheets -> Filter Today's Posts
# (Was Parse Spreadsheet -> Filter)
workflow['connections']["Read Google Sheet"] = {
    "main": [
        [
            {
                "node": "Filter Today's Posts",
                "type": "main",
                "index": 0
            }
        ]
    ]
}

# Remove old connections
if "Read Excel File" in workflow['connections']:
    del workflow['connections']["Read Excel File"]
if "Parse Spreadsheet" in workflow['connections']:
    del workflow['connections']["Parse Spreadsheet"]

# Save new workflow
with open(new_workflow_path, 'w') as f:
    json.dump(workflow, f, indent=4)

print(f"Successfully created {new_workflow_path}")
