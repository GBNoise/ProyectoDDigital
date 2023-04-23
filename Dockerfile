FROM php:8.0-apache

# Install PostgreSQL client
RUN apt-get update && \
    apt-get install -y postgresql-client

# Install PostgreSQL driver
RUN apt-get update && \
    apt-get install -y libpq-dev && \
    docker-php-ext-install pdo_pgsql && \
    docker-php-ext-enable pdo_pgsql

# Copy source code
COPY ./src /var/www/html/

# Set working directory
WORKDIR /var/www/html/

RUN chown -R www-data:www-data /var/www/html
ENV APACHE_RUN_USER www-data
ENV APACHE_RUN_GROUP www-data
RUN chmod -R 755 /var/www/html

# Expose port 80
EXPOSE 80

# Start Apache2 web server
CMD ["apache2-foreground"]
