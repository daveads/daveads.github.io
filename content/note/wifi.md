+++
title = "wifi connection"
date = 2022-06-11
[taxonomies]
notec = ["Learned"]
notet = ["i3"]
+++

**Show current network connections**
```sh
nmcli connection show
```

**List available Wi-Fi networks**
```sh
nmcli device wifi list
```

**Connect to a network using its UUID (replace `UUID` with the actual UUID)**
```sh
nmcli c up uuid e0bda955-475c-4625-b19b-4a1f2339d9db --ask
```

**Enable Wi-Fi (if disabled)**
```sh
sudo rfkill unblock wifi
nmcli networking on
```

**BLUETOOTH**

**Turn on Bluetooth**
```sh
bluetoothctl power on
```

**Enter Bluetooth control interface**
```sh
bluetoothctl
```

**Start scanning for nearby Bluetooth devices**
```sh
scan on
```

**Connect to a Bluetooth device with the specified MAC address (replace `<tecno square1>` with the actual MAC address)**
```sh
connect 14:A6:8E:AE:9F:51
```

**Show status of devices and their rfkill (Radio Frequency Kill) status**
```sh
rfkill list
```

**Additional Bluetooth commands:**

**Show connected devices**
```sh
devices
```

**Show paired devices**
```sh
paired-devices
```
