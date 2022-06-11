+++
title = "using i3 multiple monitors @xrandr"
[taxonomies]
notec = ["Learned"]
notet = ["i3"]
+++

>> xrandr

eDP1 connected primary 1366x768+0+0 (normal left inverted right x axis y axis) 340mm x 190mm
   1366x768      60.00*+
   
   
HDMI1 connected 1080x1920+1366+0 left (normal left inverted right x axis y axis) 470mm x 300mm
   1920x1080     60.00*+  59.94



------------------------------------------------------------
position out right of primary screen

// horizontal position 
xrandr --output HDMI1 --auto --right-of eDP1


// vertical position
xrandr --output HDMI1 --rotate left --right-of eDP1


xrandr --output HDMI1 --rotate left --auto --right-of eDP1
------------------------------------------------------------


### Edit configs to add moving workspaces between screens

.config/i3/config


----------------
bindsym $mod+p move workspace to output right
----------------


