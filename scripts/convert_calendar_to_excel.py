
import re
import pandas as pd
import os

def parse_markdown_table(file_path):
    """
    Parses a markdown file containing a table into a pandas DataFrame.
    """
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.readlines()

    # Find the table start (lines starting with |)
    table_lines = [line.strip() for line in content if line.strip().startswith('|')]
    
    if not table_lines:
        print("No table found in markdown file.")
        return pd.DataFrame()

    # The first line is header
    header_line = table_lines[0]
    headers = [h.strip() for h in header_line.split('|') if h.strip()]
    
    # The second line is separator (ignore)
    data_lines = [line for line in table_lines[2:] if '---' not in line] # Skip separator if it was included in range
    
    rows = []
    for line in data_lines:
        # Split by | but handle escaped pipes if any (simple split first)
        # Using a regex to split by pipe not inside code blocks would be better but simple split usually works for md tables
        # Removing first and last empty strings from split
        parts = [p.strip() for p in line.split('|')]
        
        # Valid row usually has len(headers) + 2 (empty start/end)
        if len(parts) >= len(headers) + 2:
           row_data = parts[1:-1] # content
           
           # Clean bold markup (**text**)
           row_data = [re.sub(r'\*\*(.*?)\*\*', r'\1', cell) for cell in row_data]
           rows.append(row_data)

    df = pd.DataFrame(rows, columns=headers)
    return df

def create_excel(input_md, output_xlsx):
    df = parse_markdown_table(input_md)
    
    if df.empty:
        print("DataFrame is empty, skipping Excel creation.")
        return

    # Add a 'Year' column or format Date
    # Current 'Date' is like "Feb 2". Let's make it "2026-02-02"
    def parse_date(date_str):
        try:
            # Remove ** if exists
            date_str = date_str.replace('*', '').strip()
            # Parse "Feb 2" -> Date object
            current_year = 2026
            dt = pd.to_datetime(f"{date_str} {current_year}", format='%b %d %Y')
            return dt.strftime('%Y-%m-%d')
        except:
            return date_str

    if 'Date' in df.columns:
        df['Date'] = df['Date'].apply(parse_date)

    # Save
    with pd.ExcelWriter(output_xlsx, engine='openpyxl') as writer:
        df.to_excel(writer, index=False, sheet_name='Feb 2026 Strategy')
        
        # Auto-adjust columns
        worksheet = writer.sheets['Feb 2026 Strategy']
        for column in df:
            column_width = max(df[column].astype(str).map(len).max(), len(column))
            col_idx = df.columns.get_loc(column)
            # Cap width to 60 to avoid huge cells
            worksheet.column_dimensions[chr(65 + col_idx)].width = min(column_width + 2, 60)

    print(f"Successfully created {output_xlsx}")

if __name__ == "__main__":
    current_dir = os.path.dirname(os.path.abspath(__file__))
    input_file = os.path.join(current_dir, "calendar_raw_v2.md")
    output_file = os.path.join(current_dir, "Content_Calendar_Feb_2026_v2.xlsx")
    
    create_excel(input_file, output_file)
