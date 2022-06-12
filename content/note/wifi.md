+++
title = "wifi connection"
date = 2022-06-11
[taxonomies]
notec = ["Learned"]
notet = ["i3"]
+++



nmcli connection show


//new connection 
nmcli device wifi list



# connect
nmcli c up uuid { **UUID*** e0bda955-475c-4625-b19b-4a1f2339d9db} --ask





sudo rfkill unblock wifi
nmcli networking on



# BLUETOOTH

bluetoothctl power on

bluetoothctl

scan on

connect 14:A6:8E:AE:9F:51 <tecno square1>




rfkill .....???


---------------------------
devices

paired-devices
--------------------------


