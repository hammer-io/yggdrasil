# Deploying the Application

## Steps Overview

1. VM Setup (Ubuntu 16.04)
   - This should already have been done in the [Endor deployment setup](https://github.com/hammer-io/endor/blob/master/DEPLOYMENT.md)
2. Project Setup
   1. Navigate to where you want the project, then clone it:
      - `git clone git@github.com:hammer-io/yggdrasil.git`
      - (This works via SSH only if you setup a deploy key.)
      - `cd yggdrasil`
   2. Create production configuration file:
      - From the yggdrasil directory, move to the config directory and copy the default config file: `cd config && cp default.json production.json`
      - Edit `production.json` and enter valid information
3. Setting up docker-gen and Nginx reverse proxy
   - This should already have been done in the [Endor deployment setup](https://github.com/hammer-io/endor/blob/master/DEPLOYMENT.md)
4. Build and run the `hammerio/yggdrasil` image

```bash
# Building the image (-t gives a tag name)
docker build -t hammerio/yggdrasil .
# Run the image on the defined virtual host, replacing "example.com"
# with the actual domain name you want for the reverse proxy.
docker run \
  -e NODE_ENV=production \
  -e VIRTUAL_HOST=example.com \
  -d hammerio/yggdrasil
# For easier debugging, add the -it option to keep an interactive shell open
```

## Helpful Docker Commands

For the actual docker commands used in deployment, [read above](#steps-overview).

A [docker](https://www.docker.com) image is built to run the application in
production. The following commands will help you deploy Yggdrasil in a docker
container on your local machine (for development, normally you don't need
to do this; just run `npm start`):

```bash
# Building the image (-t gives a tag name)
docker build -t hammerio/yggdrasil .
# List docker images
docker images
# Runs the image, redirecting port 8888 on your machine to
# the exposed port in the image. The -d flag detaches the process. 
docker run -p 8080:5000 -d hammerio/yggdrasil
# Get container ID
docker ps
# Print app output
docker logs <container_id>
# Enter the container, if necessary
docker exec -it <container_id> /bin/sh
# Stop the container
docker stop <container_id>
```

Most of this information was found in
[this guide from nodejs.org](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/).
