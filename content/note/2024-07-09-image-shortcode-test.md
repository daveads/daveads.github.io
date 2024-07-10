+++
title = "Image shortcode Test"
date = 2024-07-09
[taxonomies]
notec = ["Tests"]
+++

## My Travel Blog

Welcome to my travel blog! Here's a picture from my recent trip to Japan:

{{ figure(src="star-lord-marvels.jpeg" alt="star lord pics") }}


## Edit_image
{{ figure(src="note/star-lord-marvels.jpeg" w="550" h="900") }}

## another image
{{ figure(src="feynman-techn.jpg" w="500" h="700") }}

### Resize image
{{ resize_image(src="purple-planet-dark-background-saturn-astronomy.jpg" w="500" h="700") }}