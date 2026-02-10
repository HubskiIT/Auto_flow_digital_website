
import pandas as pd
from datetime import date, timedelta

# Strategy Definition: The Selling Rhythm
STRATEGY = {
    0: {"Type": "TOFU (Viral)", "Goal": "Reach", "Hook_Style": "Controversial/News", "Topic": "AI/Automation Trend"}, # Monday
    1: {"Type": "MOFU (Edu)", "Goal": "Authority", "Hook_Style": "How-To/Tutorial", "Topic": "n8n/Make Workflow"},    # Tuesday
    2: {"Type": "MOFU (Proof)", "Goal": "Trust", "Hook_Style": "Case Study", "Topic": "Client Result"},              # Wednesday
    3: {"Type": "MOFU (Pain)", "Goal": "Agitation", "Hook_Style": "Problem/Solution", "Topic": "Business Inefficiency"}, # Thursday
    4: {"Type": "BOFU (Sell)", "Goal": "CONVERSION", "Hook_Style": "Direct Offer", "Topic": "AutoFlow Service"},      # Friday
    5: {"Type": "Lifestyle", "Goal": "Connection", "Hook_Style": "BTS/Vlog", "Topic": "My Setup/Work"},              # Saturday
    6: {"Type": "Tech/Chill", "Goal": "Engagement", "Hook_Style": "Q&A/Opinion", "Topic": "Future of AI"},           # Sunday
}

# February 2026 Dates
start_date = date(2026, 2, 1) # Sunday
end_date = date(2026, 2, 28)

# Content Ideas Bank (Specific to AutoFlow Digital)
IDEAS_BANK = {
    "TOFU (Viral)": [
        "This AI tool is illegal in 3 countries...", 
        "Stop using ChatGPT like a beginner.", 
        "n8n vs Make: The truth nobody tells you.",
        "3 AI agents that will replace your VA."
    ],
    "MOFU (Edu)": [
        "How I automated my email inbox (Step-by-Step).", 
        "Building a viral scraper in 5 minutes.", 
        "Connect OpenAI to Google Sheets in n8n.", 
        "The infinite content glitch explained."
    ],
    "MOFU (Proof)": [
        "How Client X saved $4500/mo with one automation.", 
        "From 0 to 10k leads: The AutoFlow Method.", 
        "See behind the scenes of a $20k automation.", 
        "Reaction: My client's face when the bot worked."
    ],
    "MOFU (Pain)": [
        "You are wasting 20 hours a week on THIS.", 
        "Why your leads are cold (and how to fix it).", 
        "Stop manual data entry. It's 2026.", 
        "Your competitors are already automating this."
    ],
    "BOFU (Sell)": [
        "I have 2 spots left for March implementations. Link in bio.", 
        "Want this exact workflow? Comment 'AUTO'.", 
        "Flash Sale: Audit your business for $0.", 
        "Steal my entire agency stack. Link below."
    ],
    "Lifestyle": [
        "My $5000 Desk Setup for coding.", 
        "Day in the life of an AI Engineer.", 
        "How I stay productive (No Code tools).", 
        "Coding vs No-Code: My honest opinion."
    ],
    "Tech/Chill": [
        "Q&A: Will AI steal our jobs?", 
        "My favorite books on automation.", 
        "Sunday Reset: Planning the week with AI.", 
        "Unpopular Opinion: AI is overhyped?"
    ]
}

data = []
current_date = start_date

while current_date <= end_date:
    day_idx = current_date.weekday() # 0=Mon, 6=Sun
    strat = STRATEGY[day_idx]
    
    # Pick an idea (cycling through)
    week_num = (current_date.day - 1) // 7 
    idea_list = IDEAS_BANK.get(strat["Type"], IDEAS_BANK["Tech/Chill"]) # Fallback
    specific_idea = idea_list[week_num % len(idea_list)]
    
    row = {
        "Date": current_date.strftime("%Y-%m-%d"),
        "Day": current_date.strftime("%A"),
        "Phase": strat["Type"],
        "Goal": strat["Goal"],
        "Hook (First 3s)": specific_idea,
        "Topic Category": strat["Topic"],
        "Call To Action (CTA)": "Comment 'AUTO'" if "Sell" in strat["Type"] else "Follow for more",
        "Platform": "IG, TikTok, YT Shorts, LI",
        "Status": "Planned"
    }
    data.append(row)
    current_date += timedelta(days=1)

df = pd.DataFrame(data)

# Save to Excel
filename = "Content_Calendar_Feb_2026_Strategy.xlsx"
df.to_excel(filename, index=False)

print(f"✅ Generated Sales-Focused Calendar: {filename}")
print(df[["Date", "Day", "Phase", "Hook (First 3s)"]].to_markdown(index=False))
