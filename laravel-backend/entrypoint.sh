#!/bin/sh

# if composer dependencies aren't installed 
if [ ! -f "vendor/autoload.php" ]; then
    composer install --ignore-platform-reqs --no-scripts --no-progress --no-interaction
fi

# create env file from .env.example if .env does not exist
if [ ! -f ".env" ]; then
    echo "creating env file for io backend"
    cp .env.example .env
else
    echo ".env file already exist"
fi

php artisan migrate
php artisan key:generate

php artisan serve --port=$PORT --host=0.0.0.0 --env=env
exec docker-php-entrypoint "$@"