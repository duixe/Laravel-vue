# FROM php:8.1.1-fpm-alpine

# RUN apk add openssl zip unzip git

# RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filname=composer

# RUN set -ex \
#     	&& apk --no-cache add postgresql-dev \
#     	&& docker-php-ext-install pdo pdo_pgsql 

# WORKDIR /var/www/html
# COPY . .
FROM php:8.1 as php

# RUN apt-get update -y
# RUN apt-get install -y zip unzip postgresql-dev
# RUN docker-php-ext-install pdo pdo_pgsql

RUN apt-get update \
  && apt-get install -y \
  git \
  curl \
  libpng-dev \
  libonig-dev \
  libxml2-dev \
  zip \
  unzip \
  zlib1g-dev \
  libpq-dev \
  libzip-dev

RUN docker-php-ext-configure pgsql -with-pgsql=/usr/local/pgsql \
  && docker-php-ext-install pdo pdo_pgsql pgsql zip bcmath gd

WORKDIR /var/www/html
COPY . .

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

ENV PORT=8000
RUN chmod +x entrypoint.sh
ENTRYPOINT [ "sh", "entrypoint.sh" ]

