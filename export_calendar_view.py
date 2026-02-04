
import pandas as pd

artifacts_dir = "/Users/hubertgrzybowski/.gemini/antigravity/brain/330b2e97-baa3-4b5a-aad6-1ebedc1e62b6"
excel_path = f"{artifacts_dir}/Content_Calendar_Feb_2026_Strategy.xlsx"
md_path = f"{artifacts_dir}/content_calendar_feb_2026.md"

try:
    df = pd.read_excel(excel_path)
    
    with open(md_path, "w") as f:
        f.write("# Content Calendar: February 2026 (Sales First)\n\n")
        f.write("Strategy: Viral (Mon) -> Edu (Tue) -> Proof (Wed) -> Pain (Thu) -> Sell (Fri) -> Lifestyle (Sat) -> Chill (Sun)\n\n")
        
        # Manual markdown table creation to avoid tabulate dependency
        cols = ["Date", "Day", "Phase", "Hook (First 3s)", "Call To Action (CTA)"]
        f.write("| " + " | ".join(cols) + " |\n")
        f.write("| " + " | ".join(["---"] * len(cols)) + " |\n")
        
        for _, row in df.iterrows():
            line = f"| {row['Date']} | {row['Day']} | {row['Phase']} | {row['Hook (First 3s)']} | {row['Call To Action (CTA)']} |"
            f.write(line + "\n")
            
    print(f"✅ Generated Markdown View: {md_path}")

except Exception as e:
    print(f"❌ Error: {e}")
