+++
title = "Running This locally"
date = 2024-05-26
+++

### Using Python's http.server module

```
cd public/

//Then run
python -m http.server 8000

```

# CONFIGURING NGINX

```
// Add this under the http parenthesis

http{
    include sites-enabled/*;
    server_names_hash_bucket_size 64;

    types_hash_max_size 4096;
}

```

### Using a Web Server(Nginx) Locally

```
sudo mkdir -p /etc/nginx/sites-available
sudo mkdir -p /etc/nginx/sites-enabled
sudo mkdir -p /usr/share/nginx/daveads

sudo nvim /etc/nginx/sites-availabe/daveads.com
```


// copy this into nvim 
```
server {
    listen 127.0.0.1:8080;
    server_name localhost;

    root /usr/share/nginx/daveads;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

// create symbolic link
```
sudo ln -s /etc/nginx/sites-available/daveads.com /etc/nginx/sites-enabled/
```


//mv public files into dir /usr/share/nginx/daveads/
```
//change base_url to "/" in the config file
zola --config config.dev.toml build
cd public && cp -r * /usr/share/nginx/daveads
```


### Test config
```
sudo nginx -t

//reload nginx 
sudo systemctl reload nginx

```
