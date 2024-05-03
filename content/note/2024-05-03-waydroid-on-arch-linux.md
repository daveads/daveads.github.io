+++
title = "Waydroid on Arch Linux"
date = 2024-05-03
[taxonomies]
notec = ["Linux"]
notet = ["waydroid", "Arch"]
tags = ["linux"]
+++

**Run Full Android on Arch Linux with Waydroid**

Waydroid is a container-based approach that allows you to boot a full Android system on your Arch Linux machine. Follow this guide to get started with Waydroid on Arch Linux.

**Installing Waydroid**

To install Waydroid, you can use one of the following methods:

**Method 1: Using Git and Makepkg**

```bash
git clone https://aur.archlinux.org/waydroid.git
cd waydroid
makepkg -si
```

**Method 2: Using Yay**

```bash
yay -S waydroid
```

**Using LineageOS Images**

Waydroid uses LineageOS images. You can install an image using the following commands:

**Automatic Image Installation**

```bash
# Install an image with default settings
waydroid init
# Install an image with GApps support
waydroid init -s GAPPS
```

Alternatively, you can manually download and install images from the AUR:

* [Waydroid Image](https://aur.archlinux.org/packages/waydroid-image/)
* [Waydroid Image with GApps](https://aur.archlinux.org/packages/waydroid-image-gapps/)

**Manual Image Installation**

If you prefer manual installation, follow these steps:

1. Download the LineageOS images:
	* [Vendor Image](https://sourceforge.net/projects/waydroid/files/images/vendor/waydroid_x86_64/lineage-18.1-20240420-MAINLINE-waydroid_x86_64-vendor.zip/download)
	* [System Image with GApps](https://sourceforge.net/projects/waydroid/files/images/system/lineage/waydroid_x86_64/lineage-18.1-20240420-GAPPS-waydroid_x86_64-system.zip/download)
2. Unzip both images and copy them to the correct location:
```bash
sudo cp system.img vendor.img /usr/share/waydroid-extra/images
```

**Kernel and Session Manager Requirements**

To run Waydroid, you need a kernel with the binder modules and a Wayland session manager. For example:

```bash
# Installing linux-zen kernel
sudo pacman -S linux-zen

```

If you use the i3 tiling manager, consider using [Sway](https://github.com/swaywm/sway), an i3-compatible Wayland compositor.

**Python Environment Setup**

Before proceeding, ensure you have Python installed. You can use `pyenv` or the system-installed Python. Install the required packages:

```bash
pip install PyGObject==3.48.1 pyclip==0.7.0 dbus-python==1.3.2 Cython==3.0.10
```

Additionally, install [gbinder-python](https://github.com/erfanoabdi/gbinder-python) by following the instructions in the README.

**Play Store Support on Waydroid**

To install the Play Store on Waydroid, you can use the script provided at [casualsnek/waydroid_script](https://github.com/casualsnek/waydroid_script.git).