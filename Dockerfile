FROM php:8.3

RUN apt-get update && apt-get install -y \
  libpq-dev \
  && docker-php-ext-install pdo pdo_pgsql

WORKDIR /var/www/crud-app

COPY . .

RUN chown -R www-data:www-data /var/www/crud-app/storage /var/www/crud-app/bootstrap/cache

CMD php artisan serve --host=0.0.0.0 --port=8000