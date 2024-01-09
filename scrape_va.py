import requests
from bs4 import BeautifulSoup
import json

# Replace with the URL of the website containing the table
url = "https://wasuku.gamewiki.jp/seiyumatome/"

# Fetch the HTML content of the webpage
response = requests.get(url)
html_content = response.content

# Parse the HTML content using BeautifulSoup
soup = BeautifulSoup(html_content, "html.parser")

# Find the table element in the HTML with the id mainCont
table = soup.find("section", attrs={"id": "mainCont"})

# Find all tr elements with role="row"
rows = table.find("tr", attrs={"role": "row"})

#find all td with class that starts with gwdb_
tds = table.find("td", attrs={"class": lambda x: x and x.startswith("gwdb_")})
print(tds)