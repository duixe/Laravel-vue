# Docker Container setup Instruction

The laravel-vuejs application consist of three main services which includes, the front-end (vuejs), back-end (php/laravel) and the database (postgresql). These three main services are containerized by employing docker-compose and also creating Dockerfiles inside the front-end and the back-end directories.

## Major steps

In order to spin-up the docker conatiners for the laravel-vuejs app, kindly follow the steps which are shown below.

### 1. clone the repo and checkout into the develop branch

```bash
git clone https://gitlab.com/io-digital/examinations/laravel-vuejs-senior-fullstack-emmanuel-akomaning.git
```

## 2. Run docker command - this command will create containers for all three aforementioned services and its requirements

```bash
# make sure you're in the root dir
docker-compose up --build

# use this 👇 command if you prefer running the command without any logs on the terminal
docker-compose up --build -d
```

## 3. Urls to access frontend and the backend services respectively

- **front-end url** : localhost:5173 **_OR_** 127.0.0.1:5173
- **back-end url** : localhost:8000 **_OR_** 127.0.0.1:8000

## 4. Run Laravel Test and Seeders

#### whiles the containers are running, kindly follow the steps below to run test and database seeders

```bash
# 1.login into the Laravel backend conatiner
docker exec -it IO_backend /bin/bash

# 2. Run the test
php artisan test

# 3. Run database seeder
php artisan db:seed

# 4. exit laravel/php container
exit
```

## Other useful docker commands

```bash
# stop all running containers
docker-compose down

# one can decide to spin up the containers without the --build flag (since the containers' images have already been downloaded )
docker-compose up -d
```

## Note

Make sure you have docker and docker-compose installed on your computer, for help on how to install both docker and docker-compose kindly visit docker's [online documentation](https://docs.docker.com/).

If you are on linux you might need to start the docker service before running any docker-compose commands

```bash
service docker start
# or
systemctl docker start
```

If there are errors with regards to PDO or PostgresSQL, be sure to change the env variables of the database in the **_docker-compose.yml_** file to suit your env variables in laravel **_.env_** file. However this has been handled in the **_entrypoint.sh_** inside Laravel-backend directory
