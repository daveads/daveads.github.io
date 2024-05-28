#!/bin/bash

# Build the site with Zola
zola --config config.dev.toml build

# Check if the build was successful
if [ $? -eq 0 ]; then
    echo "Zola build successful."

    # Change to the public directory
    cd public

    # Copy the contents to the Nginx directory
    sudo cp -r * /usr/share/nginx/daveads

    # Check if the copy was successful
    if [ $? -eq 0 ]; then
        echo "Files copied successfully."

        # Reload Nginx to apply changes
        sudo systemctl reload nginx

        if [ $? -eq 0 ]; then
            echo "Nginx reloaded successfully."
        else
            echo "Failed to reload Nginx."
        fi
    else
        echo "Failed to copy files."
    fi
else
    echo "Zola build failed."
fi
