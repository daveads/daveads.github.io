#!/usr/bin/env python

import datetime
import re
import os
from dotenv import load_dotenv


# Load environment variables from .env file
load_dotenv()

WRITING_DIR = os.getenv("WRITING")
NOTE_DIR = os.getenv("NOTE")

#print(WRITING_DIR)
#print(NOTE_DIR)


# Get user input
title = input("Enter the blog title: ")
article_type = input("Enter the article type (writing/note/other): ").lower()

# Convert the title to the desired format
formatted_title = title.replace(" ", "-").lower()

# Remove any trailing hyphens
formatted_title = re.sub(r'-+$', '', formatted_title)

# Get current date
current_date = datetime.date.today().strftime("%Y-%m-%d")

# Create the file name without .md extension
file_name = f"{current_date}-{formatted_title}"

# Determine the directory based on article type
if article_type == "writing":
    directory = WRITING_DIR
elif article_type == "note":
    directory = NOTE_DIR
else:
    directory = "content"

# Create the directory if it doesn't exist
os.makedirs(directory, exist_ok=True)

# Full path for the file
full_path = os.path.join(directory, f"{file_name}.md")

# Create and write to the file
with open(full_path, "w") as file:
    file.write("+++\n")
    file.write(f"title = \"{title}\"\n")
    file.write(f"date = {current_date}\n")
    file.write("+++\n\n")
    file.write("//blog content goes here.")

print(f"File '{file_name}.md' has been created in the {directory} directory.")
