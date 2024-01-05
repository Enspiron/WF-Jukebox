import json

# Read data from characters.json file
with open('characters.json', 'r') as file:
    data = json.load(file)

# New list to hold modified objects
modified_data = []

# Loop through each object in the original data
for item in data["chars"]:
    # Check if the current object has songs
    if "songs" in item and item["songs"]:
        # Create a new dictionary with selected key/value pairs including songs
        new_item = {
            "ENName": item.get("ENName"),
            "DevNicknames": item.get("DevNicknames"),
            "Artist": "",
            "songs": item.get("songs")
        }
        # Append the modified dictionary to the new list
        modified_data.append(new_item)

# Save the modified data to a new JSON file
with open('modified_characters_with_songs.json', 'w') as outfile:
    json.dump(modified_data, outfile, indent=4)
