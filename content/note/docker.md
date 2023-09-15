+++
title = "Docker key words"
date = 2022-06-11

[taxonomies]
notec = ["Learned"]
+++

- develop
- ship
- run

### **To run docker images**
---

```md
docker run <image>
```

### **To show docker images**
---

```
docker images
```

### **pull docker images**

```docker pull <image>```

### **Docker status**

```systemctl status docker```

### **current running container**

```docker ps```

### **runned container**


```docker ps -a```

### **iteractive tty @container**

```docker run -it <image> sh```

### **cleaning up containters**

```
docker rm <container id>

docker rm $(docker ps -a -q -f status=exited)

docker container prune
```

### **view exposed image ports**

```docker port <image>```

### **To stop a detached container**

```docker stop <image>```


#### **DOCKER IMAGES**


- Base images : images with no parent image, usually images with an os like ubuntu, busybox && debian

- Child images : images build on base images


- offical images : made by folks at docker

- user images : user/image-name by users


```
search for images with

<docker search>
```


#### **Delete images**
```
docker rmi <image_id>

// forcefully remove an image

docker rmi -f <image_id>

```

### Interactive shell session
```
docker run -it ubuntu bash // exit


// Keep running when exited 

- docker run -itd ubuntu bash
- docker attach CONTAINER_ID

```
### Creating a docker image
---

```docker build -t daveads/flask_py .```

