import pandas as pd
from datetime import datetime, timedelta
import os

# Define the start date (e.g., next Monday)
start_date = datetime.now().date() + timedelta(days=(7 - datetime.now().weekday()))

# Content Data
content_data = [
    # Topic 1: The "Zero-Click" Marketing Revolution
    {
        "Day": 0, "Platform": "LinkedIn", "Content Type": "Text/Article",
        "Topic": "Zero-Click Marketing",
        "Hook/Headline": "Why 'Link in Bio' is Dying: The Era of Zero-Click Marketing",
        "Script/Description": "Discuss how platforms punish external links. Strategy: Deliver value directly in the post. Call to action: 'DM me AUTO to see how we automate this without users leaving the app.'",
        "Visual Notes": "Carousel with data charts showing reach drop on posts with links vs. without.",
        "Status": "Planned"
    },
    {
        "Day": 0, "Platform": "Instagram", "Content Type": "Reel",
        "Topic": "Zero-Click Marketing",
        "Hook/Headline": "Stop begging people to click your link in bio. Do this instead \u2B07\ufe0f",
        "Script/Description": "1. Show low reach insights on a link post. 2. Show high reach on a value post. 3. Explain 'Zero-Click'. 4. CTA: Comment 'Growth' for the blueprint.",
        "Visual Notes": "Screen recording of insights + Talking head overlay.",
        "Status": "Planned"
    },
    
    # Topic 2: Automating Client Onboarding
    {
        "Day": 1, "Platform": "TikTok", "Content Type": "Short Video",
        "Topic": "Client Onboarding Automation",
        "Hook/Headline": "POV: You finally automated your client onboarding \uD83D\uDE0C",
        "Script/Description": "Visual: Sipping coffee while notifications pop up 'Contract Signed', 'Welcome Email Sent', 'Invoice Paid'. Caption: No more manual chasing. System does it all.",
        "Visual Notes": "Trending audio, relaxed vibe, screen pops of notifications.",
        "Status": "Planned"
    },
    {
        "Day": 1, "Platform": "Facebook", "Content Type": "Post/Image",
        "Topic": "Client Onboarding Automation",
        "Hook/Headline": "How much time do you spend onboarding a new client?",
        "Script/Description": "If it's more than 5 minutes, you're losing money. Here is the exact stack we use to automate contracts, billing, and welcome kits. [List Tools].",
        "Visual Notes": "Infographic showing the workflow map.",
        "Status": "Planned"
    },

    # Topic 3: AI Tools 2026/2025
    {
        "Day": 2, "Platform": "YouTube", "Content Type": "Long Video",
        "Topic": "Top AI Tools",
        "Hook/Headline": "5 AI Tools That Will Replace Your Virtual Assistant in 2026",
        "Script/Description": "Deep dive into: 1. Voice AI for calls. 2. Agentic coding (like me!). 3. Content repurposing AI. 4. CRM automation. 5. Analytics AI. Comparison of features and pricing.",
        "Visual Notes": "Screen share demos of each tool.",
        "Status": "Planned"
    },
    {
        "Day": 2, "Platform": "Instagram", "Content Type": "Carousel",
        "Topic": "Top AI Tools",
        "Hook/Headline": "Save these 5 AI tools before they get expensive \uD83D\uDEA8",
        "Script/Description": "Slide 1: Hook. Slides 2-6: Tool Name + One key benefit each. Slide 7: Summary list. CTA: Save this post.",
        "Visual Notes": "Clean, dark aesthetic screenshots of the tools.",
        "Status": "Planned"
    },

    # Topic 4: Productivity / Time Saving
    {
        "Day": 3, "Platform": "LinkedIn", "Content Type": "Personal Story",
        "Topic": "Productivity Hack",
        "Hook/Headline": "I Saved 20 Hours This Week. Here's Exactly How.",
        "Script/Description": "Breakdown of the tasks delegated to AI agents vs. humans. Focus on the mental clarity gained, not just speed.",
        "Visual Notes": "Photo of a clean desk or a calendar with 'Free Time' blocks.",
        "Status": "Planned"
    },

    # Topic 5: Lead Magnet / Engagement
    {
        "Day": 4, "Platform": "Instagram", "Content Type": "Reel",
        "Topic": "Lead Magnet Distribution",
        "Hook/Headline": "Comment 'AUTO' and I'll send you my private automation checklist \uD83D\uDCE8",
        "Script/Description": "Simple video pointing to text on screen listing what's in the checklist. Fast cuts. High energy music. Uses ManyChat automation for delivery.",
        "Visual Notes": "Text overlay is key here. Pointing to the text.",
        "Status": "Planned"
    },
    
    # Topic 6: Behind The Scenes
    {
        "Day": 5, "Platform": "TikTok", "Content Type": "Vlog/BTS",
        "Topic": "Building in Public",
        "Hook/Headline": "Day in the life of an Automation Agency Owner",
        "Script/Description": "1. Problem solving a bug. 2. Client win. 3. Building a new workflow. Authenticity > Perfection.",
        "Visual Notes": "Fast paced vlog style editing.",
        "Status": "Planned"
    },
    
    # Topic 7: Educational / How-To
    {
        "Day": 6, "Platform": "YouTube", "Content Type": "Short/Shorts",
        "Topic": "Quick Fix",
        "Hook/Headline": "Stop doing this mistake in Zapier/Make",
        "Script/Description": "Show a common error in automation logic (e.g., infinite loops or wrong trigger). Show the fix.",
        "Visual Notes": "Screen recording of the workflow editor.",
        "Status": "Planned"
    }
]

# Generate the DataFrame
rows = []
for item in content_data:
    post_date = start_date + timedelta(days=item["Day"])
    rows.append({
        "Date": post_date.strftime("%Y-%m-%d"),
        "Day of Week": post_date.strftime("%A"),
        "Platform": item["Platform"],
        "Content Type": item["Content Type"],
        "Topic": item["Topic"],
        "Hook/Headline": item["Hook/Headline"],
        "Script/Description": item["Script/Description"],
        "Visual Notes": item["Visual Notes"],
        "Status": item["Status"]
    })

df = pd.DataFrame(rows)

# Create the directory if it doesn't exist
output_dir = os.path.dirname(os.path.abspath(__file__))
output_file = os.path.join(output_dir, "Content_Calendar.xlsx")

# Export to Excel with formatting
try:
    # Need to install openpyxl if not present, but usually in env. 
    # If not, we can fall back to csv or try/except.
    # Assuming environment has openpyxl or similar.
    with pd.ExcelWriter(output_file, engine='openpyxl') as writer:
        df.to_excel(writer, index=False, sheet_name='Calendar')
        
        # Access the workbook and sheet for formatting
        workbook = writer.book
        worksheet = writer.sheets['Calendar']
        
        # Adjust column widths
        for column in df:
            column_width = max(df[column].astype(str).map(len).max(), len(column))
            col_idx = df.columns.get_loc(column)
            worksheet.column_dimensions[chr(65 + col_idx)].width = min(column_width + 5, 50) # Cap width

    print(f"Successfully created: {output_file}")
except Exception as e:
    print(f"Error creating Excel: {e}")
    # Fallback to CSV if Excel fails
    csv_file = os.path.join(output_dir, "Content_Calendar.csv")
    df.to_csv(csv_file, index=False)
    print(f"Fallback: Created CSV at {csv_file}")
