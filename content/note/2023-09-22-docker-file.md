+++
title = "Docker key words"
date = 2023-09-22
[taxonomies]
notet = ["docker"]
+++


**Docker file note**

Certainly, here are all the commonly used Dockerfile commands along with detailed explanations:

1. **FROM**:
   - Specifies the base image to use as the starting point for your Docker image.
   
   - Usage: `FROM image:tag`
   - Example: `FROM ubuntu:latest`
   
2. **RUN**:
   - Executes shell commands within the image during the build process. Typically used for installing software, updating packages, or any setup tasks.
   - Usage: `RUN command`
   - Example: `RUN apt-get update && apt-get install -y python3`
   
3. **COPY**:
   - Copies files or directories from the host machine into the image. It's often used to add application code and resources to the image.
   - Usage: `COPY source destination`
   - Example: `COPY app.py /app/`
   
4. **WORKDIR**:
   - Sets the working directory inside the container where subsequent commands will be executed. Useful for organizing files and specifying paths.
   - Usage: `WORKDIR path`
   - Example: `WORKDIR /app`
   
5. **EXPOSE**:
   - Informs Docker that the container will listen on specific ports at runtime. It doesn't actually expose the ports; it's for documentation purposes.
   - Usage: `EXPOSE port(s)`
   - Example: `EXPOSE 8080`
   
6. **CMD**:
   - Specifies the default command to run when a container is started from the image. You can override it when starting a container.
   - Usage: `CMD ["executable", "param1", "param2"]`
   - Example: `CMD ["python3", "app.py"]`
   
7. **ENTRYPOINT**:
   - Similar to CMD, it defines the default command to run when a container starts, but it's more rigid and doesn't allow command override. Useful for creating containerized applications that act like executables.
   - Usage: `ENTRYPOINT ["executable", "param1", "param2"]`
   - Example: `ENTRYPOINT ["python3", "app.py"]`
   
8. **ENV**:
   - Sets environment variables within the container. These variables can be used in subsequent Dockerfile commands or by the running application.
   - Usage: `ENV key=value`
   - Example: `ENV MY_VARIABLE=value`
   
9. **VOLUME**:
   - Creates a mount point for external volumes or data to be shared with the container. It allows data persistence and sharing between containers.
   - Usage: `VOLUME /path`
   - Example: `VOLUME /data`
   
10. **USER**:
    - Sets the user or UID (User ID) under which the container will run. It's useful for improving security by running processes with lower privileges.
    - Usage: `USER username_or_UID`
    - Example: `USER appuser`
