# Use an official PHP runtime as a parent image
FROM php:7.4-apache

# Install the PostgreSQL extension for PHP
RUN apt-get update && apt-get install -y libpq-dev && docker-php-ext-install pdo pdo_pgsql

# Copy your PHP files into the image
COPY . /var/www/html/

# Set the working directory to your web root
WORKDIR /var/www/html

# Set environment variables for PostgreSQL connection
ENV POSTGRES_USER=your_postgres_user
ENV POSTGRES_PASSWORD=your_postgres_password
ENV POSTGRES_DB=your_postgres_database
ENV POSTGRES_HOST=db
ENV PORT=8080

# Enable Apache modules for PHP support and URL rewriting
RUN a2enmod rewrite

# Expose port 8080 to the host machine
EXPOSE 8080

# Start Apache web server in the foreground
CMD ["sh", "-c", "sed -i -e 's/80/$PORT/g' /etc/apache2/sites-available/000-default.conf /etc/apache2/ports.conf && apache2-foreground"]
