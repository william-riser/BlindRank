import requests
from bs4 import BeautifulSoup
import csv

urls = {
    "advanced": "https://www.basketball-reference.com/leagues/NBA_2025_advanced.html",
    "per_game": "https://www.basketball-reference.com/leagues/NBA_2025_per_game.html"
}

def scrape_table(url, table_id):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')

    table = soup.find('table', {'id': table_id})

    # Handle missing table
    if not table:
        with open("debug_response.html", "w", encoding="utf-8") as debug_file:
            debug_file.write(response.text)
        raise ValueError(f"Table with id '{table_id}' not found. HTML saved to debug_response.html.")

    # Extract the table headers
    headers = [header.text for header in table.find('thead').find_all('th')][1:]  # Skip the first column (rank column)

    # Extract the table rows
    rows = table.find('tbody').find_all('tr')

    # Prepare the data for CSV
    stats = []
    for row in rows:
        if 'class' in row.attrs and 'thead' in row.attrs['class']:
            # Skip header rows embedded in tbody
            continue
        cells = row.find_all('td')
        if not cells:
            # Skip rows without data (e.g., separators)
            continue
        stats.append([cell.text for cell in cells])

    return headers, stats

# Scrape data from both tables
advanced_headers, advanced_stats = scrape_table(urls["advanced"], "advanced")
per_game_headers, per_game_stats = scrape_table(urls["per_game"], "per_game_stats")

# Combine headers and stats
combined_headers = advanced_headers + [header for header in per_game_headers if header not in advanced_headers]
combined_stats = []

# Create a dictionary for quick lookup of per-game stats by player name
per_game_dict = {row[0]: row for row in per_game_stats}  # Assume the first column is the player's name

for row in advanced_stats:
    player_name = row[0]
    per_game_row = per_game_dict.get(player_name, ["N/A"] * len(per_game_headers))
    combined_stats.append(row + [stat for stat in per_game_row if stat not in row])

# Save the combined data to a CSV file
output_file = "nba_2025_combined_stats.csv"
with open(output_file, mode='w', newline='', encoding='utf-8') as file:
    writer = csv.writer(file)
    # Write the headers
    writer.writerow(combined_headers)
    # Write the combined stats
    writer.writerows(combined_stats)

print(f"Data successfully saved to {output_file}")
