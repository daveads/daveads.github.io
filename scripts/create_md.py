#!/usr/bin/env python

import datetime
import re
import os
from dotenv import load_dotenv


def format_title(title):
    """
    Convert the title to the desired format.

    Args:
        title (str): The original title

    Returns:
        str: Formatted title (lowercase with hyphens, no trailing hyphens)
    """
    formatted_title = title.replace(" ", "-").lower()
    formatted_title = re.sub(r'-+$', '', formatted_title)
    return formatted_title


def generate_file_name(title, date=None):
    """
    Generate the markdown file name based on title and date.

    Args:
        title (str): The blog title
        date (str, optional): Date in YYYY-MM-DD format. Defaults to today.

    Returns:
        str: File name in format YYYY-MM-DD-formatted-title
    """
    if date is None:
        date = datetime.date.today().strftime("%Y-%m-%d")

    formatted_title = format_title(title)
    return f"{date}-{formatted_title}"


def get_directory_for_type(article_type, writing_dir=None, note_dir=None):
    """
    Determine the directory based on article type.

    Args:
        article_type (str): Type of article (writing/note/other)
        writing_dir (str, optional): Path to writing directory
        note_dir (str, optional): Path to note directory

    Returns:
        str: Directory path
    """
    article_type = article_type.lower()

    if article_type == "writing":
        return writing_dir if writing_dir else "content/writing"
    elif article_type == "note":
        return note_dir if note_dir else "content/note"
    else:
        return "content"


def create_markdown_file(title, article_type, writing_dir=None, note_dir=None, date=None):
    """
    Create a markdown file with front matter.

    Args:
        title (str): The blog title
        article_type (str): Type of article (writing/note/other)
        writing_dir (str, optional): Path to writing directory
        note_dir (str, optional): Path to note directory
        date (str, optional): Date in YYYY-MM-DD format. Defaults to today.

    Returns:
        str: Full path to the created file
    """
    if date is None:
        date = datetime.date.today().strftime("%Y-%m-%d")

    file_name = generate_file_name(title, date)
    directory = get_directory_for_type(article_type, writing_dir, note_dir)

    # Create the directory if it doesn't exist
    os.makedirs(directory, exist_ok=True)

    # Full path for the file
    full_path = os.path.join(directory, f"{file_name}.md")

    # Create and write to the file
    with open(full_path, "w") as file:
        file.write("+++\n")
        file.write(f"title = \"{title}\"\n")
        file.write(f"date = {date}\n")
        file.write("+++\n\n")
        file.write("//blog content goes here.")

    return full_path


def main():
    """Main function to run the interactive script."""
    # Load environment variables from .env file
    load_dotenv()

    WRITING_DIR = os.getenv("WRITING")
    NOTE_DIR = os.getenv("NOTE")

    # Get user input
    title = input("Enter the blog title: ")
    article_type = input("Enter the article type (writing/note/other): ").lower()

    # Create the markdown file
    full_path = create_markdown_file(title, article_type, WRITING_DIR, NOTE_DIR)

    # Extract directory from full path
    directory = os.path.dirname(full_path)
    file_name = os.path.basename(full_path)

    print(f"File '{file_name}' has been created in the {directory} directory.")


if __name__ == "__main__":
    main()
