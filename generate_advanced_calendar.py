import pandas as pd
from datetime import datetime, timedelta
import random

# Configuration
YEAR = 2026
MONTH = 2
START_DATE = datetime(YEAR, MONTH, 1)

# Pillars & 70-20-10 Rule
PILLARS = [
    "Value (Educational)",  # 70%
    "Engagement (Community)", # 20%
    "Promo (Sales)"         # 10%
]
PILLAR_WEIGHTS = [0.7, 0.2, 0.1]

# Platforms
PLATFORMS = ["Instagram", "Facebook", "LinkedIn", "TikTok", "YouTube Shorts"]

# Content Topics (AI Automation Niche)
TOPICS_VALUE = [
    "How to automate client onboarding in 2026",
    "Top 3 AI tools for business efficiency",
    "Stop manually sending emails - do this instead",
    "The truth about 'Zero-Click' marketing",
    "Zapier vs Make: Which is better for agencies?",
    "How to use AI Agents to book meetings",
    "5 Automation mistakes costing you money",
    "The future of work: AI + Human Hybrid",
    "How I saved 10 hours this week with n8n",
    "Workflow of the week: Lead Gen Automation"
]

TOPICS_ENGAGEMENT = [
    "What's your biggest time waster in business?",
    "Agree or Disagree: AI will replace PMs?",
    "Show us your messy desk vs automated workflow",
    "Poll: ChatGPT or Claude for coding?",
    "Behind the scenes of our automation agency",
    "Fail of the week: When automation goes wrong",
    "Client win: Saved $5k/month with one automation"
]

TOPICS_PROMO = [
    "Case Study: From 0 to 100 leads automated",
    "Book a free audit (Link in Bio)",
    "Flash sale on our Automation Blueprint",
    "Comment 'AUTO' to get our free guide",
    "Need custom n8n workflows? DM us.",
    "Join our waiting list for the 2026 cohort"
]

# Hooks & Scripts Templates
HOOK_TEMPLATES = [
    "Stop doing {topic} manually.",
    "If you're still doing {topic}, you're losing money.",
    "The secret to {topic} revealed.",
    "Why 99% of businesses fail at {topic}.",
    "I automate {topic} in 5 minutes. Here's how."
]

VISUAL_DIRECTIVES = [
    "Talking head, intense eye contact, fast cuts.",
    "Screen recording of n8n workflow executing.",
    "B-roll of working in a cafe, text overlay.",
    "Green screen over a news article about AI.",
    "Pov: You just automated your entire job."
]

data = []

previous_topic = ""
# 28 days in Feb
DAYS_IN_MONTH = 28

for day in range(DAYS_IN_MONTH):
    current_date = START_DATE + timedelta(days=day)
    day_str = current_date.strftime("%Y-%m-%d")
    
    # Daily logic
    # Determine Pillar randomly based on weights
    daily_pillar_list = random.choices(PILLARS, weights=PILLAR_WEIGHTS, k=1)
    daily_pillar = daily_pillar_list[0]
    
    if daily_pillar == "Value (Educational)":
        topic_list = TOPICS_VALUE
    elif daily_pillar == "Engagement (Community)":
        topic_list = TOPICS_ENGAGEMENT
    else:
        topic_list = TOPICS_PROMO
        
    topic = random.choice(topic_list)
    
    # simple attempt to avoid immediate repeats
    attempts = 0
    while topic == previous_topic and attempts < 5:
        topic = random.choice(topic_list)
        attempts += 1
    previous_topic = topic

    # Generate content for each platform
    for platform in PLATFORMS:
        
        # Trial Reels Strategy (IG only - 20% chance)
        is_trial_reel = False
        if platform == "Instagram" and random.random() < 0.2:
            is_trial_reel = True
        
        # Base Row
        safe_topic = topic.replace("How to ", "").replace("Top 3 ", "")
        hook = random.choice(HOOK_TEMPLATES).format(topic=safe_topic)
        
        if daily_pillar == "Promo (Sales)":
            cta = "Comment 'AUTO' for the link!"
        else:
            cta = "Follow for more automation tips."

        script = f"🔥 {hook}\n\nHere is the breakdown of {topic}.\n\n1. Step One... (Expand here)\n2. Step Two... (Expand here)\n3. Step Three... (Expand here)\n\nSave this for later! #automation #ai #business #AutoFlowDigital"

        row = {
            "Date": day_str,
            "Platform": platform,
            "Status": "Planned",
            "Content Pillar": daily_pillar,
            "Idea/Topic": topic,
            "Hook": hook,
            "Visual Directive": random.choice(VISUAL_DIRECTIVES),
            "Copy/Caption": script,
            "Hashtags": "#AI #Automation #AutoFlowDigital",
            "CTA": cta
        }
        data.append(row)
        
        # Add Trial Reel Variant
        if is_trial_reel:
            row_variant = row.copy()
            row_variant["Hook"] = f"[VARIANT B] {random.choice(HOOK_TEMPLATES).format(topic=safe_topic)}"
            row_variant["Status"] = "Planned (Trial Variant)"
            data.append(row_variant)

# Create DataFrame
df = pd.DataFrame(data)

# Export to Excel
file_path = "Content_Calendar_Feb_Advanced.xlsx"
df.to_excel(file_path, index=False)

print(f"Calendar generated successfully: {file_path}")
